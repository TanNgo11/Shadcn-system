export interface CourseResponse {
  name: string;
  imageUri: string;
  teacherIds: string[];
  studentIds: string[];
  departments: Department[];
}

export interface BaseCourseResponse {
  code: string;
  name: string;
  imageUri: string | null;
  description: string;
  credit: number;
  status: string;
  requiredBaseCourses: BaseCourse[];
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
