export interface CreateStudentPayload {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dataOfBirth: string;
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
