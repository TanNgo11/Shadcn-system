export interface CreateStudentPayload {
  studentId?: string;
  password?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  gender?: string;
  gpa?: number;
  enrollmentDate?: string;
  departmentId?: string;
  guardianName?: string;
  guardianPhoneNumber?: string;
  email?: string;
  nationality?: string;
  religion?: string;
  degreeLevel?: string;
  academicYearId?: string;
  present?: string;
  avatarPath?: string | null;
}
export interface StudentResponse {
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
