import { Box, Card, CardBody, VStack, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AlbumDetail } from "@/types/AlbumDetail";
import { AlbumDetailHeader } from "./AlbumDetailHeader";
import { AlbumMetadata } from "./AlbumMetadata";
import { AlbumDescription } from "./AlbumDescription";
import { Tracklist } from "./Tracklist";
import { Credits } from "./Credits";
import { ReviewSection } from "./ReviewSection";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

interface AlbumDetailCardProps {
  album: AlbumDetail;
}

export const AlbumDetailCard = ({ album }: AlbumDetailCardProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <MotionBox
      maxW="none"
      w="full"
      minW={["320px", "950px"]}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="start"
      p={[4, 8]}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <MotionCard
        bg="white"
        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        shadow="xl"
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.100"
        w="full"
        maxW="1200px"
        overflow="hidden"
        variants={itemVariants}
      >
        <CardBody p={[6, 10]}>
          <VStack spacing={[6, 8]} align="stretch">
            {/* Mobile: Stack vertically, Desktop: Side by side */}
            <Box
              display="flex"
              flexDirection={["column", "column", "row"]}
              gap={[6, 8]}
              alignItems="flex-start"
            >
              {/* Left Column - Album Art and Metadata */}
              <MotionBox
                minW={["full", "350px"]}
                maxW={["full", "350px"]}
                flexShrink={0}
                variants={itemVariants}
              >
                <VStack spacing={6}>
                  <AlbumDetailHeader album={album} />
                  <AlbumMetadata album={album} />
                </VStack>
              </MotionBox>

              {/* Right Column - Content */}
              <MotionBox flex={1} minH={0} w="full" variants={itemVariants}>
                <VStack spacing={8} align="start" w="full">
                  {album.description && (
                    <MotionBox w="full" variants={itemVariants}>
                      <AlbumDescription description={album.description} />
                    </MotionBox>
                  )}

                  {album.tracklist && (
                    <MotionBox w="full" variants={itemVariants}>
                      <Tracklist tracks={album.tracklist} />
                    </MotionBox>
                  )}

                  {album.credits && (
                    <MotionBox w="full" variants={itemVariants}>
                      <Credits credits={album.credits} />
                    </MotionBox>
                  )}
                </VStack>
              </MotionBox>
            </Box>

            {/* Reviews Section - Full Width */}
            {(album.reviews || album.communityRating) && (
              <MotionBox w="full" variants={itemVariants}>
                <Divider
                  mb={6}
                  borderColor="gray.200"
                  _dark={{ borderColor: "gray.600" }}
                />
                <ReviewSection
                  reviews={album.reviews || []}
                  communityRating={album.communityRating}
                />
              </MotionBox>
            )}
          </VStack>
        </CardBody>
      </MotionCard>
    </MotionBox>
  );
};
