import {
  Box,
  Text,
  List,
  ListItem,
  HStack,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { ArtistCredit } from "@/types/ArtistCredit";
import { useToggle } from "@/hooks/useToggle";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface CreditsProps {
  credits?: ArtistCredit[];
}

export const Credits = ({ credits }: CreditsProps) => {
  const { isOpen: showCredits, toggle: toggleCredits } = useToggle();

  if (!credits || credits.length === 0) return null;

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
    <Box w="full">
      <HStack mb={3}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.800"
          _dark={{ color: "gray.200" }}
        >
          Credits
        </Text>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="blue"
          onClick={toggleCredits}
          rightIcon={showCredits ? <IoChevronUp /> : <IoChevronDown />}
        >
          {showCredits ? "Hide" : "Show"} ({credits.length})
        </Button>
      </HStack>
      <Collapse in={showCredits} animateOpacity>
        <Box
          bg="white"
          rounded="lg"
          p={4}
          shadow="md"
          border="1px solid"
          borderColor="gray.200"
          maxH="150px"
          overflowY="auto"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <List spacing={1}>{credits.map(renderCredit)}</List>
        </Box>
      </Collapse>
    </Box>
  );
};
