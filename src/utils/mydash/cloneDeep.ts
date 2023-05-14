import { isPlainObject, PlainObject } from './isPlainObject';
import { isArray } from './isArray';

function cloneDeep<T extends PlainObject = {}>(obj: T) {
  let startValue: [] | PlainObject = {};

  if (isArray(obj)) {
    startValue = [];
  }

  return Object.entries(obj).reduce((acc: [] | PlainObject, [itemKey, itemValue]: [string, T]) => {
    if (isArray(itemValue) || isPlainObject(itemValue)) {
      // @ts-ignore
      acc[itemKey] = cloneDeep(itemValue);
      return acc;
    }

    // @ts-ignore
    acc[itemKey] = itemValue;
    return acc;
  }, startValue);
}

export default cloneDeep;
