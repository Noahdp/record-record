import { Client } from "disconnect";
import { Album } from "../types/Album";
import { AlbumDetail } from "../types/AlbumDetail";
import { CommunityReview } from "../types/CommunityReview";
import { APIError } from "./api-error";
import type { SearchResponse, DiscogsDatabase } from "disconnect";

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

  private extractYearDigits(dateString: string): string {
    const yearPattern = /\b(19|20)\d{2}\b/;
    const match = dateString.match(yearPattern);
    return match ? match[0] : dateString;
  }

  async searchAlbums(
    query: string,
    sort: string = "relevance",
    perPage: number = 30
  ): Promise<Album[]> {
    try {
      const searchResults = (await this.db.search({
        query,
        type: "release,master",
        format: "vinyl,album,lp",
        sort,
        per_page: perPage,
      })) as unknown as SearchResponse;

      return searchResults.results.map((result) => ({
        id: result.id,
        title:
          result.title?.split(" - ").slice(1).join(" - ") || "Unknown Title",
        artist:
          result.artist || result.title?.split(" - ")[0] || "Unknown Artist",
        year: result.year ? this.extractYearDigits(result.year) : undefined,
        coverImageURL: result.cover_image,
        format: result.format,
        isMasterRelease: result.type === "master",
      }));
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw APIError.networkError(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  async getMasterReleaseId(releaseId: number): Promise<number | null> {
    try {
      const release = await this.db.getRelease(releaseId);
      if (release.master_id) return release.master_id;

      if (release.master_url) {
        const masterId = release.master_url.split("/").pop();
        return masterId ? parseInt(masterId) : null;
      }

      return null;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw APIError.networkError(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  async getBestAlbumDetails(id: number): Promise<AlbumDetail> {
    try {
      const release = await this.db.getRelease(id);
      if (!release) {
        throw APIError.httpError(404);
      }
      return release as AlbumDetail;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw APIError.networkError(
        error instanceof Error ? error.message : "Unknown error"
      );
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
      if (error instanceof APIError) throw error;
      throw APIError.networkError(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
}
