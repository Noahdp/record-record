import { extendTheme } from "@chakra-ui/react";

// Modern color palette with phthalo green as primary
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

// Modern neutral grays for better contrast
const modernGray = {
  50: "#f7fafc",
  100: "#edf2f7",
  200: "#e2e8f0",
  300: "#cbd5e0",
  400: "#a0aec0",
  500: "#718096",
  600: "#4a5568",
  700: "#2d3748",
  800: "#1a202c",
  900: "#171923",
};

const theme = extendTheme({
  colors: {
    phthalo: phthaloGreen,
    green: phthaloGreen,
    blue: phthaloGreen,
    gray: modernGray,
    brand: phthaloGreen,
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  shadows: {
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    base: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  radii: {
    none: "0",
    sm: "0.375rem",
    base: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    full: "9999px",
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          borderRadius: "xl",
          boxShadow: "sm",
          border: "1px solid",
          borderColor: "gray.200",
          _dark: {
            borderColor: "gray.700",
            bg: "gray.800",
          },
        },
      },
      variants: {
        elevated: {
          container: {
            boxShadow: "lg",
            _hover: {
              boxShadow: "xl",
              transform: "translateY(-2px)",
              transition: "all 0.2s ease-in-out",
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "lg",
        _focus: {
          boxShadow: "0 0 0 3px rgba(40, 125, 83, 0.1)",
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-1px)",
            boxShadow: "md",
          },
          _active: {
            bg: "brand.700",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        _dark: {
          bg: "gray.900",
        },
      },
    },
  },
});

export default theme;
