"use client";

import { AlbumGrid } from "@/components/AlbumGrid";
import dynamic from "next/dynamic";
import {
  Box,
  Heading,
  Button,
  Text,
  Input,
  Spinner,
  Container,
  VStack,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Album } from "@/types/Album";
import { getCollection } from "@/lib/db/collection";

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
  const inputBg = useColorModeValue("white", "gray.700");
  const inputBorderColor = useColorModeValue("gray.200", "gray.600");
  const inputHoverBorderColor = useColorModeValue("gray.300", "gray.500");
  const statBg = useColorModeValue("white", "gray.800");
  const statBorderColor = useColorModeValue("gray.200", "gray.700");

  // Load collection function
  const loadCollection = async () => {
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
  };

  // Load collection on page initialization
  useEffect(() => {
    loadCollection();
  }, []);

  // Filter collection by artist and title
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  // Collection statistics
  const stats = useMemo(() => {
    const uniqueArtists = new Set(collection.map((album) => album.artist)).size;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <Navigation />

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
            {!loading && collection.length > 0 && (
              <MotionBox variants={itemVariants}>
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
                        🎵 {stats.totalAlbums}
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
                        🎤 {stats.uniqueArtists}
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
                        📅 {stats.decades}
                      </StatNumber>
                      <StatLabel color={textColor}>
                        Decades Represented
                      </StatLabel>
                    </Stat>
                  </Box>
                </SimpleGrid>
              </MotionBox>
            )}

            {/* Controls Section */}
            <MotionBox variants={itemVariants}>
              <Box w="full" maxW="2xl" mx="auto">
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder="Filter by artist or album title..."
                    bg={inputBg}
                    border="2px solid"
                    borderColor={inputBorderColor}
                    _hover={{
                      borderColor: inputHoverBorderColor,
                    }}
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                    }}
                    borderRadius="xl"
                    fontSize="md"
                    pl="3rem"
                  />
                </InputGroup>
              </Box>
            </MotionBox>

            {/* Loading State */}
            {loading && (
              <MotionBox variants={itemVariants} textAlign="center" py={10}>
                <VStack spacing={4}>
                  <Spinner color="brand.500" size="xl" thickness="3px" />
                  <Text color={textColor} fontSize="lg">
                    Loading your collection...
                  </Text>
                </VStack>
              </MotionBox>
            )}

            {/* Results Section */}
            {!loading && filteredResults.length > 0 && (
              <MotionBox
                variants={itemVariants}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VStack spacing={6} align="stretch">
                  <Heading size="lg" textAlign="center" color={headingColor}>
                    {searchValue.trim()
                      ? `Found ${filteredResults.length} album${
                          filteredResults.length !== 1 ? "s" : ""
                        }`
                      : `Your Collection (${filteredResults.length} album${
                          filteredResults.length !== 1 ? "s" : ""
                        })`}
                  </Heading>
                  <AlbumGrid
                    albums={filteredResults}
                    onCollectionUpdate={loadCollection}
                    showDeleteButton={true}
                    showInCollectionBadge={false}
                  />
                </VStack>
              </MotionBox>
            )}

            {/* No Results */}
            {!loading &&
              filteredResults.length === 0 &&
              searchValue.trim().length > 0 && (
                <MotionBox variants={itemVariants} textAlign="center" py={10}>
                  <VStack spacing={4}>
                    <Text fontSize="xl" color={textColor}>
                      No albums found matching &ldquo;{searchValue}&rdquo;
                    </Text>
                    <Button
                      onClick={() => setSearchValue("")}
                      variant="outline"
                      colorScheme="brand"
                    >
                      Clear Search
                    </Button>
                  </VStack>
                </MotionBox>
              )}

            {/* Empty Collection */}
            {!loading && collection.length === 0 && (
              <MotionBox variants={itemVariants} textAlign="center" py={20}>
                <VStack spacing={6}>
                  <Box color="gray.400" fontSize="6xl">
                    🎵
                  </Box>
                  <VStack spacing={2}>
                    <Heading size="lg" color={headingColor}>
                      Your collection is empty
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                      Start building your vinyl collection by searching for
                      albums!
                    </Text>
                  </VStack>
                  <Button
                    colorScheme="brand"
                    size="lg"
                    onClick={() => router.push("/")}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    🏠 Start Searching
                  </Button>
                </VStack>
              </MotionBox>
            )}
          </MotionVStack>
        </Container>
      </MotionBox>
    </>
  );
}
