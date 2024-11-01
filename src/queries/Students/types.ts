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
  city: any;
  phoneNumber: any;
  gender: string;
  address: any;
  grade: any;
  enrollmentDate: any;
  major: any;
  guardianName: any;
  guardianPhoneNumber: any;
  email: string;
  avatarPath: any;
  nation: any;
  religion: any;
  citizenId: any;
  faculty: any;
  degreeLevel: any;
  schoolYear: any;
}
