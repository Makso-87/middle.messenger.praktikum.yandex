// todo задать тип generic
import { getType } from './getType';

export const isEmpty = (value: unknown) => {
  const type = getType(value);

  switch (type) {
    case 'Array':
      return !value.length;
    case 'Object':
      return !Object.keys(value).length;
    case 'Map':
      return !value.size;
    case 'Set':
      return !value.size;
    case 'String':
      return !value.length;
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
