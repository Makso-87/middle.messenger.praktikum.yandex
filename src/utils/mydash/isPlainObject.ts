export type PlainObject<T = unknown> = {
  [key in string]: T;
};

export const isPlainObject = (value: unknown): value is PlainObject => Object.prototype.toString.call(value).slice(8, -1) === 'Object';
