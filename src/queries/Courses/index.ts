import useApi from './api';

export * from './useAddStudentIntoCourse';
export * from './useAddTeachersIntoCourse';
export * from './useGetAllCourses';
export * from './useGetAllCoursesBySemesterId';
export * from './useUpdateConstraint';
export * from './useUpdateCourseInformation';
export * from './useGetCourseDetail';
export * from './useUploadImageInCourse';


export const courseApis = useApi();
