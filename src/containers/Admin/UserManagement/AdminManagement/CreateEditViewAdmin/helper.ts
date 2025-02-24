import { z } from 'zod';

export interface AdminResponse {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  adminId: string;
  username: string;
  middleName: string;
  hireDate: string;
  departmentId: string;
  workSchedule: string;
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

export interface AdminPayload extends Omit<AdminResponse, 'id'> {
  id?: number;
  password: string;
  repassword: string;
}

export const initAdminValue: AdminPayload = {
  id: 0,
  createdDate: '',
  modifiedDate: '',
  createdBy: '',
  modifiedBy: '',
  adminId: '',
  username: '',
  middleName: '',
  hireDate: '',
  departmentId: '',
  workSchedule: '',
  address: '',
  emergencyContactName: '',
  emergencyContactPhoneNumber: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  gender: '',
  email: '',
  avatarPath: null,
  password: '',
  repassword: '',
};

export const adminRegisterFormSchema = z.object({
  id: z.number().optional(),
  adminId: z.string().optional(),
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
  dateOfBirth: z
    .string()
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' })
    .optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  departmentId: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: 'Emergency phone number must be 10 digits' })
    .optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
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
  workSchedule: z.string().optional(),
  hireDate: z.string().optional(),
});

