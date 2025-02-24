import { Tag } from 'antd';
import React from 'react';

export const statusMap: Record<string, { color: string; text: string }> = {
  ACTIVE: { color: 'blue', text: 'Active' },
  INACTIVE: { color: 'volcano', text: 'Inactive' },
  DELETED: { color: 'red', text: 'Deleted' },
  PENDING: { color: 'orange', text: 'Pending' },
  DROPPED_OUT: { color: 'purple', text: 'Dropped out' },
  GRADUATED: { color: 'cyan', text: 'Graduated' },
  STUDYING: { color: 'green', text: 'Studying' },
  SUSPENDED: { color: 'magenta', text: 'Suspended' },
};

const StudentChip: React.FC<Props> = ({ status }) => {
  const statusInfo = statusMap[status || ''] || { color: 'default', text: 'Unknown' };

  return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
};
export interface Props {
  status?: string;
}
export default StudentChip;
