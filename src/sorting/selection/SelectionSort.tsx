import React from "react";
import { useDataContext } from "@/context/DataProvider";
import {
  Box,
  Stack,
  HStack,
  Button,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Flex,
} from "@chakra-ui/react";
import useInterval from "@/hooks/useInterval";
import { speeds } from "@/constants";
import useSelectionSort from "./useSelectionSort";
import MainLayout from "@/components/MainLayout";

const SelectionSort = () => {
  const [speed, setSpeed] = React.useState(5);
  const { data, generate } = useDataContext();

  const { step, next, isDone, reset } = useSelectionSort(data.numbers);
  const { start, pause, isActive } = useInterval(next, speeds[speed]);

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
      <Stack spacing="4">
        <HStack justify="space-between">
          <Button onClick={onGenerate}>Generar arreglo</Button>

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

        <Stack>
          <Center>
            <Text fontWeight="semibold">Velocidad</Text>
          </Center>

          <Slider
            aria-label="speed-slider"
            defaultValue={5}
            min={0}
            max={9}
            step={1}
            onChangeEnd={(value) => setSpeed(value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Stack>
      </Stack>

      <Center flex="1">
        <Stack w="full" spacing="8">
          {step !== null ? (
            <Flex h="300px" w="full" align="end" gap="1px">
              {step.partial.map((num, idx) => (
                <Box
                  rounded="sm"
                  key={idx}
                  h={`${(num / data.max) * 100}%`}
                  flex="1"
                  bg={
                    isDone || idx < step.swap
                      ? "green.400"
                      : idx === step.swap
                      ? "red.400"
                      : idx === step.pivot
                      ? "orange.400"
                      : idx === step.compared
                      ? "yellow.400"
                      : "gray.400"
                  }
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

          <HStack justify="space-between">
            <Text fontWeight="semibold">
              Comparaciones: {step ? step.comparisons : 0}
            </Text>
            <Text fontWeight="semibold">Cambios: {step ? step.swaps : 0}</Text>
          </HStack>
        </Stack>
      </Center>
    </MainLayout>
  );
};

export default SelectionSort;
