import { Step } from "./types";

function* bubbleGenerator(initial: number[]) {
  const partial = [...initial];

  let sorted = 0;
  let comparisons = 0;
  let swaps = 0;

  while (sorted < partial.length) {
    for (let i = 0; i < partial.length - sorted - 1; i++) {
      comparisons++;

      const step: Step = {
        partial: [...partial],
        compared: { left: i, right: i + 1 },
        isSwap: false,
        sorted,
        comparisons,
        swaps,
      };

      if (partial[i] <= partial[i + 1]) {
        yield step;
        continue;
      }

      swaps++;
      step.isSwap = true;
      step.swaps = swaps;
      yield step;

      const aux = partial[i];
      partial[i] = partial[i + 1];
      partial[i + 1] = aux;
    }
    sorted++;
  }

  return null;
}

export default bubbleGenerator;

export type BubbleGenerator = ReturnType<typeof bubbleGenerator>;
