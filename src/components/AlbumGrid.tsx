import { SimpleGrid } from "@chakra-ui/react";
import { AlbumCard } from "./AlbumCard";
import { Album } from "@/types/Album";
import { useAlbumDetails } from "@/hooks/useAlbumDetails";
import { useCollectionStatus } from "@/hooks/useCollectionStatus";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { AlbumDetailCard } from "./AlbumDetailCard";
import { VinylSpinner } from "./VinylSpinner";
import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { modalEntrance } from "@/utils/animationUtils";

const MotionModalContent = motion(ModalContent);

interface AlbumGridProps {
  albums: Album[];
  onCollectionUpdate?: () => void;
  showDeleteButton?: boolean;
  showInCollectionBadge?: boolean;
}

export const AlbumGrid = ({
  albums,
  onCollectionUpdate,
  showDeleteButton = false,
  showInCollectionBadge = true,
}: AlbumGridProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Use album details hook
  const {
    selectedAlbumId,
    albumDetail,
    loadingDetail,
    fetchAlbumDetails,
    clearAlbumDetails,
  } = useAlbumDetails();

  // Use collection status hook
  const { collectionIds, refreshCollectionStatus } =
    useCollectionStatus(albums);

  // Modal entrance animation variants
  const modalVariants = modalEntrance(0);

  const handleCollectionUpdate = () => {
    refreshCollectionStatus();
    onCollectionUpdate?.();
  };

  const handleShowDetails = async (albumId: number) => {
    onOpen();
    await fetchAlbumDetails(albumId);
  };

  const handleCloseModal = () => {
    onClose();
    clearAlbumDetails();
  };

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
            showInCollectionBadge={showInCollectionBadge}
          />
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <MotionModalContent
          maxW="1200px"
          h="85vh"
          mx={4}
          bgGradient="linear(135deg, green.50, gray.50, white)"
          _dark={{
            bgGradient: "linear(135deg, green.900, gray.800, gray.900)",
          }}
          display="flex"
          flexDirection="column"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ModalCloseButton zIndex={10} top={4} right={4} size="md" />
          <ModalBody p={8} pt={12} overflowY="auto" flex="1">
            {loadingDetail ? (
              <Flex justify="center" align="center" py={8}>
                <VinylSpinner
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
        </MotionModalContent>
      </Modal>
    </>
  );
};
