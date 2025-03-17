export const isEmpty = (value: any): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value === '') ||
  (Array.isArray(value) && value.length === 0);

export const isNumeric = (num: any) => !isNaN(num);


export const NO_DATA = '';