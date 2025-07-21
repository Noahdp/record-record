"use client";

import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion, Variants } from "framer-motion";

const MotionBox = motion(Box);

interface SearchInputProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonColorScheme?: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  maxWidth?: string;
  variants?: Variants;
  size?: "sm" | "md" | "lg";
}

export const SearchInput = React.memo(
  ({
    searchValue,
    onSearchChange,
    onKeyPress,
    placeholder = "Search...",
    showButton = false,
    buttonText = "Search",
    buttonColorScheme = "brand",
    onButtonClick,
    isLoading = false,
    loadingText = "Searching",
    maxWidth = "2xl",
    variants,
    size = "lg",
  }: SearchInputProps) => {
    // Color mode values
    const inputBg = useColorModeValue("white", "gray.700");
    const inputBorderColor = useColorModeValue("gray.200", "gray.600");
    const inputHoverBorderColor = useColorModeValue("gray.300", "gray.500");

    const content = showButton ? (
      <HStack spacing={2} w="full">
        <InputGroup size={size} flex="1">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            value={searchValue}
            onChange={onSearchChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            bg={inputBg}
            border="2px solid"
            borderColor={inputBorderColor}
            _hover={{
              borderColor: inputHoverBorderColor,
            }}
            _focus={{
              borderColor: `${buttonColorScheme}.500`,
              boxShadow: `0 0 0 1px var(--chakra-colors-${buttonColorScheme}-500)`,
            }}
            borderRadius="xl"
            fontSize="md"
            pl="3rem"
          />
        </InputGroup>
        <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            colorScheme={buttonColorScheme}
            size={size}
            onClick={onButtonClick}
            isLoading={isLoading}
            loadingText={loadingText}
            px={6}
          >
            {buttonText}
          </Button>
        </MotionBox>
      </HStack>
    ) : (
      <Box w="full" maxW={maxWidth} mx="auto">
        <InputGroup size={size}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            value={searchValue}
            onChange={onSearchChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            bg={inputBg}
            border="2px solid"
            borderColor={inputBorderColor}
            _hover={{
              borderColor: inputHoverBorderColor,
            }}
            _focus={{
              borderColor: `${buttonColorScheme}.500`,
              boxShadow: `0 0 0 1px var(--chakra-colors-${buttonColorScheme}-500)`,
            }}
            borderRadius="xl"
            fontSize="md"
            pl="3rem"
          />
        </InputGroup>
      </Box>
    );

    if (variants) {
      return <MotionBox variants={variants}>{content}</MotionBox>;
    }

    return <>{content}</>;
  }
);

SearchInput.displayName = "SearchInput";
