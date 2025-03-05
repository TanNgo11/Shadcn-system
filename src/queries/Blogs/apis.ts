import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS, GetPropertiesParams } from '..';
import { stringify } from '@/utils';

const useApis = (baseURL = API_URLS.BLOG) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getAllBlogs = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/posts?${stringify(params)}`);
  };

  return {
    getAllBlogs,
  };
};

export default useApis;
