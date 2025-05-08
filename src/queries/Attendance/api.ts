import {useHttpPrivateRequest} from "@/services/useHttpPrivateRequest.ts";
import {TeacherCheckAttendance} from "@queries/Attendance/types.ts";
import {API_URLS} from "..";

const useApis = (baseURL = API_URLS.COURSE) => {
	const privateApi = useHttpPrivateRequest(baseURL);
	const getAttendanceListByClassSessionId = (classSessionId: string) => {
		return privateApi.get(`api/v1/attendances/class-session/${classSessionId}`);
	};
	const teacherCheckAttendance = (payload: TeacherCheckAttendance) => {
		return privateApi.post(`/api/v1/attendances/teacher`, payload);
	};
	const getAllClassSessions = (courseId: string) => {
		return privateApi.get(`api/v1/attendances/class-sessions/course/${courseId}`);
	};

	return {
		getAttendanceListByClassSessionId,
		teacherCheckAttendance,
		getAllClassSessions,
	};
};

export default useApis;