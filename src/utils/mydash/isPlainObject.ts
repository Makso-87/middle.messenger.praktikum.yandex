export type PlainObject<T = any> = {
  [key in string]: T;
};

export const isPlainObject = (value: any): value is PlainObject => Object.prototype.toString.call(value).slice(8, -1) === 'Object';
