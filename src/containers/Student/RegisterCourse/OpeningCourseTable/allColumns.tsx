import { CourseResponse } from '@/queries/Semester';
import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { message } from 'antd';
import { PopconfirmProps } from 'antd/lib';

type CoursesProps = {
  handleEditCourse: Callback;
  handleDeleteCourse: Callback;
  // handleCellClick: Callback;
};

// Notification box to confirm the deletion of a course
const confirm: PopconfirmProps['onConfirm'] = (e) => {
  //handleDeleteCourse(_record.id, Action.DELETE);
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

export const allColumns = (): ProColumns<CourseResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    hidden: true,
    hideInSearch: true,
  },
  {
    title: 'Image',
    dataIndex: 'imageUri',
    valueType: 'text',
    hidden: true,
    hideInSearch: true,
  },
  {
    title: 'Code',
    dataIndex: 'code',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'Course Name',
    dataIndex: 'name',
    valueType: 'text',
    onCell: () => {
      return {
        onClick: (record) => {
          window.confirm('Cell clicked ');
        },
      };
    },
    hideInSearch: true,
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'End Time',
    dataIndex: 'endTime + ',
    valueType: 'text',
    hideInSearch: true,
  },

  {
    title: 'Start Date',
    dataIndex: 'startDate',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'Teacher',
    dataIndex: 'teacherIds',
    valueType: 'text',
    hideInSearch: true,
  },
  {
    title: 'Remain',
    dataIndex: 'remain',
    valueType: 'text',
    hideInSearch: true,
  },
];
