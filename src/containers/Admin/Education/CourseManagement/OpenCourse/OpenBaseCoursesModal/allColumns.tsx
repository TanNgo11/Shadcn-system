import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox, message } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { BaseCourseResponse } from '../../helpers';

type CoursesProps = {
  handleEditCourse: Callback;
  handleDeleteCourse: Callback;
};

const confirm: PopconfirmProps['onConfirm'] = (e) => {
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

export const allColumns = (p0: {
  handleDeleteCourse: () => void;
  handleEditCourse: () => void;
}): ProColumns<BaseCourseResponse>[] => [
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
    onCell: () => {
      return {
        onClick: (record) => {
          window.confirm('Cell clicked ');
        },
      };
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    valueType: 'text',
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
    valueType: 'text',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'text',
  },
];
