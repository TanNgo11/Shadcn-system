export type SemesterResponse = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  semesterActive: boolean;
  registrationOpen: boolean;
  academicYear: AcademicYear;
};

type AcademicYear = {
  id: number;
  startYear: string;
  endYear: string;
};

export interface CourseResponse {
  name: string;
  imageUri: string;
  code: string;
  credit: string;
  teacherIds: string[];
  studentIds: string[];
}

