import { useState, useCallback } from "react";
import { AlbumDetail } from "@/types/AlbumDetail";

interface UseAlbumDetailsReturn {
  selectedAlbumId: number | null;
  albumDetail: AlbumDetail | null;
  loadingDetail: boolean;
  error: string | null;
  fetchAlbumDetails: (albumId: number) => Promise<void>;
  clearAlbumDetails: () => void;
}

export function useAlbumDetails(): UseAlbumDetailsReturn {
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [albumDetail, setAlbumDetail] = useState<AlbumDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbumDetails = useCallback(async (albumId: number) => {
    setSelectedAlbumId(albumId);
    setAlbumDetail(null); // Clear previous album data
    setLoadingDetail(true);
    setError(null);

    try {
      // Fetch album details and reviews in parallel
      const [albumRes, reviewsRes] = await Promise.all([
        fetch(`/api/discogs/${albumId}`),
        fetch(`/api/discogs/${albumId}/reviews`),
      ]);

      if (!albumRes.ok) {
        throw new Error(`Failed to fetch album details: ${albumRes.status}`);
      }

      const albumData = await albumRes.json();
      const reviewsData = await reviewsRes.json();

      // Combine album data with reviews
      const albumWithReviews = {
        ...albumData,
        reviews: reviewsData,
      };

      setAlbumDetail(albumWithReviews);
    } catch (error) {
      console.error("Error fetching album details:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch album details";
      setError(errorMessage);
      setAlbumDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  const clearAlbumDetails = useCallback(() => {
    setSelectedAlbumId(null);
    setAlbumDetail(null);
    setLoadingDetail(false);
    setError(null);
  }, []);

  return {
    selectedAlbumId,
    albumDetail,
    loadingDetail,
    error,
    fetchAlbumDetails,
    clearAlbumDetails,
  };
}
