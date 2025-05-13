import { Select, Input } from 'antd';
import { AttendanceResponse } from '@/queries/Attendance/types';
import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { ATTENDANCE_STATUS } from './keys';

const { Option } = Select;

type AttendanceColumnsProps = {
  notes: Record<number, string>;
  handleStatusChange: Callback;
  handleNotesChange: Callback;
};

export const allColumns = ({
  notes,
  handleStatusChange,
  handleNotesChange,
}: AttendanceColumnsProps): ProColumns<AttendanceResponse>[] => [
  {
    title: 'Student Name',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: any, response: AttendanceResponse) => (
      <Select
        defaultValue={response.status || 'PRESENT'}
        style={{ width: 120 }}
        onChange={(value) => handleStatusChange(response.studentId, value)} // Pass value
      >
        <Option value={ATTENDANCE_STATUS.PRESENT}>{ATTENDANCE_STATUS.PRESENT}</Option>
        <Option value={ATTENDANCE_STATUS.LATE}>{ATTENDANCE_STATUS.LATE}</Option>
        <Option value={ATTENDANCE_STATUS.ABSENT}>{ATTENDANCE_STATUS.ABSENT}</Option>
      </Select>
    ),
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    render: (_: any, response: AttendanceResponse) => (
      <Input
        placeholder={response.studentName + ' ' + response.date}
        value={response.studentName + ' ' + response.date}
        onChange={(e) => handleNotesChange(response.studentId, 'test note')} // Pass note value
      />
    ),
  },
];
