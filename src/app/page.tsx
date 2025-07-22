"use client";

import { VStack, Text, Heading, Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SearchInput } from "@/components/SearchInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useSearch } from "@/hooks/useSearch";
import { useAppColors } from "@/hooks/useAppColors";
import {
  pageTransition,
  fadeInScale,
  staggerChildren,
} from "@/utils/animationUtils";

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
  const {
    searchQuery,
    searchResults,
    isSearching,
    hasSearched,
    lastSearchedQuery,
    setSearchQuery,
    handleSearch,
    handleKeyPress,
    clearResults,
  } = useSearch();

  // Use centralized color values
  const { headingColor, textColor, bgGradient } = useAppColors();

  // Animation variants
  const containerVariants = staggerChildren(0.1, 0.8);
  const searchBoxVariants = fadeInScale(0.4, 0.4);
  const pageVariants = pageTransition("vertical");

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.6 }}
    >
      <NavBar />

      <Box minH="100vh" bgGradient={bgGradient}>
        <Container maxW="container.xl" py={[8, 16]}>
          {/* Hero Section */}
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <VStack
              spacing={8}
              align="center"
              justify="center"
              minH="60vh"
              p={8}
            >
              <motion.div variants={containerVariants}>
                <Heading
                  as="h1"
                  size="2xl"
                  textAlign="center"
                  color={headingColor}
                >
                  Welcome to Record Record
                </Heading>
              </motion.div>

              <motion.div variants={containerVariants}>
                <Text
                  fontSize="xl"
                  color={textColor}
                  textAlign="center"
                  maxW="600px"
                >
                  Your digital vinyl collection manager. Discover, track, and
                  organize your music collection with ease.
                </Text>
              </motion.div>

              {/* Search Bar */}
              <Box w="100%" maxW="500px">
                <MotionBox
                  variants={searchBoxVariants}
                  initial="hidden"
                  animate="visible"
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
                  onClearResults={clearResults}
                  showDeleteButton={false}
                  showInCollectionBadge={true}
                  loadingText="Searching..."
                  emptyStateDescription="Try searching with different keywords or check your spelling."
                />
              </Container>
            </Box>
          )}
        </Container>
      </Box>
    </motion.div>
  );
}
