// todo задать тип generic
export const isEmpty = (value: unknown) => {
  const type = Object.prototype.toString.call(value).slice(8, -1);

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
