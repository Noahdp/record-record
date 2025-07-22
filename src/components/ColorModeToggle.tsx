"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export const ColorModeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  // Wait until after hydration to show the component
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after hydration to prevent mismatch
  if (!mounted) {
    return null;
  }

  const SwitchIcon = colorMode === "light" ? MoonIcon : SunIcon;
  const iconColor = colorMode === "light" ? "gray.600" : "yellow.400";

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={<SwitchIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      color={iconColor}
      _hover={{
        bg: colorMode === "light" ? "gray.200" : "gray.600",
      }}
    />
  );
};
