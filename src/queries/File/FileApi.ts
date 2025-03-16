import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '@queries/keys';

const FileApis = (baseURL = API_URLS.FILE) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const uploadFile = (payload: FormData) => {
    return privateApi.post(`/upload`, payload, {
      headers: {
      'Content-Type': 'multipart/form-data'
      }
    });
  };

  return {
    uploadFile,
  };
};
export default FileApis;
