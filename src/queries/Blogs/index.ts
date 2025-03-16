import useApis from './api';

export * from './useGetAllBlogs';
export * from './types';
export * from './useAddBlog';
export * from './useUpdateBlog';
export * from './useGetBlogById';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const blogApis = useApis();
