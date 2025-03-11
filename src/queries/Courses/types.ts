import { BaseCourse } from '@/containers/Admin/Education/CourseManagement/helpers';

export interface CourseActionPayload {
  departmentId: string;
  courseId: string;
  studentIds?: string[];
  teacherIds?: string[];
  semesterIds?: string[];
}

export interface FileUploadPayload {
  departmentId: string;
  courseId: string;
  file: File[];
}

export interface ImageUploadPayload {
  departmentId: string;
  courseId: string;
  file: File;
}

export interface BaseCourseResponse {
  id: string;
  code: string;
  name: string;
  imageUri: string;
  description: string;
  credit: number;
  status: string;
  requiredBaseCourses: BaseCourse[];
}

export interface TeacherResponse {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  dateOfBirth: string;
  address: string;
  email: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  avatarPath?: string | null;
  teacherId: string;
  username: string;
  hireDate: string;
  departmentId: string;
  salary: number;
  officeHours: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
}
