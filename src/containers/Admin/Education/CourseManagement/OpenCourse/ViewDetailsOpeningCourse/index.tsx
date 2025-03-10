import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import React, { useRef } from 'react';
import { Modal } from 'antd';
import { ActionType } from '@ant-design/pro-table';
import OpenCourseTeacherDetailsModal from './TeachersInCourse';

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

const OpenTeacherModal: React.FC<OpeningCourseDetailsProps> = ({
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
      <OpenCourseTeacherDetailsModal courseId={courseId} semesterId={semesterId}/>
    </Modal>
  );
};

export default OpenTeacherModal;
