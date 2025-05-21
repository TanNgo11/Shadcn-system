import { Modal } from 'antd';
import React from 'react';
import OpenCourseStudentDetailsModal from './StudentsInCourse';
import OpenCourseTeacherDetailsModal from './TeachersInCourse';

interface OpeningCourseDetailsProps {
  courseId?: string;
  open: boolean;
  onClose: () => void;
  semesterId: number;
  departmentId: string;
}

const OpenViewDetailsModal: React.FC<OpeningCourseDetailsProps> = ({
  courseId,
  open,
  onClose,
  semesterId,
  departmentId,
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
      <OpenCourseStudentDetailsModal
        courseId={courseId}
        semesterId={semesterId}
        departmentId={departmentId}
      />
      <OpenCourseTeacherDetailsModal
        courseId={courseId}
        semesterId={semesterId}
        departmentId={departmentId}
      />
    </Modal>
  );
};

export default OpenViewDetailsModal;
