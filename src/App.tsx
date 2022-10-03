import React from "react";
import { Flex } from "@chakra-ui/react";
import BubbleSort from "./sorting/bubble/BubbleSort";

function App() {
  return (
    <Flex flexDir="column" minH="100vh" mx="auto" maxW="container.md" p="4">
      <BubbleSort />
    </Flex>
  );
}

export default App;
