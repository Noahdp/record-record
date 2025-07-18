import { Box, Text } from "@chakra-ui/react";

interface AlbumDescriptionProps {
  description?: string;
}

export const AlbumDescription = ({ description }: AlbumDescriptionProps) => {
  if (!description) return null;

  return (
    <Box w="full">
      <Text
        fontSize="lg"
        fontWeight="semibold"
        mb={3}
        color="gray.800"
        _dark={{ color: "gray.200" }}
      >
        Description
      </Text>
      <Text
        fontSize="md"
        lineHeight="tall"
        color="gray.600"
        _dark={{ color: "gray.400" }}
      >
        {description}
      </Text>
    </Box>
  );
};
