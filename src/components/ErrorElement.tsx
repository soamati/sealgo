import React from "react";
import { Center, Text } from "@chakra-ui/react";
import MainLayout from "./MainLayout";

const ErrorElement = () => {
  return (
    <MainLayout>
      <Center flex="1">
        <Text>{"We didn't find what you were looking for"}</Text>
      </Center>
    </MainLayout>
  );
};

export default ErrorElement;
