import { Callback } from '@/utils/helpers';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox, message, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { CourseResponse } from '../helpers';


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

export const allColumns = ({}: CoursesProps): ProColumns<CourseResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    hidden: true,
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
    onCell: () => {
      return {
        onClick: (record) => {
          window.confirm('Cell clicked ');
        },
      };
    },
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
    valueType: 'text',
  },
{
  title: 'Start Time',
  dataIndex: 'startTime',
  valueType: 'text',
},
{
  title: 'End Time',
  dataIndex: 'endTime + ',
  valueType: 'text',
},

{
  title: 'Start Date',
  dataIndex: 'startDate',
  valueType: 'text',
},
{
  title: 'End Date',
  dataIndex: 'endDate',
  valueType: 'text',
},
  {
    title: 'Teacher',
    dataIndex: 'teacherIds',
    valueType: 'text',
  },
  {
    title: 'Remain',
    dataIndex: 'remain',
    valueType: 'text',
  },
];
