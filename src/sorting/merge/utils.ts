type StepData = {
  side: "left" | "right" | "final";
  partition: number;
};

export function split<T>(arr: T[]) {
  const mid = Math.floor(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

export function combine(arr: number[][], index: number) {
  const a = arr[index];
  const b = arr[index + 1] || [];
  return [...arr.slice(0, index), [...a, ...b], ...arr.slice(index + 2)];
}

export function replace<T>(arr: T[], pos: number, item: T) {
  return [...arr.slice(0, pos), item, ...arr.slice(pos + 1)];
}

export function merge(a: number[], b: number[] | undefined, partition: number) {
  if (!b) return { result: a, history: [] };

  let i = 0;
  let j = 0;

  let result: number[] = [];
  const partial = [];
  const history = [];

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      partial.push(a[i]);
      i++;
    } else {
      partial.push(b[j]);
      j++;
    }
    result = [...partial, ...a.slice(i), ...b.slice(j)];
    history.push({
      result,
      compared: { i: `${partition}-${i}`, j: `${partition}-${j}` },
    });
  }

  return { result, history };
}

export default merge;
