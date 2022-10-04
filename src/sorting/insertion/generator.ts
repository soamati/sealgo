type Step = {
  partial: number[];

  compared: number;
  comparedValue: number;

  pivot: number;
  phase: "starting" | "pivoting" | "placing";

  comparisons: number;
  swaps: number;
};

const defaultStep: Step = {
  partial: [],
  compared: 0,
  comparedValue: 0,
  pivot: 0,
  phase: "starting",
  comparisons: 1,
  swaps: 0,
};

function* insertionGenerator(initial: number[]) {
  const partial = [...initial];
  const step = { ...defaultStep };

  for (let i = 1; i < partial.length; i++) {
    const compared = partial[i];
    let pivot = i - 1; // sorted portion last index

    step.phase = "starting";
    step.compared = i;
    step.comparedValue = partial[i];
    step.pivot = pivot;
    step.partial = [...partial];
    yield { ...step };

    while (pivot >= 0 && partial[pivot] > compared) {
      partial[pivot + 1] = partial[pivot];
      pivot--;

      step.phase = "pivoting";
      step.pivot = pivot;
      step.partial = [...partial];
      step.swaps += 1;
      step.comparisons += 1;
      yield { ...step };
    }

    if (pivot !== i - 1) {
      partial[pivot + 1] = compared;
      step.swaps += 1;
    }

    step.phase = "placing";
    step.pivot = pivot + 1;
    step.partial = [...partial];
    yield { ...step };
  }

  return null;
}

export default insertionGenerator;
