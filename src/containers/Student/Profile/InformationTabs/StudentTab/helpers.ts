import { DepartmentResponse } from '@queries/Departments/types';
import { StudentProfileResponse } from '@queries/Students/types';

export const getProcessedStudentData = (
  student?: StudentProfileResponse,
  departments?: DepartmentResponse[],
) => [
  {
    label: 'Full Name',
    value:
      `${student?.firstName ?? 'N/A'} ${student?.middleName ?? ''} ${student?.lastName ?? 'N/A'}`.trim(),
  },
  { label: 'Username', value: student?.username ?? 'N/A' },
  { label: 'Phone Number', value: student?.phoneNumber ?? 'N/A' },
  { label: 'Date of Birth', value: student?.dateOfBirth ?? 'N/A' },
  { label: 'Address', value: student?.address ?? 'N/A' },
  { label: 'Email', value: student?.email ?? 'N/A' },
  { label: 'Gender', value: student?.gender ?? 'N/A' },
  { label: 'Student ID', value: student?.studentId ?? 'N/A' },
  {
    label: 'Faculty',
    value:
      departments?.find((dept) => dept.id.toString() === student?.departmentId)?.departmentName ??
      'N/A',
  },
  { label: 'Guardian Name', value: student?.guardianName ?? 'N/A' },
  { label: 'Guardian Phone Number', value: student?.guardianPhoneNumber ?? 'N/A' },
  { label: 'Nationality', value: student?.nationality ?? 'N/A' },
  // { label: 'Religion', value: student?.religion ?? 'N/A' },
  // { label: 'Citizen ID', value: student?.citizenId ?? 'N/A' },
  // { label: 'Major', value: student?.faculty ?? 'N/A' },
  { label: 'Degree Level', value: student?.degreeLevel ?? 'N/A' },
  { label: 'School Year', value: student?.schoolYear ?? 'N/A' },
  { label: 'Enrollment Date', value: student?.enrollmentDate ?? 'N/A' },
];
