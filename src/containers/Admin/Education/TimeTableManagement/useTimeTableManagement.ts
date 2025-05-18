import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { CourseResponse } from '../CourseManagement/helpers';

export const useTimeTableManagement = () => {
  const { close, isOpen, open, toggle } = useModal();
  const [selectedCourse, setSelectedCourse] = useState<CourseResponse>();
  const handleEditCourseConstraint = (course: CourseResponse) => {
    setSelectedCourse(course);
    open();
  };

  return {
    state: {
      isOpen,
      open,
      close,
      toggle,
      selectedCourse,
    },
    handlers: {
      handleEditCourseConstraint,
    },
  };
};
