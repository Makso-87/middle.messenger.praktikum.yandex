export type Indexed<T = any> = {
  [key in string]: T;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  if (rhs === null) {
    return { ...lhs };
  }

  if (lhs === null) {
    return { ...rhs };
  }

  const lhsKeys = Object.keys(lhs);
  const rhsKeys = Object.keys(rhs);
  const result = lhs;

  rhsKeys.forEach((rhsKey) => {
    if (lhsKeys.includes(rhsKey)) {
      const type = Object.prototype.toString.call(rhs[rhsKey]).slice(8, -1);

      if (type === 'Object') {
        result[rhsKey] = merge(lhs[rhsKey], rhs[rhsKey]);
        return;
      }

      result[rhsKey] = rhs[rhsKey];
    } else {
      result[rhsKey] = rhs[rhsKey];
    }
  });

  return result;
};
