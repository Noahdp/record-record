import { VStack } from "@chakra-ui/react";
import { AlbumDetail } from "@/types/AlbumDetail";
import { TagList } from "./TagList";

interface AlbumMetadataProps {
  album: AlbumDetail;
}

export const AlbumMetadata = ({ album }: AlbumMetadataProps) => {
  return (
    <VStack spacing={3} w="full">
      <TagList label="Format" items={album.format || []} />
      <TagList label="Genres" items={album.genres || []} />
      <TagList label="Styles" items={album.styles || []} />
    </VStack>
  );
};
