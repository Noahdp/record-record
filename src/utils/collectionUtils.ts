import { Album } from "@/types/Album";

export interface CollectionStats {
  totalAlbums: number;
  uniqueArtists: number;
}

export interface YearRange {
  min: number;
  max: number;
}

/**
 * Calculate collection statistics including total albums, unique artists, and decades
 * @param albums - Array of albums to analyze
 * @returns Collection statistics object
 */
export function calculateCollectionStats(albums: Album[]): CollectionStats {
  const uniqueArtists = getUniqueArtists(albums).length;

  return {
    totalAlbums: albums.length,
    uniqueArtists,
  };
}

/**
 * Get unique artists from a collection of albums
 * @param albums - Array of albums
 * @returns Array of unique artist names
 */
export function getUniqueArtists(albums: Album[]): string[] {
  return Array.from(new Set(albums.map((album) => album.artist)));
}

/**
 * Get the year range of albums in collection
 * @param albums - Array of albums
 * @returns Object with min and max years, or null if no valid years
 */
export function getYearRange(albums: Album[]): YearRange | null {
  const validYears = albums
    .map((album) => album.year)
    .filter((year): year is string => typeof year === "string")
    .map((year) => parseInt(year, 10))
    .filter((year) => !isNaN(year) && year > 0);

  if (validYears.length === 0) {
    return null;
  }

  return {
    min: Math.min(...validYears),
    max: Math.max(...validYears),
  };
}

/**
 * Get the most common artists in collection
 * @param albums - Array of albums
 * @param limit - Maximum number of artists to return
 * @returns Array of artists with their album counts
 */
export function getTopArtists(
  albums: Album[],
  limit: number = 10
): Array<{ artist: string; count: number }> {
  const artistCounts = new Map<string, number>();

  albums.forEach((album) => {
    artistCounts.set(album.artist, (artistCounts.get(album.artist) || 0) + 1);
  });

  return Array.from(artistCounts.entries())
    .map(([artist, count]) => ({ artist, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Filter albums by decade
 * @param albums - Array of albums
 * @param decade - Decade to filter by (e.g., "1980s", "Unknown")
 * @returns Filtered array of albums
 */
export function filterByDecade(albums: Album[], decade: string): Album[] {
  return albums.filter((album) => {
    if (decade === "Unknown") {
      return !album.year || isNaN(parseInt(album.year, 10));
    }

    if (album.year) {
      const yearNum = parseInt(album.year, 10);
      if (!isNaN(yearNum)) {
        const albumDecade = `${Math.floor(yearNum / 10) * 10}s`;
        return albumDecade === decade;
      }
    }

    return false;
  });
}
