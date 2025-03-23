export type TeacherReferenceFormValue = {
  id: number;
  contactLink: string;
  officeLocation: string;
  officeHours: string;
  otherInformation: string;
};

export const initialTeacherReferenceFormValue: TeacherReferenceFormValue = {
  id: 0,
  contactLink: '',
  officeLocation: '',
  officeHours: '',
  otherInformation: '',
};

export const formatToTeacherReferencePayload = (data: TeacherReferenceFormValue) => {
  return {
    ...data,
  };
};
