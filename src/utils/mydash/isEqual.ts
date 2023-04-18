const isArray = (value: unknown): value is [] => Array.isArray(value);

type PlainObject<T = unknown> = {
  [key in string]: T;
};

const isPlainObject = (value: unknown): value is PlainObject => Object.prototype.toString.call(value).slice(8, -1) === 'Object';

const isArrayOrPlainObject = (value: unknown): value is ([] | PlainObject) => isPlainObject(value) || isArray(value);

export const isEqual = (arg1: any, arg2: any):boolean => {
  const arg1Keys = Object.keys(arg1);
  const arg2Keys = Object.keys(arg2);

  if (arg1Keys.length !== arg2Keys.length) {
    return false;
  }

  for (const aKey of arg1Keys) {
    if (!arg2.hasOwnProperty(aKey)) {
      return false;
    }

    if (isPlainObject(arg1[aKey])) {
      const result = isEqual(arg1[aKey], arg2[aKey]);

      if (!result) {
        return result;
      }
    } else if (Array.isArray(arg1[aKey])) {
      if (!Array.isArray(arg2[aKey])) {
        return false;
      }

      if (arg1[aKey].length !== arg2[aKey].length) {
        return false;
      }

      const result = isEqual(arg1[aKey], arg2[aKey]);

      if (!result) {
        return result;
      }
    } else if (arg1[aKey] !== arg2[aKey]) {
      return false;
    }
  }

  return true;
};
