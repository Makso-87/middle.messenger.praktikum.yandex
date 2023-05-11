import { getType } from './getType';
import { isArray } from './isArray';

type Map = {
  size: number,
};

const isString = (value: unknown): value is string => typeof value === 'string';
const isMapOrSet = (value: any): value is Map => !!value?.size;

export const isEmpty = <T>(value: T) => {
  const type = getType(value);

  switch (type) {
    case 'Array': {
      if (isArray(value)) {
        return !value.length;
      }

      return false;
    }
    case 'Object':
      return !Object.keys(value).length;
    case 'Map': {
      if (isMapOrSet(value)) {
        return !value.size;
      }

      return false;
    }
    case 'Set': {
      if (isMapOrSet(value)) {
        return !value.size;
      }

      return false;
    }
    case 'String': {
      if (isString(value)) {
        return !value.length;
      }

      return false;
    }
    case 'Number':
      return true;
    case 'Null':
      return true;
    case 'Undefined':
      return true;
    case 'Boolean':
      return true;

    default:
      return false;
  }
};
