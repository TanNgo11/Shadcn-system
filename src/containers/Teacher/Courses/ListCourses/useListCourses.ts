import { useGetCoursesByCurrentTeacherAndSemesterId } from '@queries/Courses/useGetCoursesByCurrentTeacherAndSemesterId';
import { useGetCurrentOpenSemester } from '@queries/Semester/useGetCurrentOpenSemester';
import { useGetSemesterList } from '@queries/Semester/useGetSemesterList';
import React, { useEffect } from 'react';

const useListCourses = () => {
  const [selectedSemester, setSelectedSemester] = React.useState<string>('');

  const { semester } = useGetCurrentOpenSemester();
  const { semesters, setParams } = useGetSemesterList();

  const semestersOptions = semesters.map((semester) => ({
    label: semester.name,
    value: semester.id,
  }));
  const { courses } = useGetCoursesByCurrentTeacherAndSemesterId({
    semesterId: selectedSemester,
  });

  useEffect(() => {
    if (semester) {
      setParams({ academicYearId: semester?.academicYear?.id });
    }
    if (semesters.length > 0 && !selectedSemester) {
      setSelectedSemester(semesters[0].id.toString());
    }
  }, [selectedSemester, semester, semesters, setParams]);

  return {
    states: {
      courses,
      semesters,
      semestersOptions,
      selectedSemester,
    },
    handlers: {
      setSelectedSemester,
    },
  };
};
export default useListCourses;
