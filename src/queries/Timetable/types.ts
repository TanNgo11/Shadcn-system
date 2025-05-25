export type TimetableResponse = {
  id: number;
  course: CourseResponse;
  daysOfWeek: string[];
  classSessions: ClassSessionResponse[];
};

export type CourseResponse = {
  id: string;
  name: string;
  imageUri: string;
  code: string;
  credit: number;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  remain: number;
  courseInformation: string;
  assessmentPlan: string;
  learningMaterialsAndOutcomes: string;
  teacher: any;
  studentIds: any;
  departments: any;
  processStatus: string;
};

export type ClassSessionResponse = {
  id: number;
  room: RoomResponse;
  sessionDate: string;
  teacher: TeacherResponse;
  timeSlot: TimeSlotResponse;
  weekNumber: any;
  sessionType: any;
  notes: any;
  replacedBy: any;
  exception: boolean;
};

export type RoomResponse = {
  id: number;
  code: string;
  name: string;
  capacity: number;
  roomType: string;
  status: string;
  buildingCode: any;
};

export type TeacherResponse = {
  id: string;
  teacherId: string;
  firstName: any;
  middleName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  avatarPath: any;
  contactLink: any;
  officeLocation: any;
  officeHours: any;
  otherInformation: any;
};

export type TimeSlotResponse = {
  id: number;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
