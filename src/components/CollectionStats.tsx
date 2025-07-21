"use client";

import React from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { Album } from "@/types/Album";

const MotionBox = motion(Box);

interface CollectionStatsProps {
  collection: Album[];
  loading: boolean;
  variants?: Variants;
}

interface Stats {
  totalAlbums: number;
  uniqueArtists: number;
  decades: number;
}

export const CollectionStats = React.memo(
  ({ collection, loading, variants }: CollectionStatsProps) => {
    // Color mode values
    const textColor = useColorModeValue("gray.600", "gray.300");
    const statBg = useColorModeValue("white", "gray.800");
    const statBorderColor = useColorModeValue("gray.200", "gray.700");

    // Calculate statistics
    const stats: Stats = React.useMemo(() => {
      const uniqueArtists = new Set(collection.map((album) => album.artist))
        .size;
      const decades = new Set(
        collection.map((album) => {
          if (album.year && typeof album.year === "number") {
            return Math.floor(album.year / 10) * 10;
          }
          return "Unknown";
        })
      ).size;

      return {
        totalAlbums: collection.length,
        uniqueArtists,
        decades,
      };
    }, [collection]);

    // Don't render if loading or no collection
    if (loading || collection.length === 0) {
      return null;
    }

    return (
      <MotionBox variants={variants}>
        <SimpleGrid columns={[1, 3]} spacing={6}>
          <Box
            bg={statBg}
            p={6}
            borderRadius="xl"
            boxShadow="sm"
            textAlign="center"
            border="1px solid"
            borderColor={statBorderColor}
          >
            <Stat>
              <StatNumber fontSize="2xl" color="brand.500">
                {stats.totalAlbums}
              </StatNumber>
              <StatLabel color={textColor}>Total Albums</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={statBg}
            p={6}
            borderRadius="xl"
            boxShadow="sm"
            textAlign="center"
            border="1px solid"
            borderColor={statBorderColor}
          >
            <Stat>
              <StatNumber fontSize="2xl" color="brand.500">
                {stats.uniqueArtists}
              </StatNumber>
              <StatLabel color={textColor}>Unique Artists</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={statBg}
            p={6}
            borderRadius="xl"
            boxShadow="sm"
            textAlign="center"
            border="1px solid"
            borderColor={statBorderColor}
          >
            <Stat>
              <StatNumber fontSize="2xl" color="brand.500">
                {stats.decades}
              </StatNumber>
              <StatLabel color={textColor}>Decades Represented</StatLabel>
            </Stat>
          </Box>
        </SimpleGrid>
      </MotionBox>
    );
  }
);

CollectionStats.displayName = "CollectionStats";
