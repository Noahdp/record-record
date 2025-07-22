"use client";

import { Box, Skeleton, VStack, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { loadingPulse } from "@/utils/animationUtils";

const MotionBox = motion(Box);

interface LoadingSkeletonProps {
  variant?: "card" | "list" | "grid";
  count?: number;
}

export const LoadingSkeleton = ({
  variant = "card",
  count = 3,
}: LoadingSkeletonProps) => {
  const pulseVariants = loadingPulse(1.5);

  const renderCardSkeleton = () => (
    <MotionBox
      variants={pulseVariants}
      animate="pulse"
      bg="gray.100"
      _dark={{ bg: "gray.700" }}
      borderRadius="xl"
      p={4}
      w="full"
      maxW="sm"
    >
      <VStack spacing={4}>
        <Skeleton height="200px" borderRadius="md" w="full" />
        <VStack spacing={2} w="full">
          <Skeleton height="20px" w="80%" />
          <Skeleton height="16px" w="60%" />
        </VStack>
      </VStack>
    </MotionBox>
  );

  const renderListSkeleton = () => (
    <MotionBox
      variants={pulseVariants}
      animate="pulse"
      bg="gray.100"
      _dark={{ bg: "gray.700" }}
      borderRadius="lg"
      p={4}
      w="full"
    >
      <HStack spacing={4}>
        <Skeleton height="60px" width="60px" borderRadius="md" />
        <VStack spacing={2} align="start" flex={1}>
          <Skeleton height="18px" w="70%" />
          <Skeleton height="14px" w="50%" />
        </VStack>
      </HStack>
    </MotionBox>
  );

  const renderGridSkeleton = () => (
    <MotionBox
      variants={pulseVariants}
      animate="pulse"
      bg="gray.100"
      _dark={{ bg: "gray.700" }}
      borderRadius="lg"
      p={6}
      w="full"
    >
      <VStack spacing={3}>
        <Skeleton height="24px" w="60%" />
        <Skeleton height="16px" w="40%" />
        <Skeleton height="12px" w="80%" />
      </VStack>
    </MotionBox>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case "list":
        return renderListSkeleton();
      case "grid":
        return renderGridSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <VStack spacing={4} w="full">
      {Array.from({ length: count }, (_, index) => (
        <Box key={index} w="full">
          {renderSkeleton()}
        </Box>
      ))}
    </VStack>
  );
};
