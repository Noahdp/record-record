"use client";

import { VStack, Text, Heading, Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Album } from "@/types/Album";
import { SearchInput } from "@/components/SearchInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";

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

const MotionBox = motion.div;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");

  // Gets search results from discogs API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setLastSearchedQuery(searchQuery);

    try {
      const response = await fetch(
        `/api/discogs/search?q=${encodeURIComponent(searchQuery)}`
      );

      if (response.ok) {
        const albums = await response.json();
        setSearchResults(albums);
      } else {
        console.error("Search failed");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <NavBar />

      <Container maxW="container.xl" p={0}>
        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VStack spacing={8} align="center" justify="center" minH="60vh" p={8}>
            <Heading as="h1" size="2xl" textAlign="center" color="gray.800">
              Welcome to Record Record
            </Heading>

            <Text
              fontSize="xl"
              color="gray.600"
              textAlign="center"
              maxW="600px"
            >
              Your digital vinyl collection manager. Discover, track, and
              organize your music collection with ease.
            </Text>

            {/* Search Bar */}
            <Box w="100%" maxW="500px">
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <SearchInput
                  searchValue={searchQuery}
                  onSearchChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for albums, artists, or songs..."
                  showButton={true}
                  buttonText="Search"
                  buttonColorScheme="green"
                  onButtonClick={handleSearch}
                  isLoading={isSearching}
                  loadingText="Search"
                  maxWidth="500px"
                />
              </MotionBox>
            </Box>
          </VStack>
        </MotionBox>

        {/* Search Results Section */}
        {hasSearched && (
          <Box py={16}>
            <Container maxW="container.xl">
              <ResultsDisplay
                loading={isSearching}
                results={searchResults}
                searchQuery={lastSearchedQuery}
                hasSearched={hasSearched}
                onCollectionUpdate={() => {
                  console.log("Collection updated from search results");
                }}
                onClearResults={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setHasSearched(false);
                  setLastSearchedQuery("");
                }}
                showDeleteButton={false}
                showInCollectionBadge={true}
                loadingText="Searching..."
                emptyStateDescription="Try searching with different keywords or check your spelling."
              />
            </Container>
          </Box>
        )}
      </Container>
    </>
  );
}
