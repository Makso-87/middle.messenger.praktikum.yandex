import { PlainObject } from './isPlainObject';
import { isArray } from './isArray';
import { getType } from './getType';

type isEqualGeneric <T> = (arg1: T, arg2: T) => boolean;

function isObjectType(value: unknown): value is object {
  return getType(value) === 'Object';
}

export const isEqual:isEqualGeneric<PlainObject> = (arg1, arg2) => {
  if (arg1 !== null && arg2 === null) {
    return false;
  }

  if (arg1 === null && arg2 !== null) {
    return false;
  }

  if (arg1 === null && arg2 === null) {
    return true;
  }

  const arg1Keys = Object.keys(arg1 as object);
  const arg2Keys = Object.keys(arg2 as object);

  if (arg1Keys.length !== arg2Keys.length) {
    return false;
  }

  for (const aKey of arg1Keys) {
    if (!arg2.hasOwnProperty(aKey)) {
      return false;
    }

    if (isObjectType(arg1[aKey])) {
      const result = isEqual(arg1[aKey] as PlainObject, arg2[aKey] as PlainObject);

      if (!result) {
        return result;
      }
    } else if (isArray(arg1[aKey])) {
      if (!isArray(arg2[aKey])) {
        return false;
      }

      const valueArg1 = arg1[aKey] as [];
      const valueArg2 = arg2[aKey] as [];

      if (valueArg1.length !== valueArg2.length) {
        return false;
      }

      const result = isEqual(arg1[aKey] as PlainObject, arg2[aKey] as PlainObject);

      if (!result) {
        return result;
      }
    } else if (arg1[aKey] !== arg2[aKey]) {
      return false;
    }
  }

  return true;
};
