import React from "react";
import { HStack, Stack, Text } from "@chakra-ui/react";

type InfoItem = {
  legend: string;
  value: number;
};

type Props = {
  items: InfoItem[];
};

const SortingInfo = ({ items }: Props) => {
  return (
    <Stack direction={["column", "row"]} justify="space-between" align="center">
      {items.map(({ legend, value }, index) => (
        <Text key={index} fontWeight="semibold" fontSize={["sm", "md"]}>
          {legend}: {value}
        </Text>
      ))}
    </Stack>
  );
};

export default SortingInfo;
