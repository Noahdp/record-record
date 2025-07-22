"use client";

import React from "react";
import { Box, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { Album } from "@/types/Album";
import { calculateCollectionStats } from "@/utils/collectionUtils";
import { useAppColors } from "@/hooks/useAppColors";

const MotionBox = motion(Box);

interface CollectionStatsProps {
  collection: Album[];
  loading: boolean;
  variants?: Variants;
}

export const CollectionStats = React.memo(
  ({ collection, loading, variants }: CollectionStatsProps) => {
    // Use centralized color values
    const { textColor, cardBg, borderColor } = useAppColors();

    // Calculate statistics using utility function
    const stats = React.useMemo(() => {
      return calculateCollectionStats(collection);
    }, [collection]);

    // Don't render if loading or no collection
    if (loading || collection.length === 0) {
      return null;
    }

    return (
      <MotionBox variants={variants}>
        <SimpleGrid columns={[1, 2]} spacing={6}>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            boxShadow="sm"
            textAlign="center"
            border="1px solid"
            borderColor={borderColor}
          >
            <Stat>
              <StatNumber fontSize="2xl" color="brand.500">
                {stats.totalAlbums}
              </StatNumber>
              <StatLabel color={textColor}>Total Albums</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            boxShadow="sm"
            textAlign="center"
            border="1px solid"
            borderColor={borderColor}
          >
            <Stat>
              <StatNumber fontSize="2xl" color="brand.500">
                {stats.uniqueArtists}
              </StatNumber>
              <StatLabel color={textColor}>Unique Artists</StatLabel>
            </Stat>
          </Box>
        </SimpleGrid>
      </MotionBox>
    );
  }
);

CollectionStats.displayName = "CollectionStats";
