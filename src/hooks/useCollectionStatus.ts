import { useState, useCallback, useEffect } from "react";
import { Album } from "@/types/Album";
import { isInCollection } from "@/lib/db/collection";

interface UseCollectionStatusReturn {
  collectionIds: Set<string>;
  loading: boolean;
  refreshCollectionStatus: () => Promise<void>;
  isAlbumInCollection: (albumId: number) => boolean;
}

export function useCollectionStatus(
  albums: Album[]
): UseCollectionStatusReturn {
  const [collectionIds, setCollectionIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchCollectionStatus = useCallback(async () => {
    if (albums.length === 0) {
      setCollectionIds(new Set());
      return;
    }

    setLoading(true);
    try {
      // Batch check collection status for all albums
      const statuses = await Promise.all(
        albums.map((album) => isInCollection(album.id))
      );

      // Create set of album IDs that are in collection
      const ids = new Set(
        albums
          .filter((_, index) => statuses[index])
          .map((album) => album.id.toString())
      );

      setCollectionIds(ids);
    } catch (error) {
      console.error("Failed to fetch collection status:", error);
      setCollectionIds(new Set());
    } finally {
      setLoading(false);
    }
  }, [albums]);

  const refreshCollectionStatus = useCallback(async () => {
    await fetchCollectionStatus();
  }, [fetchCollectionStatus]);

  const isAlbumInCollection = useCallback(
    (albumId: number): boolean => {
      return collectionIds.has(albumId.toString());
    },
    [collectionIds]
  );

  // Auto-fetch when albums change
  useEffect(() => {
    fetchCollectionStatus();
  }, [fetchCollectionStatus]);

  return {
    collectionIds,
    loading,
    refreshCollectionStatus,
    isAlbumInCollection,
  };
}
