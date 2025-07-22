import { NextResponse } from "next/server";
import { DiscogsAPI } from "@/lib/api/discogs";
import { getDiscogsCredentials } from "@/lib/config/environment";

// Initialize the Discogs API client using validated environment variables
const getDiscogsAPI = () => {
  const credentials = getDiscogsCredentials();
  return new DiscogsAPI(credentials.consumerKey, credentials.consumerSecret);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const sort = searchParams.get("sort") || "relevance";
  const perPage = parseInt(searchParams.get("per_page") || "500");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const discogsAPI = getDiscogsAPI();
    const albums = await discogsAPI.searchAlbums(query, sort, perPage);
    return NextResponse.json(albums);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
