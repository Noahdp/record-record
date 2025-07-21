"use client";

import React from "react";
import { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Album } from "@/types/Album";
import { ResultsDisplay } from "@/components/ResultsDisplay";

interface CollectionResultsProps {
  loading: boolean;
  filteredResults: Album[];
  collection: Album[];
  searchValue: string;
  onCollectionUpdate: () => void;
  onClearSearch: () => void;
  variants?: Variants;
}

export const CollectionResults = React.memo(
  ({
    loading,
    filteredResults,
    collection,
    searchValue,
    onCollectionUpdate,
    onClearSearch,
    variants,
  }: CollectionResultsProps) => {
    const router = useRouter();

    // If no collection exists, show empty collection state
    if (!loading && collection.length === 0) {
      return (
        <ResultsDisplay
          loading={false}
          results={[]}
          hasSearched={true}
          onCollectionUpdate={onCollectionUpdate}
          variants={variants}
          emptyStateIcon="🎵"
          emptyStateTitle="Your collection is empty"
          emptyStateDescription="Start building your vinyl collection by searching for albums!"
          emptyStateAction={{
            text: "🏠 Start Searching",
            onClick: () => router.push("/"),
          }}
          showDeleteButton={true}
          showInCollectionBadge={false}
        />
      );
    }

    // Show filtered results or loading/no results states
    return (
      <ResultsDisplay
        loading={loading}
        results={filteredResults}
        searchQuery={searchValue.trim() ? searchValue : undefined}
        hasSearched={true}
        onCollectionUpdate={onCollectionUpdate}
        onClearResults={searchValue.trim() ? onClearSearch : undefined}
        variants={variants}
        loadingText="Loading your collection..."
        noResultsText={
          searchValue.trim()
            ? `No albums found matching "${searchValue}"`
            : undefined
        }
        showDeleteButton={true}
        showInCollectionBadge={false}
      />
    );
  }
);

CollectionResults.displayName = "CollectionResults";
