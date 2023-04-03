import { capitalizeString } from './capitalizeString';

export const toCamelCase = (value:string): string => value.split(' ')
  .map((item, index) => (index ? capitalizeString(item) : item))
  .join('').split('-')
  .map((item, index) => (index ? capitalizeString(item) : item))
  .join('')
  .split('_')
  .map((item, index) => (index ? capitalizeString(item) : item))
  .join('');
