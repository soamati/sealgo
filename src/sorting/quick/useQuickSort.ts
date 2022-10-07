import React from "react";
import useGenerator from "@/hooks/useGenerator";
import quickGenerator from "./generator";

function useQuickSort(initial: number[]) {
  const { step, isDone, next, reset } = useGenerator(
    () => quickGenerator([...initial]),
    [initial]
  );

  return { step, next, isDone, reset };
}

export default useQuickSort;
