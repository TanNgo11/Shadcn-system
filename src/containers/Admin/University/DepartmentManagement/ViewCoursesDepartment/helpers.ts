export interface CourseResponse {
  name: string;
  imageUri: string;
  teacherIds: string[];
  studentIds: string[];
  departments: Department[];
}

export interface Department {
  id: number;
  departmentName: string;
  departmentCode: string;
}
