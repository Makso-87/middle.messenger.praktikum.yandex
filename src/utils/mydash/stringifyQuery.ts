import { isPlainObject, PlainObject } from './isPlainObject';
import { isArray } from './isArray';

const getAmpersand = (array: PlainObject, index: number) => `${array.length - 1 !== index ? '&' : ''}`;

const getKey = (key: string, parentKey: string) => (parentKey ? `${parentKey}[${key}]` : key);

const handleArray = (key: string, arr: PlainObject) => arr.reduce((acc: string, item: PlainObject, index: number) => {
  if (isArray(item)) {
    // return `${acc}${handleArray(`${key}[${index}]`, item)}`;
    return `${acc}${handleArray(getKey(String(index), key), item)}`;
  }

  // return `${acc}${key}[${index}]=${item}${getAmpersand(arr, index)}`;
  return `${acc}${getKey(String(index), key)}=${item}${getAmpersand(arr, index)}`;
}, '');

const handleObject = (key: string, obj: PlainObject): string => Object.entries(obj).reduce((acc: string, [keyItem, value]) => {
  if (isPlainObject(value)) {
    // return `${acc}${handleObject(`${key}[${keyItem}]`, value)}`;
    return `${acc}${handleObject(getKey(keyItem, key), value)}`;
  }

  // return `${acc}${key}[${keyItem}]=${value}`;
  return `${acc}${getKey(keyItem, key)}=${value}`;
}, '');

export const queryStringify = (data: PlainObject): string => {
  if (Object.prototype.toString.call(data).slice(8, -1) !== 'Object') {
    throw new Error('input must be an object');
  }

  const dataEntries = Object.entries(data);

  return dataEntries.reduce((acc, [key, value], index) => {
    if (isArray(value)) {
      return `${acc}${handleArray(key, value)}${getAmpersand(dataEntries, index)}`;
    }

    if (isPlainObject(value)) {
      return `${acc}${handleObject(key, value)}${getAmpersand(dataEntries, index)}`;
    }

    return `${acc}${key}=${value}${getAmpersand(dataEntries, index)}`;
  }, '');
};
