import { merge, split, combine, replace } from "./utils";

function* mergeGenerator(arr: number[]) {
  const initial = arr.map((num) => [num]);
  let [lft, rgt] = split(initial);

  const initialSizeLft = lft.length;
  const initialSizeRgt = rgt.length;

  let comparisons = 0;

  // sort left side
  while (lft[0].length < initialSizeLft) {
    const sorted = [];
    let partial = [...lft];

    for (let i = 0; i < lft.length; i += 2) {
      const a = lft[i];
      const b = lft[i + 1];

      partial = combine(partial, i / 2);
      yield { partial: [...partial, ...rgt], comparisons };

      const { result, history } = merge(a, b, i);

      for (let j = 0; j < history.length; j++) {
        const { result, compared } = history[j];
        partial = replace(partial, i / 2, result);
        comparisons++;

        yield { partial: [...partial, ...rgt], compared, comparisons };
      }

      sorted.push(result);
    }
    lft = [...sorted];
  }

  // repeat for right side
  while (rgt[0].length < initialSizeRgt) {
    const sorted = [];
    let partial = [...rgt];

    for (let i = 0; i < rgt.length; i += 2) {
      const a = rgt[i];
      const b = rgt[i + 1];

      partial = combine(partial, i / 2);
      yield { partial: [...lft, ...partial], comparisons };

      const { result, history } = merge(a, b, lft.length + i);

      for (let j = 0; j < history.length; j++) {
        const { result, compared } = history[j];
        partial = replace(partial, i / 2, result);
        comparisons++;

        yield { partial: [...lft, ...partial], compared, comparisons };
      }

      sorted.push(result);
    }
    rgt = [...sorted];
  }

  // first item of lft & rgt is the sorted result of each half
  const sortedLft = lft[0];
  const sortedRgt = rgt[0];

  // final partition to merge
  const partition = [sortedLft, sortedRgt];

  // combined partition for rendering
  let partial = combine(partition, 0);
  yield { partial, comparisons };

  const { history } = merge(sortedLft, sortedRgt, 0);

  for (let j = 0; j < history.length; j++) {
    const { result, compared } = history[j];
    partial = replace(partial, 0, result);
    comparisons++;

    yield { partial, compared, comparisons };
  }

  return null;
}

export default mergeGenerator;
