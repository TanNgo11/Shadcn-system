import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '..';
import { UpdateLessonPayload } from './types';

const useLessonsApis = (baseURL = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getLessonsByCourseId = (courseId: string) => {
    return privateApi.get(`/api/v1/lessons/courses/${courseId}`);
  };

  const updateLessonsByCourseId = (payload: UpdateLessonPayload) => {
    return privateApi.put(`/api/v1/lessons/${payload?.id}`, payload);
  };

  return {
    updateLessonsByCourseId,
    getLessonsByCourseId,
  };
};

export default useLessonsApis;
