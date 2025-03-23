import { useGetCoursesByCurrentTeacherAndSemesterId } from '@queries/Courses/useGetCoursesByCurrentTeacherAndSemesterId';
import { useGetSemesterList } from '@queries/Semester/useGetSemesterList';
import React, { useEffect } from 'react';

const useListCourses = () => {
  const [selectedSemester, setSelectedSemester] = React.useState<string>('');
  const { semesters, setParams } = useGetSemesterList({
    defaultParams: {
      current: 1,
      pageSize: 9999,
    },
  });
  const semestersOptions = semesters.map((semester) => ({
    label: semester.name,
    value: semester.id,
  }));
  const { courses } = useGetCoursesByCurrentTeacherAndSemesterId({
    semesterId: selectedSemester,
  });

  useEffect(() => {
    if (semesters.length > 0 && !selectedSemester) {
      setSelectedSemester(semesters[0].id.toString());
    }
  }, [selectedSemester, semesters]);

  return {
    states: {
      courses,
      semesters,
      semestersOptions,
      selectedSemester,
    },
    handlers: {
      setParams,
      setSelectedSemester,
    },
  };
};
export default useListCourses;
