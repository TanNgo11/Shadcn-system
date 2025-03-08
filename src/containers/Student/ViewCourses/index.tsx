import CoursesPage from '@/containers/CoursesPage';
import { useGetApprovedCoursesForStudentByStudentId } from '@/queries/Registration/useGetApprovedCoursesForStudentByStudentId';
import { useGetCurrentOpenSemester } from '@/queries/Semester/useGetCurrentOpenSemester';
import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import { useEffect } from 'react';

export default function ViewCourses() {
  const { student, handleInvalidCurrentStudent } = useGetCurrentStudentInfo();
  const { semester, handleInvalidCurrentOpenSemester } = useGetCurrentOpenSemester();


  useEffect(() => {
    if (student?.studentId || semester?.id) {
      handleInvalidCurrentOpenSemester();
      handleInvalidCurrentStudent();
    }
  }, [student?.studentId, semester?.id]);


  const { approvedCourses, handleInvalidateApprovedCourses } =
    useGetApprovedCoursesForStudentByStudentId({
      studentId: student?.studentId || '',
      semesterId: semester?.id || '',
      tableParams: {
        current: 1,
        pageSize: 10,
      },
    });

  return (
    <CoursesPage registrations={approvedCourses} />
  );
}
