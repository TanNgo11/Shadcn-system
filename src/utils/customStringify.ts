import { isEmpty } from './validations';

export const customStringify = (
  params: { [key: string]: number | number[] | string | string[] | boolean | undefined },
  excludeKey: string[] = [],
) => {
  if (!params) return '';

  return Object.entries(params)
    .filter(([key, value]) => !isEmpty(value) || excludeKey.includes(key))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${encodeURIComponent(String(item))}`).join('&');
      } else if (value !== undefined) {
        return `${key}=${encodeURIComponent(String(value))}`;
      }
      return '';
    })
    .filter(Boolean)
    .join('&');
};
