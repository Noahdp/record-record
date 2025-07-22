import { NextResponse } from "next/server";
import { DiscogsAPI } from "@/lib/api/discogs";
import { APIError } from "@/lib/errors/api-error";
import { getDiscogsCredentials } from "@/lib/config/environment";

const getDiscogsAPI = () => {
  const credentials = getDiscogsCredentials();
  return new DiscogsAPI(credentials.consumerKey, credentials.consumerSecret);
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
  }

  try {
    const discogsAPI = getDiscogsAPI();
    const albumDetails = await discogsAPI.getBestAlbumDetails(id);
    return NextResponse.json(albumDetails);
  } catch (error) {
    console.error("Album Details API Error:", error);
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
