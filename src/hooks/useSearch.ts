import { useState } from "react";
import { Album } from "@/types/Album";

interface UseSearchReturn {
  searchQuery: string;
  searchResults: Album[];
  isSearching: boolean;
  hasSearched: boolean;
  lastSearchedQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  clearResults: () => void;
}

export function useSearch(): UseSearchReturn {
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

  const clearResults = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setLastSearchedQuery("");
  };

  return {
    searchQuery,
    searchResults,
    isSearching,
    hasSearched,
    lastSearchedQuery,
    setSearchQuery,
    handleSearch,
    handleKeyPress,
    clearResults,
  };
}
