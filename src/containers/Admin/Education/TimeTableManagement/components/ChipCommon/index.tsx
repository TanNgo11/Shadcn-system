import { Tag } from 'antd';
import React from 'react';
import { timeSlotStatus, timeTableStatus } from './ChipCommon.helpers';

const ChipCommon: React.FC<Props> = ({ status }) => {
  const statusInfo = timeTableStatus[status] ??
    timeSlotStatus[status] ?? { color: 'default', text: 'Unknown' };

  return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
};
export interface Props {
  status?: string;
}
export default ChipCommon;
