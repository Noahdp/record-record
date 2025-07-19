import { SimpleGrid } from "@chakra-ui/react";
import { AlbumCard } from "./AlbumCard";
import { Album } from "@/types/Album";
import { useState, useEffect, useCallback } from "react";
import { isInCollection } from "@/lib/db/collection";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { AlbumDetailCard } from "./AlbumDetailCard";
import { AlbumDetail } from "@/types/AlbumDetail";
import { Text } from "@chakra-ui/react";

interface AlbumGridProps {
  albums: Album[];
  onCollectionUpdate?: () => void;
  showDeleteButton?: boolean;
}

export const AlbumGrid = ({
  albums,
  onCollectionUpdate,
  showDeleteButton = false,
}: AlbumGridProps) => {
  const [collectionIds, setCollectionIds] = useState<Set<string>>(new Set());
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [albumDetail, setAlbumDetail] = useState<AlbumDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchCollectionStatus = useCallback(async () => {
    const statuses = await Promise.all(
      albums.map((album) => isInCollection(album.id))
    );
    const ids = new Set(
      albums
        .filter((_, index) => statuses[index])
        .map((album) => album.id.toString())
    );
    setCollectionIds(ids);
  }, [albums]);

  const handleCollectionUpdate = useCallback(() => {
    fetchCollectionStatus();
    onCollectionUpdate?.();
  }, [fetchCollectionStatus, onCollectionUpdate]);

  const handleShowDetails = async (albumId: number) => {
    setSelectedAlbumId(albumId);
    setAlbumDetail(null); // Clear previous album data
    setLoadingDetail(true);
    onOpen();
    try {
      // Fetch album details and reviews in parallel
      const [albumRes, reviewsRes] = await Promise.all([
        fetch(`/api/discogs/${albumId}`),
        fetch(`/api/discogs/${albumId}/reviews`),
      ]);

      const albumData = await albumRes.json();
      const reviewsData = await reviewsRes.json();

      // Combine album data with reviews
      const albumWithReviews = {
        ...albumData,
        reviews: reviewsData,
      };

      setAlbumDetail(albumWithReviews);
    } catch (error) {
      console.error("Error fetching album details:", error);
      setAlbumDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setAlbumDetail(null);
    setSelectedAlbumId(null);
  };

  useEffect(() => {
    fetchCollectionStatus();
  }, [fetchCollectionStatus]);

  return (
    <>
      <SimpleGrid
        spacing={6}
        templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        w="100%"
        minChildWidth="280px"
      >
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            inCollection={collectionIds.has(album.id.toString())}
            onCollectionUpdate={handleCollectionUpdate}
            showDeleteButton={showDeleteButton}
            onShowDetails={() => handleShowDetails(album.id)}
            isSelected={selectedAlbumId === album.id}
          />
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="1200px"
          h="85vh"
          mx={4}
          bg="white"
          display="flex"
          flexDirection="column"
        >
          <ModalCloseButton zIndex={10} top={4} right={4} size="md" />
          <ModalBody p={8} pt={12} overflowY="auto" flex="1">
            {loadingDetail ? (
              <Flex justify="center" align="center" py={8}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="green.500"
                  size="xl"
                />
              </Flex>
            ) : albumDetail ? (
              <AlbumDetailCard album={albumDetail} />
            ) : (
              <Text>Failed to load album details.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
