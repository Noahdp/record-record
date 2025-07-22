import { useState, useEffect, useCallback } from "react";
import { Album } from "@/types/Album";
import { getCollection } from "@/lib/db/collection";

interface UseCollectionReturn {
  collection: Album[];
  loading: boolean;
  error: string | null;
  loadCollection: () => Promise<void>;
  refreshCollection: () => Promise<void>;
}

export function useCollection(): UseCollectionReturn {
  const [collection, setCollection] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load collection function
  const loadCollection = useCallback(async () => {
    try {
      setError(null);
      const albums = await getCollection();
      setCollection(albums);
    } catch (error) {
      console.error("Failed to load collection:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load collection";
      setError(errorMessage);
      setCollection([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh collection function (for when collection is updated)
  const refreshCollection = useCallback(async () => {
    setLoading(true);
    await loadCollection();
  }, [loadCollection]);

  // Load collection on hook initialization
  useEffect(() => {
    loadCollection();
  }, [loadCollection]);

  return {
    collection,
    loading,
    error,
    loadCollection,
    refreshCollection,
  };
}
