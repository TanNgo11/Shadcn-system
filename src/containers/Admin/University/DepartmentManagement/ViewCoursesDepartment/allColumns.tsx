import { Callback } from '@/utils/helpers';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox, message, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { BaseCourseResponse } from '@/queries/Courses/types';

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

export const allColumns = ({}: CoursesProps): ProColumns<BaseCourseResponse>[] => [
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
    title: 'Course Code',
    dataIndex: 'code',
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
    valueType: 'text',
  },
  // {
  //   title: 'Image',
  //   dataIndex: 'imageUri',
  //   valueType: 'text',
  // },
  // {
  //   title: 'Teachers',
  //   dataIndex: 'teacherIds',
  //   render: (_, record) => record.teacherIds.length,
  //   valueType: 'text',
  // },
  // {
  //   title: 'Students',
  //   dataIndex: 'studentIds',
  //   render: (_, record) => record.studentIds.length,
  //   valueType: 'text',
  // },
  // {
  //   title: 'Department Name',
  //   dataIndex: 'departments',
  //   render: (_, record) => record.departments.map((dept) => dept.departmentName).join(', '),
  //   valueType: 'text',
  // },

  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => console.log('edit department')} />
      </a>,
      <a key="delete">
        {/* <Popconfirm
          title="Are you sure to delete this Department?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        ></Popconfirm> */}
        <DeleteOutlined
          onClick={() => {
            console.log('Delete course ' + _record.name);
          }}
        />
      </a>,
    ],
  },
];
