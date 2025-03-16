import { Action } from '@/components/ui/ActionsDialog';
import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BlogsResponse } from '@queries';

export const getBlogActions = (record: BlogsResponse, navigate: (path: string) => void): Action[] => [
  {
    key: 'edit',
    label: 'Edit',
    icon: <EditOutlined />,
    onClick: () => navigate(`${PATHS.EDIT_BLOG}`.replace(':id', record.id.toString())),
    labelStyle: { fontSize: '14px', color: '#1890ff', fontWeight: 500 },
    iconStyle: { fontSize: '16px', color: '#1890ff', marginRight: '4px' },
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <DeleteOutlined />,
    onClick: () => console.log(`Delete blog ${record.id}`),
    labelStyle: { fontSize: '14px', color: '#ff4d4f', fontWeight: 500 },
    iconStyle: { fontSize: '16px', color: '#ff4d4f', marginRight: '4px' },
  },
  {
    key: 'preview',
    label: 'Preview',
    icon: <EyeOutlined />,
    onClick: () => navigate(`${PATHS.PREVIEW_BLOG}`.replace(':id', record.id.toString())),
    labelStyle: { fontSize: '14px', color: '#52c41a', fontWeight: 500 },
    iconStyle: { fontSize: '16px', color: '#52c41a', marginRight: '4px' },
  },
];
