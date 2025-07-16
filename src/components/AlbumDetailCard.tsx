import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  HStack,
  Text,
  Tag,
  VStack,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import { AlbumDetail } from "@/types/AlbumDetail";
import { Track } from "@/types/Track";
import { ArtistCredit } from "@/types/ArtistCredit";

interface AlbumDetailCardProps {
  album: AlbumDetail;
}

export const AlbumDetailCard = ({ album }: AlbumDetailCardProps) => {
  const renderTagList = (label: string, items: string[]) => (
    <HStack>
      <Text fontWeight="semibold">{label}:</Text>
      {items.map((item, index) => (
        <Tag key={`${label.toLowerCase()}-${index}`}>{item}</Tag>
      ))}
    </HStack>
  );

  const renderTrack = (track: Track, idx: number) => (
    <ListItem key={track.position || idx}>
      {track.position && (
        <Text as="span" fontWeight="bold">
          {track.position}.{" "}
        </Text>
      )}
      <Text as="span">{track.title}</Text>
      {track.duration && (
        <Text as="span" color="gray.500" ml={2} fontSize="sm">
          {track.duration}
        </Text>
      )}
    </ListItem>
  );

  const renderCredit = (credit: ArtistCredit, idx: number) => (
    <ListItem key={idx}>
      <Text as="span" fontWeight="bold">
        {credit.name}
      </Text>
      {credit.role && (
        <Text as="span" color="gray.500" ml={2} fontSize="sm">
          {credit.role}
        </Text>
      )}
    </ListItem>
  );

  return (
    <Card maxW="lg" overflow="hidden">
      {album.coverImageURL && (
        <Image src={album.coverImageURL} alt={`${album.title} album cover`} />
      )}

      <CardBody>
        <Stack spacing={4}>
          {/* Header */}
          <Heading size="lg">{album.title}</Heading>
          <HStack>
            <Text fontSize="xl" fontWeight="bold">
              {album.artist}
            </Text>
            {album.year && (
              <Text fontSize="md" color="gray.500" opacity={0.8}>
                {album.year}
              </Text>
            )}
          </HStack>

          {/* Metadata */}
          {album.format &&
            album.format.length > 0 &&
            renderTagList("Format", album.format)}
          {album.genres &&
            album.genres.length > 0 &&
            renderTagList("Genres", album.genres)}
          {album.styles &&
            album.styles.length > 0 &&
            renderTagList("Styles", album.styles)}

          {/* Description */}
          {album.description && (
            <Box>
              <Text fontWeight="semibold">Description:</Text>
              <Text>{album.description}</Text>
            </Box>
          )}

          <Divider />

          {/* Tracklist */}
          <VStack align="start" spacing={2}>
            <Text fontWeight="semibold">Tracklist:</Text>
            <List spacing={1}>{album.tracklist.map(renderTrack)}</List>
          </VStack>

          {/* Credits */}
          {album.credits && album.credits.length > 0 && (
            <VStack align="start" spacing={2}>
              <Text fontWeight="semibold">Credits:</Text>
              <List spacing={1}>{album.credits.map(renderCredit)}</List>
            </VStack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
