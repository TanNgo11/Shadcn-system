import { Present } from '@/queries/Students/types';
import { z } from 'zod';

export interface StudentResponse {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  studentId: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  gpa: number;
  enrollmentDate: string;
  departmentId: string;
  guardianName: string;
  guardianPhoneNumber: string;
  email: string;
  nationality: string;
  religion: string;
  degreeLevel: string;
  academicYearId: string;
  present: Present;
  avatarPath: string | null;
}

export interface StudentPayload extends Omit<StudentResponse, 'id'> {
  id?: number;
  password: string;
  rePassword: string;
}

export const initStudentValue: StudentPayload = {
  id: 0,
  createdDate: '',
  modifiedDate: '',
  createdBy: '',
  modifiedBy: '',
  studentId: '',
  username: '',
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  dateOfBirth: '',
  phoneNumber: '',
  gender: '',
  gpa: 0,
  enrollmentDate: '',
  departmentId: '',
  guardianName: '',
  guardianPhoneNumber: '',
  email: '',
  nationality: '',
  religion: '',
  degreeLevel: '',
  academicYearId: '',
  present: Present.STUDYING,
  avatarPath: null,
  password: '',
  rePassword: '',
};

export const studentRegisterFormSchema = z.object({
  id: z.number().optional(),
  studentId: z.string().optional(),
  username: z
    .string()
    .min(6, { message: 'Username must be at least 6 characters long' })
    .optional(),
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 character long' })
    .optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' })
    .optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  enrollmentDate: z.string().optional(),
  departmentId: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Guardian phone number must be 10 digits' })
    .optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  degreeLevel: z.string().optional(),
  academicYearId: z.string().optional(),
  present: z.string().optional(),
  avatarPath: z.string().nullable().optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character' })
    .optional(),
  repassword: z.string().optional(),
});

export enum AcademicYear {
  'First' = '2020-2024',
}
