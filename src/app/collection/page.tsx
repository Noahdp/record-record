"use client";

import { CollectionStats } from "@/components/CollectionStats";
import { CollectionAnalytics } from "@/components/CollectionAnalytics";
import { SearchInput } from "@/components/SearchInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useCollection } from "@/hooks/useCollection";
import { useAppColors } from "@/hooks/useAppColors";
import { filterAlbumsMultiTerm } from "@/utils/filterAlbums";
import dynamic from "next/dynamic";
import { Box, Heading, Text, Container, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import React from "react";
import { Album } from "@/types/Album";

// Dynamically import NavBar with SSR disabled to avoid hydration issues
const NavBar = dynamic(
  () =>
    import("@/components/NavBar").then((mod) => ({
      default: mod.NavBar,
    })),
  {
    ssr: false,
  }
);

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function CollectionPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState<Album[]>([]);

  // Use custom collection hook
  const { collection, loading, refreshCollection } = useCollection();

  // Use centralized color values
  const { bgGradient, headingColor, textColor } = useAppColors();

  // Initialize filtered results when collection changes
  const initializeFilteredResults = useCallback(() => {
    setFilteredResults(collection);
  }, [collection]);

  // Initialize filtered results when collection loads
  React.useEffect(() => {
    initializeFilteredResults();
  }, [initializeFilteredResults]);

  // Filter collection by artist and title (supports multiple search terms)
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);

      const filtered = filterAlbumsMultiTerm(collection, value);
      setFilteredResults(filtered);
    },
    [collection]
  );

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchValue("");
    setFilteredResults(collection);
  }, [collection]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    []
  );

  return (
    <>
      <NavBar />

      <MotionBox
        minH="100vh"
        bgGradient={bgGradient}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Container maxW="container.xl" py={[8, 16]}>
          <MotionVStack
            spacing={10}
            align="stretch"
            variants={containerVariants}
          >
            {/* Header Section */}
            <MotionBox variants={itemVariants}>
              <VStack spacing={2} textAlign="center">
                <Heading
                  as="h1"
                  size={["xl", "2xl"]}
                  fontWeight="bold"
                  color={headingColor}
                >
                  My Collection
                </Heading>
                <Text fontSize={["md", "lg"]} color={textColor}>
                  Browse and manage your vinyl record collection
                </Text>
              </VStack>
            </MotionBox>

            {/* Statistics Section */}
            <CollectionStats
              collection={collection}
              loading={loading}
              variants={itemVariants}
            />

            {/* Analytics Section */}
            <CollectionAnalytics collection={collection} loading={loading} />

            {/* Controls Section */}
            <SearchInput
              searchValue={searchValue}
              onSearchChange={handleSearch}
              placeholder="Filter by artist or album title..."
              showButton={false}
              buttonColorScheme="brand"
              maxWidth="2xl"
              variants={itemVariants}
            />

            {/* Results Section */}
            {/* Empty collection vs Populated collection*/}
            {!loading && collection.length === 0 ? (
              <ResultsDisplay
                loading={false}
                results={[]}
                hasSearched={true}
                onCollectionUpdate={refreshCollection}
                variants={itemVariants}
                emptyStateIcon="🎵"
                emptyStateTitle="Your collection is empty"
                emptyStateDescription="Start building your vinyl collection by searching for albums!"
                emptyStateAction={{
                  text: "Start Searching",
                  onClick: () => router.push("/"),
                }}
                showDeleteButton={true}
                showInCollectionBadge={false}
              />
            ) : (
              <ResultsDisplay
                loading={loading}
                results={filteredResults}
                searchQuery={searchValue.trim() ? searchValue : undefined}
                hasSearched={true}
                onCollectionUpdate={refreshCollection}
                onClearResults={searchValue.trim() ? clearSearch : undefined}
                variants={itemVariants}
                loadingText="Loading your collection..."
                showDeleteButton={true}
                showInCollectionBadge={false}
              />
            )}
          </MotionVStack>
        </Container>
      </MotionBox>
    </>
  );
}
