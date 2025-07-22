import { Client } from "disconnect";
import { Album } from "@/types/Album";
import { AlbumDetail } from "@/types/AlbumDetail";
import { APIError } from "../errors/api-error";
import type {
  SearchResponse,
  DiscogsDatabase,
  DiscogsSearchResult,
} from "disconnect";

export class DiscogsAPI {
  private db: DiscogsDatabase;

  constructor(consumerKey: string, consumerSecret: string) {
    const client = new Client({
      consumerKey,
      consumerSecret,
      userAgent: "Record Record/1.0",
    });
    this.db = client.database();
  }

  async searchAlbums(
    query: string,
    sort: string = "relevance",
    perPage: number = 500
  ): Promise<Album[]> {
    try {
      const searchResults = (await this.db.search({
        query,
        type: "release",
        format: "album",
        sort,
        per_page: perPage,
      })) as unknown as SearchResponse;

      // Group results by normalized artist-title combination
      const groupedResults = searchResults.results.reduce((acc, result) => {
        const titleParts = result.title?.split(" - ") || ["", ""];
        const title = (
          titleParts.length > 1
            ? titleParts.slice(1).join(" - ")
            : titleParts[0] || "Unknown Title"
        ).toLowerCase();
        const artist = (
          result.artist ||
          titleParts[0] ||
          "Unknown Artist"
        ).toLowerCase();
        const key = `${artist} - ${title}`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(result);
        return acc;
      }, {} as Record<string, typeof searchResults.results>);

      return Object.values(groupedResults)
        .filter((results) => results.length > 0)
        .map((results) => this.createBestAlbumFromResults(results));
    } catch (error) {
      this.handleError(error);
    }
  }

  private createBestAlbumFromResults(results: DiscogsSearchResult[]): Album {
    const bestResult = results.sort((a, b) => {
      const yearA = a.year
        ? parseInt(this.extractYearDigits(a.year))
        : Infinity;
      const yearB = b.year
        ? parseInt(this.extractYearDigits(b.year))
        : Infinity;
      return yearA - yearB;
    })[0];

    const titleParts = bestResult.title?.split(" - ") || ["", "Unknown Title"];
    const title =
      titleParts.length > 1
        ? titleParts.slice(1).join(" - ")
        : titleParts[0] || "Unknown Title";
    const artist = bestResult.artist || titleParts[0] || "Unknown Artist";

    const album: Album = {
      id: bestResult.id,
      title,
      artist,
      year: bestResult.year
        ? this.extractYearDigits(bestResult.year)
        : undefined,
      format: bestResult.format,
    };

    if (bestResult.cover_image) {
      album.coverImageURL = bestResult.cover_image;
    }

    return album;
  }

  private extractYearDigits(dateString: string): string {
    const yearPattern = /\b(19|20)\d{2}\b/;
    const match = dateString.match(yearPattern);
    return match ? match[0] : dateString;
  }

  private handleError(error: unknown): never {
    if (error instanceof APIError) throw error;
    throw APIError.networkError(
      error instanceof Error ? error.message : "Unknown error"
    );
  }

  async getBestAlbumDetails(id: number): Promise<AlbumDetail> {
    try {
      const release = await this.db.getRelease(id);
      if (!release) {
        throw APIError.httpError(404);
      }

      const coverImageURL = release.images?.[0]?.uri || "";

      // Map extraartists to credits with proper ArtistCredit structure
      const credits = (release.extraartists || []).map((artist) => ({
        name: artist.name,
        role: artist.role || undefined,
      }));

      // Map tracklist with proper Track structure including extraartists
      const tracklist = (release.tracklist || []).map((track) => ({
        position: track.position,
        title: track.title,
        duration: track.duration,
        artists: (track.extraartists || []).map((artist) => ({
          name: artist.name,
          role: artist.role || undefined,
        })),
      }));

      // Extract community rating from release data
      const communityRating = release.community?.rating
        ? {
            average: release.community.rating.average,
            count: release.community.rating.count,
          }
        : undefined;

      return {
        id: release.id,
        title: release.title,
        artist: release.artist || "",
        year: release.year,
        coverImageURL,
        format: release.format || [],
        genres: release.genres || [],
        styles: release.styles || [],
        tracklist,
        credits,
        description: release.description || "",
        communityRating,
      } as AlbumDetail;
    } catch (error) {
      this.handleError(error);
    }
  }
}
