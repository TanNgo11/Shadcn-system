import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS, BlogsPayload, GetPropertiesParams } from '..';
import { stringify } from '@/utils';

const useApis = (baseURL = API_URLS.BLOG) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getAllBlogs = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/posts?${stringify(params)}`);
  };

  const createBlogs = (payload: BlogsPayload) => {
    const formData = new FormData();

    const requestPayload = {
      title: payload.title,
      content: payload.content,
      allowComments: payload.allowComments,
      userId: payload.userId,
      tags: payload.tags || [],
    };
    formData.append('request', JSON.stringify(requestPayload));

    if (payload.thumbnail) {
      formData.append('thumbnail', payload.thumbnail);
    }

    return privateApi.post('/api/v1/posts/create-post', formData);
  };

  return {
    getAllBlogs,
    createBlogs,
  };
};

export default useApis;
