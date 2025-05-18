import { ProColumns } from '@ant-design/pro-table';
import { CourseResponse } from '../CourseManagement/helpers';
import { Button } from 'antd';
import { Callback } from '@/utils/helpers';
import ChipCommon from './components/ChipCommon';
import ActionDialog from '@/components/ui/ActionsDialog';
import { getCourseActions } from './components/TimeTableActions/TimeTableActions';

type CoursesProps = {
  handleEditCourseConstraint: Callback;
};

export const allColumns = ({
  handleEditCourseConstraint,
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
    align: 'center',
  },

  {
    title: 'Code',
    dataIndex: 'code',
    valueType: 'text',
    align: 'center',
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
    align: 'right',
  },
  {
    title: 'Status',
    dataIndex: 'processStatus',
    valueType: 'select',
    render: (_, record) => <ChipCommon status={record.processStatus} />,
  },
  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (_text, record) => (
      <ActionDialog actions={getCourseActions(record, handleEditCourseConstraint)} />
    ),
  },
];
