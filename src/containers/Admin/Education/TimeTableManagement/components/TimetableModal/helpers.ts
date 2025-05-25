import { TimetableResponse } from '@queries/Timetable/types';

export interface Event {
  eventId: string;
  startTime: Date;
  endTime: Date;
  title: string;
  backgroundColor: string;
}

export enum TimeTableModalType {
  LAB = 'LAB',
  LECTURE = 'LECTURE',
}
export function mapTimetablesToEvents(timetables: TimetableResponse[]): Event[] {
  const events: Event[] = [];

  timetables.forEach((timetable, index) => {
    const course = timetable.course;
    const courseName = course.name || course.code || 'Unknown Course';
    const color =
      timetable?.classSessions[index]?.sessionType === TimeTableModalType.LAB
        ? `#fcebeb`
        : `#AAAAFF`;

    timetable.classSessions.forEach((session) => {
      const timeSlot = session.timeSlot;
      const room = session.room;
      const teacher = session.teacher;

      const sessionDate = new Date(timeSlot.date);
      const [startHours, startMinutes, startSeconds] = timeSlot.startTime.split(':').map(Number);
      const [endHours, endMinutes, endSeconds] = timeSlot.endTime.split(':').map(Number);

      const startTime = new Date(
        sessionDate.getFullYear(),
        sessionDate.getMonth(),
        sessionDate.getDate(),
        startHours,
        startMinutes,
        startSeconds || 0,
      );

      const endTime = new Date(
        sessionDate.getFullYear(),
        sessionDate.getMonth(),
        sessionDate.getDate(),
        endHours,
        endMinutes,
        endSeconds || 0,
      );
      const title = `${courseName}
      Room: ${room.name ?? 'No Room'}
      Teacher: ${teacher?.firstName ?? ' '} ${teacher?.lastName ?? ' '}
      `;

      const event: Event = {
        eventId: `${timetable.id}-${session.id}`,
        startTime,
        endTime,
        title,
        backgroundColor: color,
      };

      events.push(event);
    });
  });

  return events;
}
