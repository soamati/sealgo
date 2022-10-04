import React, { PropsWithChildren } from "react";
import { Flex, HStack, Button, Heading } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  return (
    <Flex flexDir="column" minH="100vh" mx="auto" maxW="container.md" p="4">
      <HStack justify="space-between" p="2" mb="4">
        <Heading size="sm">sealgo 🧪</Heading>

        <HStack>
          <Link to="/bubble">
            <Button
              size="sm"
              variant="ghost"
              colorScheme={pathname === "/bubble" ? "blue" : "gray"}
            >
              bubble
            </Button>
          </Link>
          <Link to="/selection">
            <Button
              size="sm"
              variant="ghost"
              colorScheme={pathname === "/selection" ? "blue" : "gray"}
            >
              selection
            </Button>
          </Link>
          <Link to="/insertion">
            <Button
              size="sm"
              variant="ghost"
              colorScheme={pathname === "/insertion" ? "blue" : "gray"}
            >
              insertion
            </Button>
          </Link>
        </HStack>
      </HStack>

      {children}
    </Flex>
  );
};

export default MainLayout;
