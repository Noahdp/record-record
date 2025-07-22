import { VStack, Image, Heading, HStack, Text } from "@chakra-ui/react";
import { AlbumDetail } from "@/types/AlbumDetail";
import { formatAlbumReleaseDate } from "@/utils/dateUtils";

interface AlbumDetailHeaderProps {
  album: AlbumDetail;
}

export const AlbumDetailHeader = ({ album }: AlbumDetailHeaderProps) => {
  return (
    <VStack spacing={4} minW="280px">
      {album.coverImageURL && (
        <Image
          src={album.coverImageURL}
          alt={`${album.title} album cover`}
          w="280px"
          h="280px"
          objectFit="cover"
          borderRadius="xl"
          shadow="2xl"
          flexShrink={0}
        />
      )}
      <VStack spacing={3} align="start" w="full">
        <Heading size="lg" textAlign="center" w="full">
          {album.title}
        </Heading>
        <HStack justify="center" w="full">
          <Text
            fontSize="xl"
            fontWeight="semibold"
            color="gray.700"
            _dark={{ color: "gray.300" }}
          >
            {album.artist}
          </Text>
          {album.year && (
            <Text fontSize="lg" color="gray.500" fontWeight="medium">
              ({formatAlbumReleaseDate(album.year)})
            </Text>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};
