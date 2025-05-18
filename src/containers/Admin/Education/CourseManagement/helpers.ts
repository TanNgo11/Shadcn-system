export interface CourseResponse {
  id: string,
  name: string;
  imageUri: string;
  code: string;
  credit: string;
  teacherIds: string[];
  studentIds: string[];
  processStatus: string;
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

export interface BaseCoursePayload {
  code?: string;
  name?: string;
  imageUri?: string;
  description?: string;
  credit?: number;
  status?: string;
  //requiredBaseCourses?: BaseCourse[];
}

export interface Department {
  id: number;
  departmentName: string;
  departmentCode: string;
}

export interface BaseCourse {
  code: string;
  name: string;
  imageUri: string | null;
  description: string;
  credit: number;
  status: string;
  courses: BaseCourse[];
}

export enum Action {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  VIEW = 'view',
  REMOVE = 'remove',
}
