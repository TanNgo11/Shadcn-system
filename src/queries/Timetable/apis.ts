import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS, GetPropertiesParams } from '..';
import { stringify } from '@/utils';

const useTimetableApis = (baseURL = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getTimetablesByCourseId = (courseId: string) => {
    return privateApi.get(`/api/v1/timetables/courses/${courseId}`);
  };

  const getStudentTimetable = (param: GetPropertiesParams) => {
    const { studentId, ...restParams } = param;
    return privateApi.get(`/api/v1/timetables/students/${studentId}?${stringify(restParams)}`);
  };

  const getStudentCalendarByStudentIdAndSemesterId = (semesterId: string, studentId: string) => {
    return privateApi.get(`/api/v1/timetables/students/${studentId}/semesters/${semesterId}`);
  };
  return {
    getTimetablesByCourseId,
    getStudentCalendarByStudentIdAndSemesterId,
    getStudentTimetable,
  };
};

export default useTimetableApis;
