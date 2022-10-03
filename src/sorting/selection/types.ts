export type Step = {
  partial: number[];
  pivot: number;
  swap: number;
  compared: number;
  phase: "comparison" | "swapping";
  isSwap: boolean | null;
  swaps: number;
  comparisons: number;
};
