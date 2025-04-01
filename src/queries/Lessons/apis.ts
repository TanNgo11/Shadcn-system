import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '..';

const useLessonsApis = (baseURL = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getLessonsByCourseId = (courseId: string) => {
    return privateApi.get(`/api/v1/lessons/courses/${courseId}`);
  };

  const updateLessonsByCourseId = (payload: FormData) => {
    const requestJson = payload.get('request');
    if (!requestJson) {
      throw new Error('Request field is missing in FormData');
    }
    const requestObj = JSON.parse(requestJson as string);
    const lessonId = requestObj.id;
    return privateApi.put(`/api/v1/lessons/${lessonId}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return {
    updateLessonsByCourseId,
    getLessonsByCourseId,
  };
};

export default useLessonsApis;
