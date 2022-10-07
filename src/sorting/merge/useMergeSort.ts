import useGenerator from "@/hooks/useGenerator";
import mergeGenerator from "./generator";

function useMergeSort(initial: number[]) {
  const { step, isDone, next, reset } = useGenerator(
    () => mergeGenerator(initial),
    [initial]
  );

  return { step, next, isDone, reset };
}

export default useMergeSort;
