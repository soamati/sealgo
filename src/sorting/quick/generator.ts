import { swap } from "@/sorting/utils";

type Pivot = {
  value: number;
  position: number;
};

type Info = {
  swaps: number;
  comparisons: number;
  placed: Map<number, number>;
};

type Step = {
  current: number[];
  pivot: Pivot;
  compared?: number;
  info: Info;
};

function* placePivot(
  current: number[],
  start: number,
  end: number,
  pivot: Pivot,
  info: Info
): Generator<Step> {
  pivot.value = current[start];
  pivot.position = start;

  for (let i = start + 1; i <= end; i++) {
    yield { current, pivot, compared: i, info };

    if (pivot.value > current[i]) {
      pivot.position++;
      swap(current, pivot.position, i);
      info.swaps++;
    }
    info.comparisons++;
  }

  info.placed.set(pivot.position, pivot.value);
  yield { current, pivot, info };

  if (pivot.position !== start) {
    swap(current, start, pivot.position);
    info.swaps++;

    yield { current, pivot, info };
  }
}

function* quickGenerator(
  current: number[],
  start = 0,
  end = current.length - 1,
  info = { swaps: 0, comparisons: 0, placed: new Map() }
): Generator<Step, null, unknown> {
  if (start < end) {
    const pivot = { value: 0, position: 0 };
    yield* placePivot(current, start, end, pivot, info);
    yield* quickGenerator(current, start, pivot.position - 1, info);
    yield* quickGenerator(current, pivot.position + 1, end, info);
  }

  return null;
}

const gen = quickGenerator([1, 2, 3]);
const step = gen.next();
step;

export default quickGenerator;
