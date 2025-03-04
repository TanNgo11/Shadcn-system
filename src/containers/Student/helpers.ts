export interface CourseResponse {
  name: string;
  imageUri: string;
  code: string;
  credit: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  remain: number;
  teacherIds: string[];
  studentIds: string[];
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
