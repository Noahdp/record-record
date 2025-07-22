"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Progress,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Album } from "@/types/Album";
import {
  getUniqueArtists,
  getYearRange,
  getTopArtists,
} from "@/utils/collectionUtils";
import { fadeInUp, staggerChildren } from "@/utils/animationUtils";
import { useToggle } from "@/hooks/useToggle";
import { useAppColors } from "@/hooks/useAppColors";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface CollectionAnalyticsProps {
  collection: Album[];
  loading: boolean;
}

// Helper function to get decade distribution
function getDecadeDistribution(
  albums: Album[]
): Array<{ decade: string; count: number }> {
  const decadeCounts = new Map<string, number>();

  albums.forEach((album) => {
    let decade: string;
    if (album.year) {
      const yearNum = parseInt(album.year, 10);
      if (!isNaN(yearNum)) {
        decade = `${Math.floor(yearNum / 10) * 10}s`;
      } else {
        decade = "Unknown";
      }
    } else {
      decade = "Unknown";
    }

    decadeCounts.set(decade, (decadeCounts.get(decade) || 0) + 1);
  });

  return Array.from(decadeCounts.entries())
    .map(([decade, count]) => ({ decade, count }))
    .sort((a, b) => {
      if (a.decade === "Unknown") return 1;
      if (b.decade === "Unknown") return -1;
      return a.decade.localeCompare(b.decade);
    });
}

export const CollectionAnalytics = React.memo(
  ({ collection, loading }: CollectionAnalyticsProps) => {
    const { isOpen: showAnalytics, toggle: toggleAnalytics } = useToggle();

    // Use centralized color values
    const { cardBg, borderColor, textColor, headingColor } = useAppColors();

    // Calculate analytics data
    const analyticsData = React.useMemo(() => {
      if (collection.length === 0) return null;

      const uniqueArtists = getUniqueArtists(collection);
      const yearRange = getYearRange(collection);
      const topArtists = getTopArtists(collection, 5);
      const decadeDistribution = getDecadeDistribution(collection);

      return {
        uniqueArtists,
        yearRange,
        topArtists,
        decadeDistribution,
      };
    }, [collection]);

    if (loading || collection.length === 0 || !analyticsData) {
      return null;
    }

    const containerVariants = staggerChildren(0.1, 0.6);
    const itemVariants = fadeInUp(0, 0.4);

    return (
      <MotionBox
        bg={cardBg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between" align="center">
            <Heading size="md" color={headingColor}>
              Collection Analytics
            </Heading>
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleAnalytics}
              colorScheme="brand"
            >
              {showAnalytics ? "Hide Details" : "Show Details"}
            </Button>
          </HStack>

          <Collapse in={showAnalytics} animateOpacity>
            <MotionVStack spacing={6} align="stretch" variants={itemVariants}>
              {/* Year Range */}
              {analyticsData.yearRange && (
                <Box>
                  <Text fontWeight="semibold" mb={2} color={headingColor}>
                    Collection Span
                  </Text>
                  <Text color={textColor}>
                    {analyticsData.yearRange.min} -{" "}
                    {analyticsData.yearRange.max}(
                    {analyticsData.yearRange.max -
                      analyticsData.yearRange.min +
                      1}{" "}
                    years)
                  </Text>
                </Box>
              )}

              {/* Top Artists */}
              <Box>
                <Text fontWeight="semibold" mb={3} color={headingColor}>
                  Most Collected Artists
                </Text>
                <VStack spacing={2} align="stretch">
                  {analyticsData.topArtists.map((artist, index) => (
                    <HStack key={artist.artist} justify="space-between">
                      <HStack>
                        <Badge colorScheme="brand" variant="subtle">
                          {index + 1}
                        </Badge>
                        <Text color={textColor}>{artist.artist}</Text>
                      </HStack>
                      <Badge colorScheme="gray">
                        {artist.count} album{artist.count > 1 ? "s" : ""}
                      </Badge>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Decade Distribution */}
              <Box>
                <Text fontWeight="semibold" mb={3} color={headingColor}>
                  By Decade
                </Text>
                <VStack spacing={3} align="stretch">
                  {analyticsData.decadeDistribution.map((decade) => {
                    const percentage = (decade.count / collection.length) * 100;
                    return (
                      <Box key={decade.decade}>
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm" color={textColor}>
                            {decade.decade}
                          </Text>
                          <Badge colorScheme="gray" size="sm">
                            {decade.count} ({percentage.toFixed(1)}%)
                          </Badge>
                        </HStack>
                        <Progress
                          value={percentage}
                          colorScheme="brand"
                          size="sm"
                          borderRadius="full"
                        />
                      </Box>
                    );
                  })}
                </VStack>
              </Box>

              {/* Quick Stats Grid */}
              <SimpleGrid columns={[2, 3]} spacing={4}>
                <Stat textAlign="center">
                  <StatNumber fontSize="lg" color="brand.500">
                    {analyticsData.uniqueArtists.length}
                  </StatNumber>
                  <StatLabel fontSize="xs" color={textColor}>
                    Unique Artists
                  </StatLabel>
                </Stat>
                <Stat textAlign="center">
                  <StatNumber fontSize="lg" color="brand.500">
                    {analyticsData.decadeDistribution.length}
                  </StatNumber>
                  <StatLabel fontSize="xs" color={textColor}>
                    Decades
                  </StatLabel>
                </Stat>
                <Stat textAlign="center">
                  <StatNumber fontSize="lg" color="brand.500">
                    {(
                      collection.length / analyticsData.uniqueArtists.length
                    ).toFixed(1)}
                  </StatNumber>
                  <StatLabel fontSize="xs" color={textColor}>
                    Avg Albums/Artist
                  </StatLabel>
                </Stat>
              </SimpleGrid>
            </MotionVStack>
          </Collapse>
        </VStack>
      </MotionBox>
    );
  }
);

CollectionAnalytics.displayName = "CollectionAnalytics";
