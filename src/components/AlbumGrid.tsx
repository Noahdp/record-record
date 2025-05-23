import { SimpleGrid } from "@chakra-ui/react";
import { AlbumCard } from "./AlbumCard";
import { Album } from "@/types/Album";
import { useState, useEffect, useCallback } from "react";
import { isInCollection } from "@/lib/db/collection";

interface AlbumGridProps {
  albums: Album[];
}

export const AlbumGrid = ({ albums }: AlbumGridProps) => {
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

  useEffect(() => {
    fetchCollectionStatus();
  }, [fetchCollectionStatus]);

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          inCollection={collectionIds.has(album.id.toString())}
          onCollectionUpdate={() => fetchCollectionStatus()}
        />
      ))}
    </SimpleGrid>
  );
};
