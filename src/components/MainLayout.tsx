import React, { PropsWithChildren } from "react";
import { Flex, HStack, Button, Heading, Stack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  to: string;
};

const LinkItem = ({ children, to }: PropsWithChildren<Props>) => {
  const { pathname } = useLocation();

  return (
    <Link to={to}>
      <Button
        size="sm"
        variant="ghost"
        colorScheme={pathname === to ? "yellow" : "gray"}
        isDisabled={to === "/quick"}
      >
        {children}
      </Button>
    </Link>
  );
};

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      flexDir="column"
      minH="100vh"
      mx="auto"
      maxW="container.md"
      p={["2", "4"]}
    >
      <Stack
        direction={["column", "column", "row"]}
        align="center"
        justify="space-between"
        p="2"
        spacing="8"
        mb="8"
      >
        <Heading size="sm">sealgo 🧪</Heading>

        <HStack flexWrap="wrap" justify="center" align="center">
          <LinkItem to="/bubble">bubble</LinkItem>
          <LinkItem to="/selection">selection</LinkItem>
          <LinkItem to="/insertion">insertion</LinkItem>
          <LinkItem to="/merge">merge</LinkItem>
          <LinkItem to="/quick">quick</LinkItem>
        </HStack>
      </Stack>

      {children}
    </Flex>
  );
};

export default MainLayout;
