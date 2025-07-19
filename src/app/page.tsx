"use client";

import {
  VStack,
  HStack,
  Button,
  Text,
  Heading,
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Album } from "@/types/Album";
import { AlbumGrid } from "@/components/AlbumGrid";

// Dynamically import Navigation with SSR disabled to avoid hydration issues
const Navigation = dynamic(
  () =>
    import("@/components/Navigation").then((mod) => ({
      default: mod.Navigation,
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
      <Navigation />

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
                <HStack spacing={2}>
                  <InputGroup size="lg" flex="1">
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search for albums, artists, or songs..."
                      bg="white"
                      shadow="sm"
                      border="2px"
                      borderColor="gray.200"
                      _focus={{ borderColor: "green.400", shadow: "md" }}
                    />
                  </InputGroup>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      colorScheme="green"
                      size="lg"
                      onClick={handleSearch}
                      isLoading={isSearching}
                      loadingText="Search"
                      px={6}
                    >
                      Search
                    </Button>
                  </MotionBox>
                </HStack>
              </MotionBox>
            </Box>
          </VStack>
        </MotionBox>

        {/* Search Results Section */}
        {hasSearched && (
          <Box py={16}>
            <Container maxW="container.xl">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VStack spacing={8} align="center">
                  <Heading size="lg" color="gray.800">
                    {isSearching ? (
                      <HStack>
                        <Spinner size="md" color="green.500" />
                        <Text>Searching...</Text>
                      </HStack>
                    ) : searchResults.length > 0 ? (
                      `Found ${searchResults.length} albums for ${lastSearchedQuery}`
                    ) : (
                      `No albums found for ${lastSearchedQuery}`
                    )}
                  </Heading>

                  {searchResults.length > 0 && !isSearching && (
                    <Box w="100%">
                      <AlbumGrid
                        albums={searchResults}
                        onCollectionUpdate={() => {
                          // Optionally refresh search results after adding/removing
                          console.log("Collection updated from search results");
                        }}
                        showDeleteButton={false}
                      />
                    </Box>
                  )}

                  {searchResults.length === 0 &&
                    !isSearching &&
                    hasSearched && (
                      <VStack spacing={4}>
                        <Text color="gray.600" fontSize="lg">
                          Try searching with different keywords or check your
                          spelling.
                        </Text>
                        <Button
                          variant="outline"
                          colorScheme="green"
                          onClick={() => {
                            setSearchQuery("");
                            setSearchResults([]);
                            setHasSearched(false);
                            setLastSearchedQuery("");
                          }}
                        >
                          Clear Search
                        </Button>
                      </VStack>
                    )}
                </VStack>
              </MotionBox>
            </Container>
          </Box>
        )}
      </Container>
    </>
  );
}
