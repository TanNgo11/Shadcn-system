import { z } from 'zod';

export interface TeacherResponse {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  entityId: string;
  teacherId: string;
  username: string;
  hireDate: string;
  departmentId: string;
  salary: number;
  officeHours: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  email: string;
  avatarPath: string | null;
}

export enum TeacherStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

// This is the payload that will be sent to the server when creating or updating a teacher
export interface TeacherPayload extends Omit<TeacherResponse, 'id'> {
  id?: number;
  password: string;
  rePassword: string;
}

// This is the initial value for the teacher form
export const initTeacherValue: TeacherPayload = {
  id: 0,
  createdDate: '',
  modifiedDate: '',
  createdBy: '',
  modifiedBy: '',
  entityId: '',
  teacherId: '',
  username: '',
  hireDate: '',
  departmentId: '',
  salary: 0,
  officeHours: '',
  address: '',
  emergencyContactName: '',
  emergencyContactPhoneNumber: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  avatarPath: '',
  phoneNumber: '',
  password: '',
  rePassword: '',
};

// The teacher form schema is used to validate the teacher form
export const teacherRegisterFromSchema = z.object({
  id: z.number().optional(),
  teacherId: z.string().optional(),
  username: z
    .string()
    .min(6, { message: 'Username must be at least 6 characters long' })
    .max(50)
    .optional(),
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50)
    .optional(),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .max(50)
    .optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  dateOfBirth: z.string().optional(),
  hireDate: z.string().optional(),
  departmentId: z.string().optional(),
  salary: z.number().optional(),
  officeHours: z.string().optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' })
    .optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' })
    .optional(),
  avatarPath: z.string().nullable().optional(),
  nationality: z.string().optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character' })
    .optional(),
  rePassword: z.string().optional(),
});
