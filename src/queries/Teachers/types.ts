export interface CrudTeacherPayload {
  username: string;
  password: string;
  email: string;
  status?: string;
  role?: string;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  departmentId: string;
  salary: number;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  hireDate: string;
  officeHours?: string;
}

export interface TeacherResponse {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  entityId: string;
  teacherId: string;
  username: string;
  hireDate: string;
  departmentId: string;
  salary: number;
  officeHours: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  email: string;
  avatarPath: string;
  nationality: string;
  major: string;
  enrollmentYear: string;
  graduationYear: string;
}

export enum TeacherStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}
