import React from "react";
import { Level, useSpeedContext } from "@/context/SpeedProvider";
import {
  Stack,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

const SpeedControl = () => {
  const { setLevel } = useSpeedContext();

  return (
    <Stack>
      <Center>
        <Text fontWeight="semibold">Speed</Text>
      </Center>

      <Slider
        aria-label="speed-slider"
        defaultValue={7}
        min={0}
        max={9}
        step={1}
        onChangeEnd={(value) => setLevel(value as Level)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Stack>
  );
};

export default SpeedControl;
