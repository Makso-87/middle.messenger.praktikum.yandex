import { getType } from './getType';

export type Indexed<T = unknown> = {
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
      const type = getType(rhs[rhsKey]);

      if (type === 'Object') {
        result[rhsKey] = merge(lhs[rhsKey] as Indexed, rhs[rhsKey] as Indexed);
        return;
      }

      result[rhsKey] = rhs[rhsKey];
    } else {
      result[rhsKey] = rhs[rhsKey];
    }
  });

  return result;
};
