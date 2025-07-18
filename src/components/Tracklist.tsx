import { Box, Text, List, ListItem, Tooltip } from "@chakra-ui/react";
import { Track } from "@/types/Track";

interface TracklistProps {
  tracks?: Track[];
}

export const Tracklist = ({ tracks }: TracklistProps) => {
  if (!tracks || tracks.length === 0) return null;

  const renderTrack = (track: Track, idx: number) => {
    const trackCreditsText =
      track.artists && track.artists.length > 0
        ? `Credits: ${track.artists
            .map(
              (artist) =>
                `${artist.name}${artist.role ? ` (${artist.role})` : ""}`
            )
            .join(", ")}`
        : "";

    return (
      <ListItem key={`track-${idx}`}>
        {track.position && (
          <Text as="span" fontWeight="bold">
            {track.position}.{" "}
          </Text>
        )}
        <Tooltip
          label={trackCreditsText}
          hasArrow
          isDisabled={!trackCreditsText}
        >
          <Text
            as="span"
            cursor={trackCreditsText ? "pointer" : "default"}
            display="inline"
          >
            {track.title}
          </Text>
        </Tooltip>
        {track.duration && (
          <Text as="span" color="gray.500" ml={2} fontSize="sm">
            {track.duration}
          </Text>
        )}
      </ListItem>
    );
  };

  return (
    <Box w="full">
      <Text
        fontSize="lg"
        fontWeight="semibold"
        mb={3}
        color="gray.800"
        _dark={{ color: "gray.200" }}
      >
        Tracklist
      </Text>
      <Box
        maxH="300px"
        overflowY="auto"
        bg="white"
        rounded="lg"
        p={4}
        shadow="md"
        border="1px solid"
        borderColor="gray.200"
        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
      >
        <List spacing={2}>{tracks.map(renderTrack)}</List>
      </Box>
    </Box>
  );
};
