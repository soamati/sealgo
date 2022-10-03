import bubbleGenerator from "./generator";
import useGenerator from "@/hooks/useGenerator";

function useBubbleSort(initial: number[]) {
  const { step, isDone, next, reset } = useGenerator(
    () => bubbleGenerator(initial),
    [initial]
  );

  return { step, next, isDone, reset };
}

export default useBubbleSort;
