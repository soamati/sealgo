import React, { PropsWithChildren } from "react";
import { Flex, HStack, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex flexDir="column" minH="100vh" mx="auto" maxW="container.md" p="4">
      <HStack justify="space-between" p="2" mb="4">
        <Heading size="sm">sealgo 🧪</Heading>

        <HStack>
          <Link to="/bubble">
            <Button size="sm" variant="ghost" colorScheme="yellow">
              bubble
            </Button>
          </Link>
          <Link to="/selection">
            <Button size="sm" variant="ghost" colorScheme="teal">
              selection
            </Button>
          </Link>
        </HStack>
      </HStack>

      {children}
    </Flex>
  );
};

export default MainLayout;
