import { Album } from "@/types/Album";

/**
 * Filters albums by search term, checking both artist and title
 * @param albums - Array of albums to filter
 * @param searchTerm - Search term to filter by
 * @returns Filtered array of albums
 */
export function filterAlbums(albums: Album[], searchTerm: string): Album[] {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return albums;
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return albums.filter((album) => {
    return (
      album.artist.toLowerCase().includes(normalizedSearchTerm) ||
      album.title.toLowerCase().includes(normalizedSearchTerm)
    );
  });
}

/**
 * Filters albums by multiple search terms (space-separated)
 * @param albums - Array of albums to filter
 * @param searchTerm - Search term(s) to filter by
 * @returns Filtered array of albums
 */
export function filterAlbumsMultiTerm(
  albums: Album[],
  searchTerm: string
): Album[] {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return albums;
  }

  const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/);

  return albums.filter((album) => {
    const artistLower = album.artist.toLowerCase();
    const titleLower = album.title.toLowerCase();

    return searchTerms.every(
      (term) => artistLower.includes(term) || titleLower.includes(term)
    );
  });
}
