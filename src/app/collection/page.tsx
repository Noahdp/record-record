"use client";

import { AlbumGrid } from "@/components/AlbumGrid";
import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Album } from "@/types/Album";
import { getCollection } from "@/lib/db/collection";

export default function Home() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [collection, setCollection] = useState<Album[]>([]);
  const [filteredResults, setFilteredResults] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Box minH="100vh" p={[8, 20]} pb={20}>
      <Flex direction="column" gap={4} align={["center", "flex-start"]}>
        <Heading as="h1" size="lg">
          My Collection
        </Heading>
        <Text>Browse and search your record collection</Text>
        <Flex direction={["column", "row"]} gap={4} width="100%">
          <Button
            colorScheme="blue"
            size={["md", "lg"]}
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
          <Input
            value={searchValue}
            onChange={handleSearch}
            placeholder="Filter by artist or album title"
            size="lg"
            width={["100%", "60%"]}
          />
        </Flex>

        {loading && <Spinner color="green" mt={4} />}

        {filteredResults.length > 0 && !loading && (
          <Box mt={6} width="100%">
            <AlbumGrid
              albums={filteredResults}
              onCollectionUpdate={loadCollection}
              showDeleteButton={true}
            />
          </Box>
        )}

        {filteredResults.length === 0 &&
          !loading &&
          searchValue.trim().length > 0 && (
            <Text mt={6} color="gray.500">
              No albums found matching &ldquo;{searchValue}&rdquo;
            </Text>
          )}

        {collection.length === 0 && !loading && (
          <Text mt={6} color="gray.500">
            Your collection is empty. Add some albums to get started!
          </Text>
        )}
      </Flex>
    </Box>
  );
}
