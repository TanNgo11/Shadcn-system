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
  id: string;
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
  processStatus: string;
}
