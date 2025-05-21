import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { useState } from 'react'; // Add this import
import { CourseResponse } from '../helpers';
import OpenViewDetailsModal from './ViewDetailsOpeningCourse';

type CoursesProps = {
  handleAssignTeachers: Callback;
  semesterId: string;
  departmentId: string;
};

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  message.error('Click on No');
};

const AssignTeacherCell = ({
  record,
  semesterId,
  departmentId,
}: {
  record: CourseResponse;
  semesterId: string;
  departmentId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button onClick={open} style={{ margin: '0 10px' }}>
        View Details
      </Button>
      {isOpen && (
        <OpenViewDetailsModal
          semesterId={Number(semesterId)}
          courseId={record.id}
          departmentId={departmentId}
          open={isOpen}
          onClose={close}
        />
      )}
    </>
  );
};

export const allColumns = ({
  handleAssignTeachers,
  semesterId,
  departmentId,
}: CoursesProps): ProColumns<CourseResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    width: 40,
    hidden: true,
  },
  {
    title: 'No.',
    valueType: 'index',
    width: 48,
  },
  {
    title: 'Image',
    dataIndex: 'imageUri',
    valueType: 'text',
    hidden: true,
  },
  {
    title: 'Code',
    dataIndex: 'code',
    valueType: 'text',
  },
  {
    title: 'Course Name',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
    valueType: 'text',
  },
  {
    title: 'Remain',
    dataIndex: 'remain',
    valueType: 'text',
  },
  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (_text, record) => (
      <AssignTeacherCell record={record} semesterId={semesterId} departmentId={departmentId} />
    ),
  },
];

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useModal = (initialState = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
};
