export const isAllTrue = (values: boolean[]): boolean => {
  const truthy = [];
  const falsy = [];

  values.forEach((value) => {
    if (value) {
      truthy.push(value);
    } else {
      falsy.push(value);
    }
  });

  return !falsy.length;
};
