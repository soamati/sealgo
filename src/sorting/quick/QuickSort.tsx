import React from "react";
import { useDataContext } from "@/context/DataProvider";
import { Box, Stack, HStack, Button, Flex, Center } from "@chakra-ui/react";
import useInterval from "@/hooks/useInterval";
import SpeedControl from "@/components/SpeedControl";
import { useSpeedContext } from "@/context/SpeedProvider";
import MainLayout from "@/components/MainLayout";
import TextArray from "@/components/TextArray";
import SortingInfo from "@/components/SortingInfo";
import useQuickSort from "./useQuickSort";

const QuickSort = () => {
  const { speed, resetLevel } = useSpeedContext();
  const { data, generate } = useDataContext();

  const { step, next, isDone, reset } = useQuickSort(data.numbers);
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

  const getColor = React.useCallback(
    (index: number) => {
      if (!step) return "gray.400";

      return isDone
        ? "green.400"
        : step.info.placed.has(index)
        ? "pink.400"
        : index === step.pivot.position
        ? "orange.400"
        : step.compared && index === step.compared
        ? "purple.400"
        : "gray.400";
    },
    [step, isDone]
  );

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
              {step.current.map((num, idx) => (
                <Box
                  rounded="sm"
                  key={idx}
                  h={`${(num / data.max) * 100}%`}
                  bg={getColor(idx)}
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
              {
                legend: "Comparisons",
                value: step ? step.info.comparisons : 0,
              },
              { legend: "Swaps", value: step ? step.info.swaps : 0 },
            ]}
          />

          <Stack>
            <TextArray
              data={step ? step.current : data.numbers}
              color={isDone ? "green.400" : step ? "yellow.400" : "gray.100"}
            />
          </Stack>
        </Stack>
      </Center>
    </MainLayout>
  );
};

export default QuickSort;
