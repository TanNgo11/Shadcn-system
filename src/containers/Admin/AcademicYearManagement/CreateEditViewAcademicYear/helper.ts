import { z } from 'zod';

export interface AcademicYearResponse {
  id: number;
  startYear: string;
  endYear: string;
}

// export enum AcademicYearStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
//   DELETED = 'DELETED',
// }

// This is the payload that will be sent to the server when creating or updating a AcademicYear
export interface AcademicYearPayload extends Omit<AcademicYearResponse, 'id'> {
  id?: number;
}

// This is the initial value for the AcademicYear form
export const initAcademicYearValue: AcademicYearPayload = {
  startYear: '',
  endYear: '',
};

// The AcademicYear form schema is used to validate the AcademicYear form
export const academicYearRegisterFormSchema = z.object({
  startYear: z.string().min(4, { message: 'Start year is required' }),
  endYear: z.string().min(4, { message: 'End year is required' }),
});
