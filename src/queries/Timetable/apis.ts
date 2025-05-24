import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '..';

const useTimetableApis = (baseURL = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getTimetablesByCourseId = (courseId: string) => {
    return privateApi.get(`/api/v1/timetables/courses/${courseId}`);
  };

  return {
    getTimetablesByCourseId,
  };
};

export default useTimetableApis;
