export const getType = (value: unknown) => Object.prototype.toString.call(value).slice(8, -1);
