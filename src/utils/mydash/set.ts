import { Indexed, merge } from './merge';
import { getType } from './getType';

export const set = (object: Indexed, path: string, value: unknown): Indexed | unknown => {
  if (getType(path) !== 'String') {
    throw new Error('path must be string');
  }

  if (getType(object) !== 'Object') {
    return object;
  }

  const objectByPath = path.split('.').reduceRight((acc, key) => ({
    [key]: acc,
  }), value as Indexed);

  return merge(object, objectByPath);
};
