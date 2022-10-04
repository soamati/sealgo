import useGenerator from "@/hooks/useGenerator";
import insertionGenerator from "./generator";

function useInsertionSort(initial: number[]) {
  const { step, isDone, next, reset } = useGenerator(
    () => insertionGenerator(initial),
    [initial]
  );

  return { step, next, isDone, reset };
}

export default useInsertionSort;
