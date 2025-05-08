type ApiCall = (..._args: any[]) => Promise<any>;
export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      if (response.status >= 200 && response.status < 300) res(response.data);
      if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
        alert('Connection timeout. Please check your network and try again.');
      }
      rej(response.data);
    } catch (err) {
      rej(err);
    }
  });
}

export interface ApiResponseType<T> {
  code: number;
  result: T;
  message?: string;
}

export interface PaginationResponseType<T> {
  current: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  data: T;
}
export type TableParams = {
  skip?: number;
  take?: number;
  order?: string;
  search?: string;
  sort?: string;
  [key: string]: number | boolean | string | string[] | undefined;
};

export type GetPropertiesParams = {
  [key: string]: string | number | string[] | boolean;
};
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}

