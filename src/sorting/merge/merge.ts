type Data = {
  partialLft: number[][];
  partialRht: number[][];
  sorted: number[] | null;
};

function* merge(
  a: number[],
  b: number[],
  updateStep: (partial: number[]) => void,
  getStep: () => Data
) {
  let partial = [];

  let i = 0;
  let j = 0;

  const m: number[] = [];

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      m.push(a[i]);
      i++;
    } else {
      m.push(b[j]);
      j++;
    }
    partial = [...m, ...a.slice(i), ...b.slice(j)];

    updateStep(partial);
    yield getStep();
  }
}

export default merge;
