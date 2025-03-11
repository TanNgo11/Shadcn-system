import React, { useRef } from 'react';
import { Modal } from 'antd';
import OpenCourseTeacherDetailsModal from './TeachersInCourse';
import OpenCourseStudentDetailsModal from './StudentsInCourse';

interface OpeningCourseDetailsProps {
  courseId?: string;
  open: boolean;
  onClose: () => void;
  semesterId: number;
}
interface CourseProps {
  courseId?: string[];
  semesterId: number;
}

const OpenViewDetailsModal: React.FC<OpeningCourseDetailsProps> = ({
  courseId,
  open,
  onClose,
  semesterId,
}: OpeningCourseDetailsProps) => {
  return (
    <Modal
      title={`Teachers List`}
      centered
      open={open}
      onCancel={onClose}
      okText="Add"
      width={1000}
    >
      <OpenCourseStudentDetailsModal courseId={courseId} semesterId={semesterId} />
      <OpenCourseTeacherDetailsModal courseId={courseId} semesterId={semesterId} />
    </Modal>
  );
};

export default OpenViewDetailsModal;
