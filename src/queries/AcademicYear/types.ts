export interface AcademicYearResponse {
  id: string;
  startYear: string;
  endYear: string;
}

export type AcademicYearPayload = {
  startYear: string;
  endYear: string;
};

export type DeleteAcademicYearVariables = {
  id: number;
};

export type UpdateAcademicYearVariables = {
  id: number;
  data: AcademicYearPayload;
};
