import { isPlainObject, PlainObject } from './isPlainObject';
import { isArray } from './isArray';

function cloneDeep<T extends object = any>(obj: T) {
  let startValue: [] | PlainObject = {};

  if (isArray(obj)) {
    startValue = [];
  }

  return Object.entries(obj).reduce((acc: any, [itemKey, itemValue]: [string, T]) => {
    if (isArray(itemValue) || isPlainObject(itemValue)) {
      acc[itemKey] = cloneDeep(itemValue);
      return acc;
    }

    acc[itemKey] = itemValue;
    return acc;
  }, startValue);
}

export default cloneDeep;
