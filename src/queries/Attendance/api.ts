import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest.ts';
import { DeleteTimeSlotRequest, TeacherCheckAttendance } from '@queries/Attendance/types.ts';
import { API_URLS, GetPropertiesParams } from '..';

const useApis = (baseURL = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(baseURL);
  const getAttendanceListByClassSessionId = (classSessionId: string) => {
    return privateApi.get(`api/v1/attendances/class-session/${classSessionId}`);
  };
  const teacherCheckAttendance = (payload: TeacherCheckAttendance) => {
    return privateApi.post(`/api/v1/attendances/teacher`, payload);
  };
  const getAllClassSessions = (courseId: string) => {
    return privateApi.get(`api/v1/attendances/class-sessions/course/${courseId}`);
  };
  const getTimeSlotsByTeacherIdAndSemesterId = (teacherId: string, semesterId: string) => {
    return privateApi.get(`/api/v1/time-slots/teachers/${teacherId}/semesters/${semesterId}`);
  };
  const deleteTimeSlotByTeacherIdAndTimeSlotId = (request: DeleteTimeSlotRequest) => {
    return privateApi.delete(`/api/v1/time-slots`, {
      data: request,
    });
  };

  return {
    getAttendanceListByClassSessionId,
    teacherCheckAttendance,
    getAllClassSessions,
    getTimeSlotsByTeacherIdAndSemesterId,
    deleteTimeSlotByTeacherIdAndTimeSlotId,
  };
};

export default useApis;
