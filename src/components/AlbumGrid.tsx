import { SimpleGrid } from "@chakra-ui/react";
import { AlbumCard } from "./AlbumCard";
import { Album } from "@/types/Album";
import { useState, useEffect, useCallback } from "react";
import { isInCollection } from "@/lib/db/collection";

interface AlbumGridProps {
  albums: Album[];
  onCollectionUpdate?: () => void;
  showDeleteButton?: boolean;
}

export const AlbumGrid = ({ albums, onCollectionUpdate, showDeleteButton = false }: AlbumGridProps) => {
  const [collectionIds, setCollectionIds] = useState<Set<string>>(new Set());

  const fetchCollectionStatus = useCallback(async () => {
    const statuses = await Promise.all(
      albums.map((album) => isInCollection(album.id))
    );
    const ids = new Set(
      albums
        .filter((_, index) => statuses[index])
        .map((album) => album.id.toString())
    );
    setCollectionIds(ids);
  }, [albums]);

  const handleCollectionUpdate = useCallback(() => {
    fetchCollectionStatus();
    onCollectionUpdate?.();
  }, [fetchCollectionStatus, onCollectionUpdate]);

  useEffect(() => {
    fetchCollectionStatus();
  }, [fetchCollectionStatus]);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
    >
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          inCollection={collectionIds.has(album.id.toString())}
          onCollectionUpdate={handleCollectionUpdate}
          showDeleteButton={showDeleteButton}
        />
      ))}
    </SimpleGrid>
  );
};
