import { NextResponse } from 'next/server';
import { DiscogsAPI } from '@/server/discogs-api';

// Initialize the Discogs API client using environment variables
const discogsAPI = new DiscogsAPI(
    process.env.DISCOGS_CONSUMER_KEY || '',
    process.env.DISCOGS_CONSUMER_SECRET || ''
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const sort = searchParams.get('sort') || 'relevance';
  const perPage = parseInt(searchParams.get('per_page') || '30');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const albums = await discogsAPI.searchAlbums(query, sort, perPage);
    return NextResponse.json(albums);
  } catch (error) {
    console.error('Error searching albums:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
