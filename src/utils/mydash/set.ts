import { Indexed, merge } from './merge';

export const set = (object: Indexed | any, path: string, value: any): Indexed | any => {
  if (Object.prototype.toString.call(path).slice(8, -1) !== 'String') {
    throw new Error('path must be string');
  }

  if (Object.prototype.toString.call(object).slice(8, -1) !== 'Object') {
    return object;
  }

  const objectByPath = path.split('.').reduceRight((acc, key) => ({
    [key]: acc,
  }), value);

  return merge(object, objectByPath);
};
