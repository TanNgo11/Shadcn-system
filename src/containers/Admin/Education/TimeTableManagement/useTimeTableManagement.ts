import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { CourseResponse } from '../CourseManagement/helpers';

export const useTimeTableManagement = () => {
  const { close, isOpen, open, toggle } = useModal();
  const [selectedCourse, setSelectedCourse] = useState<CourseResponse>();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isViewTimeTableOpen, setIsViewTimeTableOpen] = useState(false);
  const [isViewEditCourseConstraint, setIsViewEditCourseConstraint] = useState(false);
  const handleEditCourseConstraint = (course: CourseResponse) => {
    setSelectedCourse(course);
    open();
    setIsViewEditCourseConstraint(true);
    setIsViewTimeTableOpen(false);
  };

  const handleViewTimeTable = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsViewTimeTableOpen(true);
    setIsViewEditCourseConstraint(false);
    open();
  };

  return {
    state: {
      isOpen,
      open,
      close,
      toggle,
      selectedCourse,
      isViewTimeTableOpen,
      isViewEditCourseConstraint,
      selectedCourseId,
    },
    handlers: {
      handleEditCourseConstraint,
      handleViewTimeTable,
    },
  };
};
