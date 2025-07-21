"use client";

import React from "react";
import { Variants } from "framer-motion";
import { SearchInput } from "@/components/SearchInput";

interface CollectionSearchProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variants?: Variants;
}

export const CollectionSearch = React.memo(
  ({ searchValue, onSearchChange, variants }: CollectionSearchProps) => {
    return (
      <SearchInput
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        placeholder="Filter by artist or album title..."
        showButton={false}
        buttonColorScheme="brand"
        maxWidth="2xl"
        variants={variants}
      />
    );
  }
);

CollectionSearch.displayName = "CollectionSearch";
