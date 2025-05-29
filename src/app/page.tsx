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
import { useState } from "react";
import { Album } from "@/types/Album";

export default function Home() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim().length >= 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/discogs/search?q=${encodeURIComponent(value)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      }
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  return (
    <Box minH="100vh" p={[8, 20]} pb={20}>
      <Flex direction="column" gap={4} align={["center", "flex-start"]}>
        <Heading as="h1" size="lg">
          Welcome to Record Record
        </Heading>
        <Text>Your digital vinyl collection manager</Text>
        <Flex direction={["column", "row"]} gap={4} width="100%">
          <Button
            colorScheme="green"
            size={["md", "lg"]}
            onClick={() => router.push("/collection")}
          >
            View Collection
          </Button>
          <Input
            value={searchValue}
            onChange={handleSearch}
            placeholder="Start typing to search for a record"
            size="lg"
            width={["100%", "60%"]}
          />
        </Flex>

        {loading && <Spinner color="green" mt={4} />}

        {results.length > 0 && (
          <Box mt={6} width="100%">
            <AlbumGrid albums={results} />
          </Box>
        )}
      </Flex>
    </Box>
  );
}
