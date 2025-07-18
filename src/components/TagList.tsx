import { VStack, Text, HStack, Tag } from "@chakra-ui/react";

interface TagListProps {
  label: string;
  items: string[];
}

export const TagList = ({ label, items }: TagListProps) => {
  if (!items || items.length === 0) return null;

  return (
    <VStack align="start" spacing={2} w="full">
      <Text
        fontSize="sm"
        fontWeight="semibold"
        color="gray.600"
        _dark={{ color: "gray.400" }}
      >
        {label}
      </Text>
      <HStack wrap="wrap" spacing={2}>
        {items.map((item, index) => (
          <Tag
            key={`${label.toLowerCase()}-${index}`}
            size="md"
            colorScheme="blue"
            variant="subtle"
            rounded="full"
          >
            {item}
          </Tag>
        ))}
      </HStack>
    </VStack>
  );
};
