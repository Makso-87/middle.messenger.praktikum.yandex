import { getType } from './getType';

export type PlainObject<T = unknown> = {
  [key in string]?: T;
};

export const isPlainObject = (value: unknown | null): value is PlainObject => getType(value) === 'Object';
