import { useGetTimetablesByCourseId } from '@queries/Timetable/useGetTimetablesByCourseId';

type TimeTableModalProps = {
  courseId: string;
};
export const useTimeTableModal = ({ courseId }: TimeTableModalProps) => {
  const { timetables } = useGetTimetablesByCourseId({ courseId });

  return {
    state: {
      timetables,
    },
    handlers: {},
  };
};
