import React, { PropsWithChildren } from "react";
import {
  Flex,
  HStack,
  Button,
  Heading,
  Stack,
  Center,
  Text,
  Icon,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { Linkedin, GitHub } from "react-feather";
import ExternalLink from "./ExternalLink";

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
      h="100vh"
      minH="min-content"
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
        <Link to="/">
          <Heading size="sm">sealgo 🧪</Heading>
        </Link>

        <HStack flexWrap="wrap" justify="center" align="center">
          <LinkItem to="/bubble">bubble</LinkItem>
          <LinkItem to="/selection">selection</LinkItem>
          <LinkItem to="/insertion">insertion</LinkItem>
          <LinkItem to="/merge">merge</LinkItem>
          <LinkItem to="/quick">quick</LinkItem>
        </HStack>
      </Stack>

      {children}

      <Center mt="12">
        <Stack>
          <Text>Matias Ruiz</Text>
          <HStack justify="center" spacing="4">
            <ExternalLink href="https://linkedin.com/in/matiruizsh/">
              <Icon as={Linkedin} />
            </ExternalLink>
            <ExternalLink href="https://github.com/soamati">
              <Icon as={GitHub} />
            </ExternalLink>
          </HStack>
        </Stack>
      </Center>
    </Flex>
  );
};

export default MainLayout;
