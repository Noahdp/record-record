"use client";

import Image from "next/image";
import { Box, Heading, Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box minH="100vh" p={[8, 20]} pb={20}>
      <Flex direction="column" gap={8} align={["center", "flex-start"]}>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={38}
          priority
        />
        <Heading as="h1" size="lg">
          Welcome to Record Record
        </Heading>
        <Text>Your digital vinyl collection manager</Text>

        <Flex gap={4}>
          <Button
            colorScheme="blue"
            size={["md", "lg"]}
            onClick={() => router.push("/collection")}
          >
            View Collection
          </Button>
          <Button
            variant="outline"
            size={["md", "lg"]}
            onClick={() => router.push("/search")}
          >
            Search Albums
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
