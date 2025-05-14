import { ProColumns } from '@ant-design/pro-table';
import { CourseResponse } from '../CourseManagement/helpers';
import { Button } from 'antd';

type CoursesProps = {};

export const allColumns = ({
  handleAssignTeachers,
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
    title: 'Code',
    dataIndex: 'code',
    valueType: 'text',
  },
  {
    title: 'Course Name',
    dataIndex: 'name',
    valueType: 'text',
    onCell: () => {
      return {};
    },
  },
  {
    title: 'Credit',
    dataIndex: 'credit',
    valueType: 'text',
  },
  {
    title: 'Status',
    dataIndex: 'processStatus',
    valueType: 'select',
    valueEnum: {
      true: { text: 'ready to start', status: 'Success' },
      false: { text: 'required fields', status: 'Error' },
    },
  },
  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (_text, record) => (
      <>
        <Button onClick={(event) => handleNavigateToTimeTable(event, record.id)}>Time Table</Button>
        ,
      </>
    ),
  },
];
