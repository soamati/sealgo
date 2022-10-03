import { Step } from "./types";

function* selectionGenerator(initial: number[]) {
  const partial = [...initial];
  let aux;

  const step: Step = {
    // indexes
    pivot: 0,
    swap: 0,
    compared: 0,
    // counters
    swaps: 0,
    comparisons: 0,
    // helpers
    isSwap: null,
    phase: "comparison",
    // control array
    partial: [...partial],
  };

  for (let i = 0; i < partial.length - 1; i++) {
    step.swap = step.pivot = i;
    step.phase = "comparison";
    step.isSwap = null;

    for (let j = i + 1; j < partial.length; j++) {
      step.compared = j;
      step.comparisons += 1;
      yield { ...step };

      if (partial[step.compared] < partial[step.pivot]) {
        step.pivot = step.compared;
      }
    }

    step.compared = step.pivot;
    step.phase = "swapping";
    step.isSwap = false;

    if (step.swap === step.pivot) {
      yield { ...step };
      continue;
    }

    aux = partial[step.swap];
    partial[step.swap] = partial[step.pivot];
    partial[step.pivot] = aux;

    step.isSwap = true;
    step.swaps += 1;
    step.partial = [...partial];

    yield { ...step };
  }

  return null;
}

export default selectionGenerator;
