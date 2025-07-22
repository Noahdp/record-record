import { useColorModeValue } from "@chakra-ui/react";

export const useAppColors = () => {
  // Page backgrounds
  const bgGradient = useColorModeValue(
    "linear(to-br, white, gray.50, green.50)",
    "linear(to-br, gray.900, gray.800, green.900)"
  );

  // Text colors
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // Component backgrounds
  const cardBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("white", "gray.700");

  // Border colors
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBorderColor = useColorModeValue("gray.200", "gray.600");
  const inputHoverBorderColor = useColorModeValue("gray.300", "gray.500");

  // Navigation
  const navBg = useColorModeValue("white", "gray.800");
  const navBorderColor = useColorModeValue("gray.100", "gray.700");

  return {
    // Page colors
    bgGradient,
    headingColor,
    textColor,

    // Component colors
    cardBg,
    inputBg,

    // Border colors
    borderColor,
    inputBorderColor,
    inputHoverBorderColor,

    // Navigation colors
    navBg,
    navBorderColor,
  };
};
