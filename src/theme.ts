import { extendTheme } from "@chakra-ui/react";

// Phthalo green color palette
const phthaloGreen = {
  50: "#e8f5ec",
  100: "#d0ead8",
  200: "#a1d5b1",
  300: "#72c08a",
  400: "#43ab63",
  500: "#287d53",
  600: "#206946",
  700: "#185539",
  800: "#10412c",
  900: "#082d1f",
};

const theme = extendTheme({
  colors: {
    phthalo: phthaloGreen,
    green: phthaloGreen,
    blue: phthaloGreen,
  },
});

export default theme;
