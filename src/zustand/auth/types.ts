export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  address: string;
  dateOfBirth: Date;
  status: UserStatus;
  avatar: string;
  roles?: Role;
};
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}
