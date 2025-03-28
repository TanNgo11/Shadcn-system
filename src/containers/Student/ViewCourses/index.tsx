import CoursesPage from '@/containers/CoursesPage';
import { useGetApprovedCoursesForStudentByStudentId } from '@/queries/Registration/useGetApprovedCoursesForStudentByStudentId';
import { useGetCurrentOpenSemester } from '@/queries/Semester/useGetCurrentOpenSemester';
import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import { useEffect } from 'react';

export default function ViewCourses() {
  // call roi`
  const { student, handleInvalidCurrentStudent } = useGetCurrentStudentInfo();
  const { semester, handleInvalidCurrentOpenSemester } = useGetCurrentOpenSemester();

  // useEffect(() => {
  //   if (student?.studentId || semester?.id) {
  //     handleInvalidCurrentOpenSemester();
  //     handleInvalidCurrentStudent();
  //   }
  // }, [student?.studentId, semester?.id]);

  const { approvedCourses, setTableParams, handleInvalidateApprovedCourses } =
    useGetApprovedCoursesForStudentByStudentId({ id: student.id });

  useEffect(() => {
    setTableParams({
      semesterId: semester?.id || 2,
      current: 1,
      pageSize: 10,
    });
  }, [semester]);

  return <CoursesPage registrations={approvedCourses} />;
}
