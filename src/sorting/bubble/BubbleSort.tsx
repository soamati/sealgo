import React from "react";
import { useDataContext } from "@/context/DataProvider";
import { Box, Stack, HStack, Button, Flex, Center } from "@chakra-ui/react";
import useInterval from "@/hooks/useInterval";
import useBubbleSort from "./useBubbleSort";
import SpeedControl from "@/components/SpeedControl";
import { useSpeedContext } from "@/context/SpeedProvider";
import MainLayout from "@/components/MainLayout";
import TextArray from "@/components/TextArray";
import SortingInfo from "@/components/SortingInfo";

const BubbleSort = () => {
  const { speed, resetLevel } = useSpeedContext();
  const { data, generate } = useDataContext();

  const { step, next, isDone, reset } = useBubbleSort(data.numbers);
  const { start, pause, isActive } = useInterval(next, speed);

  React.useEffect(() => {
    resetLevel();
  }, [resetLevel]);

  React.useEffect(() => {
    if (isDone) {
      pause();
    }
  }, [isDone, pause]);

  const onReset = () => {
    pause();
    reset();
  };

  const onGenerate = () => {
    onReset();
    generate();
  };

  return (
    <MainLayout>
      {/* Controls */}
      <Stack spacing="4" mb="8">
        <HStack justify="space-between">
          <Button onClick={onGenerate}>Generate</Button>

          {isDone ? (
            <Button onClick={onReset}>Reiniciar</Button>
          ) : !isActive ? (
            <Button onClick={start} colorScheme="green">
              Sort
            </Button>
          ) : (
            <Button onClick={pause} colorScheme="red">
              Pause
            </Button>
          )}
        </HStack>

        <SpeedControl />
      </Stack>

      {/* Array */}
      <Center flex="1">
        <Stack w="full" spacing="8">
          {step !== null ? (
            <Flex h="300px" w="full" align="end" gap="1px">
              {step.partial.map((num, idx) => (
                <Box
                  rounded="sm"
                  key={idx}
                  h={`${(num / data.max) * 100}%`}
                  bg={
                    isDone || idx >= step.partial.length - step.sorted
                      ? "green.400"
                      : idx === step.compared.left ||
                          idx === step.compared.right
                        ? "yellow.400"
                        : "gray.400"
                  }
                  flex="1"
                />
              ))}
            </Flex>
          ) : (
            <Flex h="300px" w="full" align="end" gap="1px">
              {data.numbers.map((num, idx) => (
                <Box
                  key={idx}
                  h={`${(num / data.max) * 100}%`}
                  bg="gray.400"
                  flex="1"
                />
              ))}
            </Flex>
          )}

          {/* Info */}
          <SortingInfo
            items={[
              { legend: "Comparisons", value: step ? step.comparisons : 0 },
              { legend: "Swaps", value: step ? step.swaps : 0 },
            ]}
          />

          <Stack>
            <TextArray
              data={step ? step.partial : data.numbers}
              color={isDone ? "green.400" : step ? "yellow.400" : "gray.100"}
            />
          </Stack>
        </Stack>
      </Center>
    </MainLayout>
  );
};

export default BubbleSort;
