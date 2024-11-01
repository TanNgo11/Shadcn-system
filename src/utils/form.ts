import dayjs from 'dayjs';

export const removeNullKeys = (obj: { [s: string]: any } | ArrayLike<any>) => {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v !== null && v !== ''));
};

export const formatDate = (value: string | number | Date | dayjs.Dayjs, format = 'MM/DD/YYYY') => {
  if (!value) return '';
  return dayjs(value).format(format);
};
