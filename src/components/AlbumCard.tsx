import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  HStack,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { Album } from "@/types/Album";
import { addToCollection, removeFromCollection } from "@/lib/db/collection";
import { IoMdAdd } from "react-icons/io";
import { TfiViewListAlt } from "react-icons/tfi";

interface AlbumCardProps {
  album: Album;
  inCollection: boolean;
  onCollectionUpdate?: () => void;
  showDeleteButton?: boolean;
  onShowDetails?: () => void;
  isSelected?: boolean;
}

export const AlbumCard = ({
  album,
  inCollection,
  onCollectionUpdate,
  showDeleteButton = false,
  onShowDetails,
  isSelected = false,
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
    <Card
      maxW="sm"
      overflow="hidden"
      border={isSelected ? "2px solid #3182ce" : undefined}
      boxShadow={isSelected ? "0 0 0 2px #3182ce" : undefined}
    >
      <Image src={album.coverImageURL} alt={`${album.title} album cover`} />
      <CardBody gap="2">
        <Stack spacing="2">
          <Heading size="md">{album.title}</Heading>
          <HStack>
            <Text fontSize="large">{album.artist}</Text>
            {album.year && (
              <Text fontSize="small" color="gray.500" opacity=".8">
                {album.year}
              </Text>
            )}
          </HStack>
          <ButtonGroup variant="outline" spacing="2">
            {!inCollection ? (
              <Button
                leftIcon={<IoMdAdd />}
                colorScheme="green"
                onClick={handleAddToCollection}
              >
                Add
              </Button>
            ) : showDeleteButton ? (
              <Button
                variant="outline"
                colorScheme="red"
                onClick={handleRemoveFromCollection}
              >
                Delete
              </Button>
            ) : null}
            <Button leftIcon={<TfiViewListAlt />} onClick={onShowDetails}>Details</Button>
          </ButtonGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};
