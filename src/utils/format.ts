import { User } from '@/zustand/auth/types';

export const formatFullName = (user: User) => {
  return `${user.firstName} ${user.middleName} ${user.lastName}`;
};
