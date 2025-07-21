"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
  useColorModeValue,
  Container,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { FcMusic } from "react-icons/fc";
import { FaRecordVinyl } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const MotionBox = motion(Box);

interface NavItemProps {
  label: string;
  href: string;
  icon?: React.ElementType;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  label,
  href,
  icon: Icon,
  isActive,
  onClick,
}: NavItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <MotionBox
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant={isActive ? "solid" : "ghost"}
        colorScheme={isActive ? "brand" : "gray"}
        size="md"
        leftIcon={Icon ? <Icon /> : undefined}
        onClick={handleClick}
        fontWeight="medium"
        _hover={{
          bg: isActive ? "brand.600" : "gray.100",
          _dark: {
            bg: isActive ? "brand.600" : "gray.700",
          },
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Button>
    </MotionBox>
  );
};

export const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();
  const pathname = usePathname();

  const navigationItems = [
    {
      label: "Home",
      href: "/",
      icon: () => <SearchIcon boxSize={5} />,
    },
    {
      label: "Collection",
      href: "/collection",
      icon: () => <FcMusic size={20} />,
    },
  ];
  return (
    <MotionBox
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.100", "gray.700")}
        boxShadow="sm"
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Container maxW="container.xl">
          <Flex minH="16" py={2} align="center" justify="space-between">
            {/* Logo */}
            <Flex align="center" gap={3}>
              <Box p={2} bg="red.400" borderRadius="lg" color="white">
                <FaRecordVinyl size={32} />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={useColorModeValue("gray.800", "white")}
                display={["none", "block"]}
              >
                Record Record
              </Text>
            </Flex>

            {/* Desktop Navigation */}
            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              {navigationItems.map((item) => (
                <NavItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  isActive={pathname === item.href}
                />
              ))}
            </HStack>

            {/* Mobile menu button */}
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Toggle Navigation"
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              variant="ghost"
            />
          </Flex>

          {/* Mobile Navigation */}
          <Collapse in={isOpen} animateOpacity>
            <Box pb={4} display={{ base: "block", md: "none" }}>
              <Stack spacing={2}>
                {navigationItems.map((item) => (
                  <NavItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    isActive={pathname === item.href}
                    onClick={onToggle}
                  />
                ))}
              </Stack>
            </Box>
          </Collapse>
        </Container>
      </Box>
    </MotionBox>
  );
};
