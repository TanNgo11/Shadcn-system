import { CourseResponse } from '../../../CourseManagement/helpers';
import { Action } from '@/components/ui/ActionsDialog';
import { EditOutlined } from '@ant-design/icons';

export const getCourseActions = (
  record: CourseResponse,
  onEdit: (course: CourseResponse) => void,
): Action[] => [
  {
    key: 'edit',
    label: 'Edit Course Constraint',
    icon: <EditOutlined />,
    onClick: () => onEdit(record),
    labelStyle: { fontSize: '14px', color: '#1890ff', fontWeight: 500 },
    iconStyle: { fontSize: '16px', color: '#1890ff', marginRight: '4px' },
  },
];
