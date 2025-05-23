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
    perPage: number = 500
  ): Promise<Album[]> {
    try {
      const searchResults = (await this.db.search({
        query,
        type: "release,master",
        format: "vinyl,album,lp",
        sort,
        per_page: perPage,
      })) as unknown as SearchResponse;

      // Group results by normalized artist-title combination
      const groupedResults = searchResults.results.reduce((acc, result) => {
        const title = (
          result.title?.split(" - ").slice(1).join(" - ") || "Unknown Title"
        ).toLowerCase();
        const artist = (
          result.artist ||
          result.title?.split(" - ")[0] ||
          "Unknown Artist"
        ).toLowerCase();
        const key = `${artist} - ${title}`;

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(result);
        return acc;
      }, {} as Record<string, typeof searchResults.results>);

      const processedAlbums: Album[] = [];

      // Process each group to find the best version
      for (const results of Object.values(groupedResults)) {
        if (results.length === 0) continue;

        // Prefer specific releases over master releases
        const specificReleases = results.filter(
          (result) => result.type !== "master"
        );

        if (specificReleases.length > 0) {
          // Sort by year to prefer older releases
          const sortedReleases = specificReleases.sort((a, b) => {
            const yearA = a.year
              ? parseInt(this.extractYearDigits(a.year))
              : Infinity;
            const yearB = b.year
              ? parseInt(this.extractYearDigits(b.year))
              : Infinity;
            return yearA - yearB;
          });

          const bestResult = sortedReleases[0];
          processedAlbums.push({
            id: bestResult.id,
            title:
              bestResult.title?.split(" - ").slice(1).join(" - ") ||
              "Unknown Title",
            artist:
              bestResult.artist ||
              bestResult.title?.split(" - ")[0] ||
              "Unknown Artist",
            year: bestResult.year
              ? this.extractYearDigits(bestResult.year)
              : undefined,
            coverImageURL: bestResult.cover_image,
            format: bestResult.format,
            isMasterRelease: false,
          });
          continue;
        }

        // Fall back to master release if no specific releases
        const masterReleases = results.filter(
          (result) => result.type === "master"
        );
        if (masterReleases.length > 0) {
          const bestResult = masterReleases[0];
          processedAlbums.push({
            id: bestResult.id,
            title:
              bestResult.title?.split(" - ").slice(1).join(" - ") ||
              "Unknown Title",
            artist:
              bestResult.artist ||
              bestResult.title?.split(" - ")[0] ||
              "Unknown Artist",
            year: bestResult.year
              ? this.extractYearDigits(bestResult.year)
              : undefined,
            coverImageURL: bestResult.cover_image,
            format: bestResult.format,
            isMasterRelease: true,
          });
          continue;
        }

        // Final fallback: use the first result
        const firstResult = results[0];
        processedAlbums.push({
          id: firstResult.id,
          title:
            firstResult.title?.split(" - ").slice(1).join(" - ") ||
            "Unknown Title",
          artist:
            firstResult.artist ||
            firstResult.title?.split(" - ")[0] ||
            "Unknown Artist",
          year: firstResult.year
            ? this.extractYearDigits(firstResult.year)
            : undefined,
          coverImageURL: firstResult.cover_image,
          format: firstResult.format,
          isMasterRelease: firstResult.type === "master",
        });
      }

      return processedAlbums;
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
