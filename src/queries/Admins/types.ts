export interface CreateAdminPayload {
  username: string;
  password: string;
  firstName: string;
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
  studentId: string;
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  phoneNumber: string;
  gender: string;
  address: string;
  gpa: number;
  enrollmentDate: string;
  major: string;
  guardianName: string;
  guardianPhoneNumber: string;
  email: string;
  avatarPath: string;
  nation: string;
  religion: string;
  citizenId: string;
  faculty: string;
  degreeLevel: string;
  schoolYear: string;
  present: string;
}
