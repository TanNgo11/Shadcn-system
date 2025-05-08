import { Select, Input } from 'antd';
import { AttendanceResponse, StudentAttendanceRecord } from '@/queries/Attendance/types';
import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';

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
}: AttendanceColumnsProps): ProColumns<StudentAttendanceRecord>[] => [
  {
    title: 'Student Name',
    dataIndex: 'studentId',
    key: 'studentName',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: any, record: StudentAttendanceRecord) => (
      <Select
        defaultValue={record.status || 'PRESENT'}
        style={{ width: 120 }}
        onChange={(value) => handleStatusChange(record.studentId, value)} // Pass value
      >
        <Option value="Present">Present</Option>
        <Option value="Late">Late</Option>
        <Option value="Absent">Absent</Option>
      </Select>
    ),
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    render: (_: any, record: StudentAttendanceRecord) => (
      <Input
        placeholder="Add notes"
        value={notes[record.studentId] || ''}
        onChange={(e) => handleNotesChange(record.studentId)} // Pass note value
      />
    ),
  },
];
