"use client";

import React from "react";
import { Box, Heading, Button, Text, Spinner, VStack } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { Album } from "@/types/Album";
import { AlbumGrid } from "@/components/AlbumGrid";
import { useAppColors } from "@/hooks/useAppColors";

const MotionBox = motion(Box);

interface ResultsDisplayProps {
  loading: boolean;
  results: Album[];
  searchQuery?: string;
  hasSearched?: boolean;
  onCollectionUpdate: () => void;
  onClearResults?: () => void;
  showDeleteButton?: boolean;
  showInCollectionBadge?: boolean;
  variants?: Variants;
  loadingText?: string;
  noResultsText?: string;
  emptyStateIcon?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateAction?: {
    text: string;
    onClick: () => void;
  };
}

export const ResultsDisplay = React.memo(
  ({
    loading,
    results,
    searchQuery,
    hasSearched = true,
    onCollectionUpdate,
    onClearResults,
    showDeleteButton = false,
    showInCollectionBadge = true,
    variants,
    loadingText = "Loading...",
    noResultsText,
    emptyStateIcon = "🎵",
    emptyStateTitle = "No results found",
    emptyStateDescription = "Try adjusting your search criteria.",
    emptyStateAction,
  }: ResultsDisplayProps) => {
    // Use centralized color values
    const { headingColor, textColor } = useAppColors();

    // Loading State
    if (loading) {
      return (
        <MotionBox variants={variants} textAlign="center" py={10}>
          <VStack spacing={4}>
            <Spinner color="brand.500" size="xl" thickness="3px" />
            <Text color={textColor} fontSize="lg">
              {loadingText}
            </Text>
          </VStack>
        </MotionBox>
      );
    }

    // No Results State
    if (results.length === 0 && hasSearched) {
      const displayText =
        noResultsText ||
        (searchQuery
          ? `No albums found for "${searchQuery}"`
          : emptyStateTitle);

      return (
        <MotionBox variants={variants} textAlign="center" py={10}>
          <VStack spacing={6}>
            <Box color="gray.400" fontSize="6xl">
              {emptyStateIcon}
            </Box>
            <VStack spacing={2}>
              <Heading size="lg" color={headingColor}>
                {displayText}
              </Heading>
              <Text color={textColor} fontSize="lg">
                {emptyStateDescription}
              </Text>
            </VStack>
            {(onClearResults || emptyStateAction) && (
              <VStack spacing={4}>
                {onClearResults && (
                  <Button
                    onClick={onClearResults}
                    variant="outline"
                    colorScheme="brand"
                  >
                    Clear Search
                  </Button>
                )}
                {emptyStateAction && (
                  <Button
                    colorScheme="brand"
                    size="lg"
                    onClick={emptyStateAction.onClick}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    {emptyStateAction.text}
                  </Button>
                )}
              </VStack>
            )}
          </VStack>
        </MotionBox>
      );
    }

    // Results State
    if (results.length > 0) {
      return (
        <MotionBox
          variants={variants}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VStack spacing={6} align="stretch">
            <Heading size="lg" textAlign="center" color={headingColor}>
              {searchQuery
                ? `Found ${results.length} album${
                    results.length !== 1 ? "s" : ""
                  } for ${searchQuery}`
                : `${results.length} album${results.length !== 1 ? "s" : ""}`}
            </Heading>
            <AlbumGrid
              albums={results}
              onCollectionUpdate={onCollectionUpdate}
              showDeleteButton={showDeleteButton}
              showInCollectionBadge={showInCollectionBadge}
            />
          </VStack>
        </MotionBox>
      );
    }

    // Default empty state (no search performed)
    return null;
  }
);

ResultsDisplay.displayName = "ResultsDisplay";
