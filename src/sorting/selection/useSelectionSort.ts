import useGenerator from "@/hooks/useGenerator";
import selectionGenerator from "./generator";

function useSelectionSort(initial: number[]) {
  const { step, next, isDone, reset } = useGenerator(
    () => selectionGenerator(initial),
    [initial]
  );

  return { step, next, isDone, reset };
}

export default useSelectionSort;
