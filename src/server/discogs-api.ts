import { Client } from "disconnect";
import { Album } from "../types/Album";
import { AlbumDetail } from "../types/AlbumDetail";
import { CommunityReview } from "../types/CommunityReview";
import { APIError } from "./api-error";
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
        type: "master,release",
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
    // Find the best result (oldest by year) and create album
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

    return {
      id: bestResult.id,
      title,
      artist,
      year: bestResult.year
        ? this.extractYearDigits(bestResult.year)
        : undefined,
      coverImageURL: bestResult.cover_image,
      format: bestResult.format,
    };
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
      return release as AlbumDetail;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAlbumReviews(id: number): Promise<CommunityReview[]> {
    try {
      const response = await fetch(
        `https://api.discogs.com/releases/${id}/reviews`,
        {
          headers: {
            "User-Agent": "Record Record/1.0",
          },
        }
      );

      if (!response.ok) {
        throw APIError.httpError(response.status);
      }

      const data = await response.json();
      if (!data.results) {
        throw APIError.invalidResponse();
      }

      return data.results;
    } catch (error) {
      this.handleError(error);
    }
  }
}
