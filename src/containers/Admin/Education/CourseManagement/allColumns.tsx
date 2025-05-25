import { Callback } from '@/utils/helpers';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox, message, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { BaseCourseResponse, CourseResponse } from './helpers';
import CourseStatusChip from './components/CourseStatusChip';

type CoursesProps = {
  handleEditCourse: Callback;
  handleDeleteCourse: Callback;
};

// Notification box to confirm the deletion of a course
const confirm: PopconfirmProps['onConfirm'] = (e) => {
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  message.error('Click on No');
};

export const allColumns = ({
  handleEditCourse,
  handleDeleteCourse,
}: CoursesProps): ProColumns<BaseCourseResponse>[] => [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    render: (_text, record) => (
      <Checkbox
        onChange={(e: { target: { checked: any } }) => console.log(e.target.checked, record)}
      />
    ),
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
    render: (_, record) => <CourseStatusChip status={record.status} />,
  },
  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => handleEditCourse(_record)} />
      </a>,
      <a key="delete">
        <Popconfirm
          title="Are you sure to delete this course?"
          onConfirm={() => handleDeleteCourse(_record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      </a>,
    ],
  },
];
