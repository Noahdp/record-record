"use client";

import { CollectionStats } from "@/components/CollectionStats";
import { SearchInput } from "@/components/SearchInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import dynamic from "next/dynamic";
import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Album } from "@/types/Album";
import { getCollection } from "@/lib/db/collection";

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
  const [collection, setCollection] = useState<Album[]>([]);
  const [filteredResults, setFilteredResults] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  // Color mode values
  const bgGradient = useColorModeValue(
    "linear(to-br, white, gray.50, green.50)",
    "linear(to-br, gray.900, gray.800, green.900)"
  );
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // Load collection function
  const loadCollection = useCallback(async () => {
    try {
      const albums = await getCollection();
      setCollection(albums);
      setFilteredResults(albums);
    } catch (error) {
      console.error("Failed to load collection:", error);
      setCollection([]);
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load collection on page initialization
  useEffect(() => {
    loadCollection();
  }, [loadCollection]);

  // Filter collection by artist and title
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);

      if (value.trim().length === 0) {
        setFilteredResults(collection);
      } else {
        const filtered = collection.filter((album) => {
          const searchTerm = value.toLowerCase();
          return (
            album.artist.toLowerCase().includes(searchTerm) ||
            album.title.toLowerCase().includes(searchTerm)
          );
        });
        setFilteredResults(filtered);
      }
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
                onCollectionUpdate={loadCollection}
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
                onCollectionUpdate={loadCollection}
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
