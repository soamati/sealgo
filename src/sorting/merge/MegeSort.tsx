import React from "react";
import { useDataContext } from "@/context/DataProvider";
import { Box, Stack, HStack, Button, Flex, Center } from "@chakra-ui/react";
import useInterval from "@/hooks/useInterval";
import SpeedControl from "@/components/SpeedControl";
import { useSpeedContext } from "@/context/SpeedProvider";
import useMergeSort from "./useMergeSort";
import MainLayout from "@/components/MainLayout";
import TextArray from "@/components/TextArray";
import SortingInfo from "@/components/SortingInfo";

const MergeSort = () => {
  const { speed } = useSpeedContext();
  const { data, generate } = useDataContext();

  const { step, next, isDone, reset } = useMergeSort(data.numbers);
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
    (pos: string) => {
      if (!step) return "gray.400";

      if (isDone) return "green.400";
      if (!step.compared) return "gray.400";

      if (step.compared.i === pos) return "yellow.400";
      if (step.compared.j === pos) return "orange.400";

      return "gray.400";
    },
    [step, isDone]
  );

  return (
    <MainLayout>
      {/* Controls */}
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

      {/* Array */}
      <Center flex="1">
        <Stack w="full" spacing="8">
          {step && step.partial ? (
            <Flex h="300px" w="full" align="end" gap="1px">
              {step.partial.map((partition, p) => (
                <React.Fragment key={`left-partition-${p}`}>
                  {partition.map((num, i) => {
                    const pos = `${p}-${i}`;
                    return (
                      <Box
                        rounded="sm"
                        key={`left-${i}`}
                        h={`${(num / data.max) * 100}%`}
                        bg={getColor(pos)}
                        flex="1"
                      />
                    );
                  })}
                </React.Fragment>
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
              { legend: "Comparaciones", value: step ? step.comparisons : 0 },
              { legend: "Particiones", value: step ? step.partial.length : 0 },
            ]}
          />

          <Stack>
            <TextArray
              data={step ? step.partial.flat() : data.numbers}
              color={isDone ? "green.400" : step ? "yellow.400" : "gray.100"}
            />
          </Stack>
        </Stack>
      </Center>
    </MainLayout>
  );
};

export default MergeSort;
