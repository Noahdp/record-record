import { NextResponse } from "next/server";
import { APIError } from "@/lib/errors/api-error";
import { CommunityReview } from "@/types/CommunityReview";
import { DiscogsReviewResponse } from "@/types/DiscogsReviewResponse";
import { getDiscogsCredentials } from "@/lib/config/environment";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const albumId = parseInt(idString);

  if (isNaN(albumId)) {
    return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
  }

  try {
    // Get validated Discogs credentials
    const credentials = getDiscogsCredentials();

    // Make direct API call to Discogs reviews endpoint
    // Security: Use Authorization header instead of exposing keys in URL
    const reviewsUrl = `https://api.discogs.com/releases/${albumId}/reviews`;

    const response = await fetch(reviewsUrl, {
      headers: {
        "User-Agent": "Record Record/1.0",
        Authorization: `Discogs key=${credentials.consumerKey}, secret=${credentials.consumerSecret}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        // No reviews found, return empty array
        return NextResponse.json([]);
      }
      throw APIError.httpError(response.status);
    }

    const data = await response.json();

    // Extract and transform reviews from the response
    let reviews: CommunityReview[] = [];
    if (data.results && Array.isArray(data.results)) {
      reviews = data.results.map(
        (review: DiscogsReviewResponse, index: number) => ({
          id: review.id || albumId * 1000 + index,
          albumId: albumId,
          user:
            typeof review.user === "object" && review.user?.username
              ? review.user.username
              : review.username || "Anonymous",
          rating: review.rating || 0, // Use 0 to indicate no rating available
          comment:
            review.review_plaintext ||
            review.review ||
            review.comment ||
            review.text ||
            "No comment provided",
          date:
            review.last_modified ||
            review.date_added ||
            review.posted ||
            review.date ||
            new Date().toISOString(),
        })
      );
    }

    return NextResponse.json(reviews);
  } catch (error) {
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
