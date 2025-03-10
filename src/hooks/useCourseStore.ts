import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CourseDetails {
  name?: string;
  description?: string;
  avatar?: string;
  studentId?: string;
  courseId?: string;
  courseCode?: string;
}

interface CourseStore {
  courseDetail: CourseDetails | null;
  setCourseDetail: (detail: CourseDetails) => void;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      courseDetail: null as CourseDetails | null,
      setCourseDetail: (course) => set({ courseDetail: course }),
    }),
    {
      name: 'course-storage',
    },
  ),
);
