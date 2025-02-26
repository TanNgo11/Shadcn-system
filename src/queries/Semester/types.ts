export type SemesterResponse = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  academicYear: AcademicYear;
};

type AcademicYear = {
  id: number;
  startYear: string;
  endYear: string;
};

