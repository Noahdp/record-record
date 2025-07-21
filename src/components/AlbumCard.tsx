import {
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  HStack,
  Text,
  ButtonGroup,
  Box,
  Badge,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaThList } from "react-icons/fa";
import { motion } from "framer-motion";
import { Album } from "@/types/Album";
import { addToCollection, removeFromCollection } from "@/lib/db/collection";
import { OptimizedImage } from "./OptimizedImage";
import { memo } from "react";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface AlbumCardProps {
  album: Album;
  inCollection: boolean;
  onCollectionUpdate?: () => void;
  showDeleteButton?: boolean;
  onShowDetails?: () => void;
  isSelected?: boolean;
  showInCollectionBadge?: boolean;
}

export const AlbumCard = memo(
  ({
    album,
    inCollection,
    onCollectionUpdate,
    showDeleteButton = false,
    onShowDetails,
    isSelected = false,
    showInCollectionBadge = true,
  }: AlbumCardProps) => {
    const handleAddToCollection = async () => {
      try {
        await addToCollection(album);
        onCollectionUpdate?.();
      } catch {
        // Silently handle collection errors - API will return proper error responses
      }
    };

    const handleRemoveFromCollection = async () => {
      try {
        await removeFromCollection(album.id);
        onCollectionUpdate?.();
      } catch {
        // Silently handle collection errors - API will return proper error responses
      }
    };

    return (
      <MotionCard
        variant="elevated"
        maxW="sm"
        overflow="hidden"
        cursor="pointer"
        role="article"
        aria-label={`Album: ${album.title} by ${album.artist}`}
        border={isSelected ? "2px solid" : "1px solid"}
        borderColor={isSelected ? "brand.500" : "gray.200"}
        boxShadow={isSelected ? "0 0 0 3px rgba(40, 125, 83, 0.1)" : "base"}
        bg="white"
        _dark={{
          bg: "gray.800",
          borderColor: isSelected ? "brand.400" : "gray.700",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -4,
          boxShadow: "xl",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <MotionBox position="relative" overflow="hidden">
          {album.coverImageURL && (
            <OptimizedImage
              src={album.coverImageURL}
              alt={`${album.title} album cover`}
              w="full"
              h="300px"
              objectFit="cover"
              fallbackSrc="/api/placeholder/300/300"
            />
          )}
          {inCollection && showInCollectionBadge && (
            <Badge
              position="absolute"
              top="3"
              right="3"
              colorScheme="brand"
              variant="solid"
              borderRadius="full"
              fontSize="xs"
              px="2"
              py="1"
            >
              In Collection
            </Badge>
          )}
        </MotionBox>

        <CardBody p="4">
          <Stack spacing="5">
            <Box>
              <Heading
                size="md"
                noOfLines={2}
                mb="2"
                fontWeight="semibold"
                color="gray.900"
                _dark={{ color: "white" }}
              >
                {album.title}
              </Heading>
              <HStack justify="space-between" align="center">
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  color="gray.700"
                  _dark={{ color: "gray.300" }}
                  noOfLines={1}
                >
                  {album.artist}
                </Text>
                {album.year && (
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="medium"
                    _dark={{ color: "gray.400" }}
                  >
                    {album.year}
                  </Text>
                )}
              </HStack>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <ButtonGroup variant="outline" spacing="3" size="sm">
                {!inCollection ? (
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="brand"
                    variant="solid"
                    onClick={handleAddToCollection}
                    aria-label={`Add ${album.title} to collection`}
                    _hover={{
                      transform: "translateY(-1px)",
                      boxShadow: "md",
                    }}
                  >
                    Add
                  </Button>
                ) : showDeleteButton ? (
                  <Button
                    leftIcon={<DeleteIcon />}
                    variant="outline"
                    colorScheme="red"
                    onClick={handleRemoveFromCollection}
                    aria-label={`Remove ${album.title} from collection`}
                    _hover={{
                      bg: "red.50",
                      borderColor: "red.300",
                      transform: "translateY(-1px)",
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
                <Button
                  leftIcon={
                    <Box color="green.600">
                      <FaThList />
                    </Box>
                  }
                  onClick={onShowDetails}
                  variant="outline"
                  colorScheme="gray"
                  aria-label={`View details for ${album.title}`}
                  _hover={{
                    bg: "gray.50",
                    borderColor: "gray.300",
                    transform: "translateY(-1px)",
                  }}
                >
                  Details
                </Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </CardBody>
      </MotionCard>
    );
  }
);

AlbumCard.displayName = "AlbumCard";
