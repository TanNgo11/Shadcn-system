import { Tag } from 'antd';
import React from 'react';
import { statusMap } from './helper';


const CourseStatusChip: React.FC<Props> = ({ status }) => {
  const statusInfo = statusMap[status ?? ''] ?? { color: 'default', text: 'Unknown' };

  return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
};
export interface Props {
  status?: string;
}
export default CourseStatusChip;
