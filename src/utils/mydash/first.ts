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
