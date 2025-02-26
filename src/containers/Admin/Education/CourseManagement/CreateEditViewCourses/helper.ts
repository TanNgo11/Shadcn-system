import { z } from 'zod';
import { BaseCoursePayload, BaseCourseResponse } from '../helpers';
//import { BaseCoursePayload, BaseCourseResponse } from '../helpers';

// export enum AcademicYearStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
//   DELETED = 'DELETED',
// }

// This is the payload that will be sent to the server when creating or updating a AcademicYear
export interface CoursePayload extends Omit<BaseCourseResponse, 'id'> {
  id?: number;
}

// This is the initial value for the AcademicYear form
export const initBaseCourseValue: BaseCoursePayload = {
  code: '',
  name: '',
  description: '',
  credit: 0,
  imageUri: '',
  status: '',
  //requiredBaseCourses: [],
};

// The AcademicYear form schema is used to validate the AcademicYear form
export const baseCourseCreationSchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  credit: z.string().optional(),
  imageUri: z.string().optional(),
  status: z.string().optional(),
  requiredBaseCourses: z.array(z.object({ code: z.string() })).optional(),
});
