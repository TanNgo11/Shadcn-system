export type LessonResponse = {
  id: number;
  title: string;
  courseId: number;
  description: string;
  published: boolean;
};
export interface UpdateLessonPayload {
  id?: number;
  title: string;
  description: string;
}
