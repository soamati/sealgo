export type Step = {
  partial: number[];
  compared: {
    left: number; // index
    right: number; // index
  };
  isSwap: boolean;
  sorted: number;
  comparisons: number;
  swaps: number;
};
