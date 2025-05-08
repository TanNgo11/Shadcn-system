import useApis from './api.ts';

export * from './useGetAttendancesBySessionId.ts';
export * from './useCheckAttendanceForTeacher.ts';
export * from './useGetAllClassSessionsByCourseId.ts';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const attendanceApis = useApis();
