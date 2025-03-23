import { User } from '@/zustand/auth/types';

export const formatFullName = (user: User) => {
  return `${user.firstName} ${user.middleName} ${user.lastName}`;
};

export const formatFullNameWithFields = (
  firstName: string,
  middleName: string,
  lastName: string,
) => {
  return `${firstName} ${middleName} ${lastName}`;
};
