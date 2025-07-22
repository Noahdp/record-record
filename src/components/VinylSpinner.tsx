"use client";

import React from "react";
import { Box, BoxProps, useTheme, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface VinylSpinnerProps extends Omit<BoxProps, "size"> {
  size?: "sm" | "md" | "lg" | "xl" | string;
  color?: string;
  speed?: number | string;
  thickness?: string; // Spinner API compatibility (ignored)
  emptyColor?: string; // Spinner API compatibility (ignored)
  "aria-label"?: string;
}

// Size mappings to match Chakra UI Spinner sizes
const SIZE_MAP = {
  sm: "24px",
  md: "32px",
  lg: "48px",
  xl: "64px",
} as const;

// Groove configuration for better maintainability
const GROOVE_RINGS = [
  { top: "0%", size: "100%", opacity: 0.2 },
  { top: "2%", size: "96%", opacity: 0.25 },
  { top: "4%", size: "92%", opacity: 0.3 },
  { top: "6%", size: "88%", opacity: 0.25 },
  { top: "8%", size: "84%", opacity: 0.3 },
  { top: "10%", size: "80%", opacity: 0.25 },
  { top: "12%", size: "76%", opacity: 0.3 },
  { top: "15%", size: "70%", opacity: 0.4 },
  { top: "18%", size: "64%", opacity: 0.3 },
  { top: "21%", size: "58%", opacity: 0.35 },
  { top: "25%", size: "50%", opacity: 0.4 },
  { top: "28%", size: "44%", opacity: 0.25 },
] as const;

export const VinylSpinner: React.FC<VinylSpinnerProps> = ({
  size = "md",
  color,
  speed = 2,
  thickness, // Spinner API compatibility (ignored)
  emptyColor, // Spinner API compatibility (ignored)
  "aria-label": ariaLabel = "Loading",
  ...boxProps
}) => {
  // Suppress unused variable warnings for API compatibility
  void thickness;
  void emptyColor;

  const theme = useTheme();

  // Theme-aware default colors
  const defaultColorLight = theme.colors.brand?.[600] || "#206946";
  const defaultColorDark = theme.colors.brand?.[500] || "#287d53";
  const defaultColor = useColorModeValue(defaultColorLight, defaultColorDark);

  // Memoize size calculation
  const sizeValue = React.useMemo(() => {
    return typeof size === "string" && size in SIZE_MAP
      ? SIZE_MAP[size as keyof typeof SIZE_MAP]
      : size;
  }, [size]);

  // Memoize speed calculation
  const rotationDuration = React.useMemo(() => {
    return typeof speed === "string"
      ? parseFloat(speed.replace("s", ""))
      : speed;
  }, [speed]);

  // Memoize color resolution
  const recordColor = React.useMemo(() => {
    if (color) {
      // Resolve theme tokens (e.g., "brand.500")
      if (color.includes(".")) {
        const [colorName, shade] = color.split(".");
        return theme.colors[colorName]?.[shade] || color;
      }
      return color;
    }
    return defaultColor;
  }, [color, theme.colors, defaultColor]);

  // Theme-aware colors
  const recordGrooves = useColorModeValue("#1a202c", "#2d3748");
  const labelColor = theme.colors.red?.[400] || "#E91E63";
  const labelBorder = useColorModeValue("#cbd5e0", "#a0aec0");
  const holeColor = useColorModeValue("#171923", "#1a202c");

  return (
    <Box
      role="status"
      aria-label={ariaLabel}
      display="inline-block"
      {...boxProps}
    >
      <MotionBox
        width={sizeValue}
        height={sizeValue}
        position="relative"
        animate={{ rotate: 360 }}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Main vinyl record */}
        <Box
          width="100%"
          height="100%"
          borderRadius="50%"
          background={recordColor}
          position="relative"
          boxShadow="0 2px 8px rgba(0,0,0,0.2)"
        >
          {/* Record grooves */}
          {GROOVE_RINGS.map((groove, index) => (
            <Box
              key={index}
              position="absolute"
              top={groove.top}
              left={groove.top}
              width={groove.size}
              height={groove.size}
              borderRadius="50%"
              border="1px solid"
              borderColor={recordGrooves}
              opacity={groove.opacity}
            />
          ))}

          {/* Center label */}
          <Box
            position="absolute"
            top="30%"
            left="30%"
            width="40%"
            height="40%"
            borderRadius="50%"
            background={labelColor}
            border={`2px solid ${labelBorder}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Center hole */}
            <Box
              width="25%"
              height="25%"
              borderRadius="50%"
              background={holeColor}
              boxShadow="inset 0 1px 3px rgba(0,0,0,0.3)"
            />
          </Box>

          {/* Highlight for 3D effect */}
          <Box
            position="absolute"
            top="15%"
            left="15%"
            width="25%"
            height="25%"
            borderRadius="50%"
            background="linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)"
            pointerEvents="none"
          />
        </Box>
      </MotionBox>
    </Box>
  );
};

// Memoize for performance
export default React.memo(VinylSpinner);
