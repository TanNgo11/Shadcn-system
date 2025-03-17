export interface CRUAdminPayload {
  username: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  address: string;
  gender: string;
  phoneNumber: string;
  hireDate: string;
  departmentId: string;
  workSchedule: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
}
export interface AdminResponse {
  id: string;
  adminId: string;
  username: string;
  hireDate: string;
  departmentId: string;
  workSchedule: string;
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
}
