import { z } from "zod";

export const initialConstraintValue = {
  numsOfTimetable: 1,
  maxStudents: 1,
};

export const constrainFormSchema = z.object({
  numsOfTimetable: z
    .number()
    .min(1, { message: 'Number of timetables must be at least 1' }),
  maxStudents: z
    .number()
    .min(1, { message: 'Max students must be at least 1' }),
});