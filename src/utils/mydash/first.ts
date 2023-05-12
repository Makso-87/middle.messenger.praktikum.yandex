// [1, 2, 3, 4] => 1

export const first = (list: unknown[]) => {
  if (!Array.isArray(list)) {
    return undefined;
  }

  if (list.length === 0) {
    return undefined;
  }

  return list[0];
};

// type StepFn = (val: number) => number | StepFn;

interface StepFn {
    (n: number): StepFn;
    (n?: undefined): number;
}

const add: StepFn = ((val) => {
  if (val === undefined) {
    return 0;
  }

  const summand = [val];

  const stepFunc:StepFn = ((val2) => {
    if (val2 === undefined) {
      return summand.reduce((acc, item) => acc + item, 0);
    }

    summand.push(val2);

    return stepFunc;
  }) as StepFn;

  return stepFunc;
}) as StepFn;

add(1)(2)(3)();
