import { useGetTeacherCalendarByTeacherIdAndSemesterId } from '@queries/Timetable/useGetTeacherCalendarByTeacherIdAndSemesterId';

type CalendarModelProps = {
  teacherId: string;
  semesterId: string;
};

export const useCalendarModel = ({ semesterId, teacherId }: CalendarModelProps) => {
  const {
    teacherCalendar,
    isPending,
    isError,
    error,
    onGetTeacherTimetables,
    handleInvalidateTimetables,
  } = useGetTeacherCalendarByTeacherIdAndSemesterId({
    semesterId: semesterId,
    teacherId: teacherId,
  });

  return {
    states: {
      teacherCalendar,
      isPending,
      isError,
      error,
    },
    handlers: {
      onGetTeacherTimetables,
      handleInvalidateTimetables,
    },
  };
};
