import { useGetProfileByUserId } from '@queries/Auth/useGetProfileByUserId';
import { useGetTimetablesByCourseId } from '@queries/Timetable/useGetTimetablesByCourseId';

type TimeTableModalProps = {
  courseId: string;
};
export const useTimeTableModal = ({ courseId }: TimeTableModalProps) => {
  const { timetables } = useGetTimetablesByCourseId({ courseId });
  const { profile } = useGetProfileByUserId();
  return {
    state: {
      timetables,
      profile,
    },
    handlers: {},
  };
};
