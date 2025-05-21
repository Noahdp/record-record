import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
} from "@chakra-ui/react";
import { Album } from "@/types/Album";
import { addToCollection } from "@/lib/db/collection";

interface AlbumCardProps {
  album: Album;
  inCollection: boolean;
  onCollectionUpdate?: () => void;
}

export const AlbumCard = ({
  album,
  inCollection,
  onCollectionUpdate,
}: AlbumCardProps) => {
  const handleAddToCollection = async () => {
    try {
      await addToCollection(album);
      onCollectionUpdate?.();
    } catch (error) {
      console.error("Failed adding to Collection", error);
    }
  };

  return (
    <Card maxW="sm" overflow="hidden">
      <Image src={album.coverImageURL} alt={`${album.title} album cover`} />
      <CardBody gap="2">
        <Text as="h3" fontWeight="bold" fontSize="lg">
          {album.title}
        </Text>
        <Text mt="2">{album.artist}</Text>
        {album.year !== null && (
          <Text mt="2" color="gray.500" opacity=".8">
            {album.year}
          </Text>
        )}
      </CardBody>
      <CardFooter gap="2">
        {!inCollection && (
          <Button variant="solid" onClick={handleAddToCollection}>
            Add
          </Button>
        )}
        <Button variant="ghost">Details</Button>
      </CardFooter>
    </Card>
  );
};
