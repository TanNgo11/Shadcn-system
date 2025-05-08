import { DayOfWeek } from './keys';

export type TeacherCheckAttendance = {
  classSessionId: number;
  attendanceRecords: StudentAttendanceRecord[];
};

export type StudentAttendanceRecord = {
  studentId: number;
  status: string;
  notes: string;
};

export type AttendanceResponse = {
  studentId: number;
  studentName: string;
  classSessionId: number;
  attendanceStatus: string;
  notes: string;
  date: string;
};

export type TimetableResponse = {
  id: number;
  attendanceRecords: StudentAttendanceRecord[];
  daysOfWeek: DayOfWeek;
};

export type TimeSlotResponse = {
  id: number;
  date: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
};

export type SessionResponse = {
  id: number;
  timetable: TimetableResponse;
  roomId: number;
  teacherId: number;
  timeSlot: TimeSlotResponse;
  sessionDate: Date;
  weekNumber: number;
  sessionType: string;
  notes: string;
  isException: boolean;
  status: string;
  replacedById?: number;
  replacedBySessionId?: number;
};

export type StudentReference = {
  studentId: number;
  name: string;
};
