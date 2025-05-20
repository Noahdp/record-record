import { Box, Image, Text } from "@chakra-ui/react";

interface AlbumCardProps {
  title: string;
  artist: string;
  coverUrl: string;
}

export const AlbumCard = ({ title, artist, coverUrl }: AlbumCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={coverUrl} alt={`${title} album cover`} />
      <Box p="6">
        <Text fontWeight="bold">{title}</Text>
        <Text>{artist}</Text>
      </Box>
    </Box>
  );
};
