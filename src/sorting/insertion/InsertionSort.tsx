import React from "react";
import { useDataContext } from "@/context/DataProvider";
import { useSpeedContext } from "@/context/SpeedProvider";
import { Box, Stack, HStack, Button, Center, Flex } from "@chakra-ui/react";
import useInterval from "@/hooks/useInterval";
import useInsertionSort from "./useInsertionSort";
import MainLayout from "@/components/MainLayout";
import SpeedControl from "@/components/SpeedControl";
import TextArray from "@/components/TextArray";
import SortingInfo from "@/components/SortingInfo";

const InsertionSort = () => {
  const { speed } = useSpeedContext();
  const { data, generate } = useDataContext();

  const { step, next, isDone, reset } = useInsertionSort(data.numbers);
  const { start, pause, isActive } = useInterval(next, speed);

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
    (idx: number): string => {
      let color = "gray.400";
      if (!step) return color;

      if (idx <= step.compared) color = "green.400";

      switch (step.phase) {
        case "starting":
          if (idx === step.compared) color = "orange.400";
          break;
        case "pivoting":
          if (idx === step.pivot || idx === step.pivot + 1) color = "red.400";
          break;
        case "placing":
          if (idx === step.pivot) color = "yellow.400";
          break;
      }

      return color;
    },
    [step]
  );

  return (
    <MainLayout>
      <Stack spacing="4" mb="8">
        <HStack justify="space-between">
          <Button onClick={onGenerate}>Generar</Button>

          {isDone ? (
            <Button onClick={onReset}>Reiniciar</Button>
          ) : !isActive ? (
            <Button onClick={start} colorScheme="green">
              Ordernar
            </Button>
          ) : (
            <Button onClick={pause} colorScheme="red">
              Pausa
            </Button>
          )}
        </HStack>

        <SpeedControl />
      </Stack>

      <Center flex="1">
        <Stack w="full" spacing="8">
          {step !== null ? (
            <Flex h="300px" w="full" align="end" gap="1px">
              {step.partial.map((num, idx) => (
                <Box
                  rounded="sm"
                  key={idx}
                  h={`${
                    ((step.phase === "pivoting" && idx === step.pivot + 1
                      ? step.comparedValue
                      : num) /
                      data.max) *
                    100
                  }%`}
                  bg={isDone ? "green.400" : getColor(idx)}
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

          <SortingInfo
            items={[
              { legend: "Comparaciones", value: step ? step.comparisons : 0 },
              { legend: "Cambios", value: step ? step.swaps : 0 },
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

export default InsertionSort;
