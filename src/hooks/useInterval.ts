import React from "react";
import { useBoolean } from "@chakra-ui/react";

function useInterval(
  callback: () => void,
  interval: number,
  autoStart = false
) {
  const ref = React.useRef<number | null>(null);

  const [isActive, { on, off }] = useBoolean(autoStart);

  const start = React.useCallback(() => {
    const active = ref.current;
    if (active) {
      clearInterval(active);
    }
    ref.current = setInterval(callback, interval);
    on();
  }, [callback, interval, on]);

  const pause = React.useCallback(() => {
    const active = ref.current;
    if (active) {
      clearInterval(active);
    }
    off();
  }, [off]);

  React.useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      pause();
    };
  }, [autoStart, start, pause]);

  return { start, pause, isActive };
}

export default useInterval;
