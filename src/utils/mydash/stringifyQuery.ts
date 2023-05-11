import { isPlainObject, PlainObject } from './isPlainObject';
import { isArray } from './isArray';
import { getType } from './getType';
import { FormRequestData } from '../onSubmitForm/onSubmitForm';

const getAmpersand = (array: [key: string, value: unknown][], index: number) => `${array.length - 1 !== index ? '&' : ''}`;

const getKey = (key: string, parentKey: string) => (parentKey ? `${parentKey}[${key}]` : key);

const handleArray = (key: string, arr: []): string => {
  if (!arr.length) {
    return '';
  }

  return arr.reduce((acc: string, item: PlainObject, index: number) => {
    if (isArray(item)) {
      return `${acc}${handleArray(getKey(String(index), key), item)}`;
    }

    return `${acc}${getKey(String(index), key)}=${item}${getAmpersand(arr, index)}`;
  }, '');
};

const handleObject = (key: string, obj: PlainObject): string => Object.entries(obj).reduce((acc: string, [keyItem, value]) => {
  if (isPlainObject(value)) {
    return `${acc}${handleObject(getKey(keyItem, key), value)}`;
  }

  return `${acc}${getKey(keyItem, key)}=${value}`;
}, '');

export const queryStringify = (data: FormRequestData): string => {
  if (getType(data) !== 'Object') {
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
