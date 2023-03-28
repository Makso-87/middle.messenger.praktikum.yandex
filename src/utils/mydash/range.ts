export const range = (start:number = 0, end: number, step: number = 1, isRight: boolean = false) => {
  end = end || start;
  start = end === start ? 0 : start;
  step = end < 0 && step > 0 ? step * -1 : step;

  let counter: number = start;
  const rangeStore: number[] = [];

  while (Math.abs(counter) < Math.abs(end)) {
    if (step === 0) {
      counter += 1;
      rangeStore.push(start);
      continue;
    }

    rangeStore.push(counter);
    counter += step;
  }

  return isRight ? rangeStore.reverse() : rangeStore;
};
