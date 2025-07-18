import { Box, Card, CardBody, HStack, VStack, Divider } from "@chakra-ui/react";
import { AlbumDetail } from "@/types/AlbumDetail";
import { AlbumArtwork } from "./AlbumArtwork";
import { AlbumMetadata } from "./AlbumMetadata";
import { AlbumDescription } from "./AlbumDescription";
import { Tracklist } from "./Tracklist";
import { Credits } from "./Credits";
import { ReviewSection } from "./ReviewSection";

interface AlbumDetailCardProps {
  album: AlbumDetail;
}

export const AlbumDetailCard = ({ album }: AlbumDetailCardProps) => {
  return (
    <Box
      maxW="none"
      w="full"
      minW="950px"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="start"
    >
      <Card
        bg="gray.50"
        _dark={{ bg: "gray.900", borderColor: "gray.700" }}
        shadow="2xl"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.200"
        w="full"
        maxW="1000px"
      >
        <CardBody p={8}>
          <HStack spacing={8} align="start">
            {/* Left Column - Album Art and Metadata */}
            <VStack spacing={4} minW="300px" flexShrink={0}>
              <AlbumArtwork album={album} />
              <AlbumMetadata album={album} />
            </VStack>

            {/* Right Column - Content */}
            <VStack
              flex={1}
              align="start"
              spacing={6}
              overflow="hidden"
              minH={0}
            >
              {album.description && (
                <AlbumDescription description={album.description} />
              )}
              {album.tracklist && <Tracklist tracks={album.tracklist} />}
              {album.credits && <Credits credits={album.credits} />}

              {/* Reviews Section */}
              {(album.reviews || album.communityRating) && (
                <Box w="full" minH={0} overflow="hidden">
                  <Divider mb={4} />
                  <ReviewSection
                    reviews={album.reviews || []}
                    communityRating={album.communityRating}
                  />
                </Box>
              )}
            </VStack>
          </HStack>
        </CardBody>
      </Card>
    </Box>
  );
};
