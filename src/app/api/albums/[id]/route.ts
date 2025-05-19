import { NextResponse } from 'next/server';
import { DiscogsAPI } from '@/server/discogs-api';
import { APIError } from '@/server/api-error';

const discogsAPI = new DiscogsAPI(
  process.env.DISCOGS_CONSUMER_KEY || '',
  process.env.DISCOGS_CONSUMER_SECRET || ''
);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid album ID' },
      { status: 400 }
    );
  }

  try {
    const [albumDetails, reviews] = await Promise.all([
      discogsAPI.getBestAlbumDetails(id),
      discogsAPI.getAlbumReviews(id)
    ]);

    return NextResponse.json({
      ...albumDetails,
      reviews
    });
  } catch (error) {
    console.error('Error fetching album details:', error);
    
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
