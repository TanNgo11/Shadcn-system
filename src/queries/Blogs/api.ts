import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS, BlogsPayload, GetPropertiesParams } from '..';
import { stringify } from '@/utils';

const useApis = (baseURL = API_URLS.BLOG) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getAllBlogs = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/posts?${stringify(params)}`);
  };

  const createBlogs = (payload: BlogsPayload) => {
    return privateApi.post('/api/v1/posts/create-web-post', payload);
  };

  const getBlogById = (id: string) => {
    return privateApi.get(`/api/v1/posts/${id}`);
  };

  const updateBlog = (id: string, payload: BlogsPayload) => {
    return privateApi.put(`/api/v1/posts/${id}`, payload);
  };

  return {
    getAllBlogs,
    createBlogs,
    getBlogById,
    updateBlog,
  };
};

export default useApis;
