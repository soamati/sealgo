import React from "react";
import { Center, ColorProps, Text } from "@chakra-ui/react";

type Props = {
  data: number[];
  color?: ColorProps["color"];
};

const TextArray = ({ data, color }: Props) => {
  return (
    <Center>
      <Text textAlign="center" color={color} wordBreak="break-all">
        {JSON.stringify(data)}
      </Text>
    </Center>
  );
};

export default TextArray;
