import { TimetableResponse } from '@queries/Timetable/types';

export interface Event {
  eventId: string;
  startTime: Date;
  endTime: Date;
  title: string;
  backgroundColor: string;
}

export function mapTimetablesToEvents(timetables: TimetableResponse[]): Event[] {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFA500'];
  const events: Event[] = [];

  timetables.forEach((timetable, index) => {
    const course = timetable.course;
    const courseName = course.name || course.code || 'Unknown Course';
    const color = colors[index % colors.length];

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

      const title = `${courseName} (${room.code || 'No Room'}) - ${teacher?.teacherId || 'No Teacher'}`;

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
