import { CreateStudentPayload } from '@/queries/Auth/types';
import dayjs from 'dayjs';
import { z } from 'zod';

export interface StudentResisterForm {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}

export const studentRegisterInitialState: StudentResisterForm = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
};

export const studentRegisterFormSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
  email: z.string().nonempty('Email is required'),
  phone: z.string().nonempty('Phone is required'),
  dateOfBirth: z.string().nonempty('Date of Birth is required'),
  gender: z.string().nonempty('Gender is required'),
});

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export const genderOptions = [
  { label: 'Male', value: Gender.MALE },
  { label: 'Female', value: Gender.FEMALE },
  { label: 'Other', value: Gender.OTHER },
];

export const formatToStudentPayload = (form: StudentResisterForm): CreateStudentPayload => {
  return {
    ...form,
    dateOfBirth: dayjs(form.dateOfBirth).format('DD-MM-YYYY'),
  };
};
