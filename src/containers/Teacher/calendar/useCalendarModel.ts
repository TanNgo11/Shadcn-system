import { useGetCurrentOpenSemester } from '@queries/Semester/useGetCurrentOpenSemester';
import { useGetSemesterList } from '@queries/Semester/useGetSemesterList';
import { TimetableResponse } from '@queries/Timetable/types';
import { useGetTeacherCalendarByTeacherIdAndSemesterId } from '@queries/Timetable/useGetTeacherCalendarByTeacherIdAndSemesterId';
import React, { useEffect } from 'react';

type CalendarModelProps = {
  teacherId: string;
  semesterId?: string;
};

export const useGetCalendar = ({ teacherId }: CalendarModelProps) => {
  const [selectedSemester, setSelectedSemester] = React.useState<string>('');

  const { semester } = useGetCurrentOpenSemester();
  const { semesters, setParams } = useGetSemesterList();

  const semestersOptions = semesters.map((semester) => ({
    label: semester?.name,
    value: semester?.id,
  }));

  const { teacherCalendar, isPending, isError, error } =
    useGetTeacherCalendarByTeacherIdAndSemesterId({
      semesterId: selectedSemester,
      teacherId: teacherId,
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
      teacherCalendar,
      selectedSemester,
      semester,
      semestersOptions,
      isPending,
      isError,
      error,
    },
    handlers: {
      setSelectedSemester,
    },
  };
};
