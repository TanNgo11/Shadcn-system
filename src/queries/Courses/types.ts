import { BaseCourse } from "@/containers/Admin/Education/CourseManagement/helpers";

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
  code: string;
  name: string;
  imageUri: string;
  description: string;
  credit: number;
  status: string;
  requiredBaseCourses: BaseCourse[];
}
