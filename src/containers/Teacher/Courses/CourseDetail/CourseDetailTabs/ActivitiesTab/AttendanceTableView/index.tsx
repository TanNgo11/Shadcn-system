import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, Select, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {
  AttendanceResponse,
  SessionResponse,
  TeacherCheckAttendance,
} from '@/queries/Attendance/types';
import { allColumns } from './allColumns';
import useGetAllClassSessionsByCourseId from '@queries/Attendance/useGetAllClassSessionsByCourseId';
import useCheckAttendanceForTeacher from '@queries/Attendance/useCheckAttendanceForTeacher';

interface AttendanceTableViewProps {
  courseId: string;
  visible: boolean;
  onClose: () => void;
}

const AttendanceTableView: React.FC<AttendanceTableViewProps> = ({
  courseId,
  visible,
  onClose,
}) => {
  const [attendanceResponses, setAttendanceResponses] = useState<AttendanceResponse[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>('Select Session');
  const [selectedSession, setSelectedSession] = useState<SessionResponse | undefined>();

  const {
    data: allSessions,
    error,
    isFetching,
    handleInvalidateClassSession,
  } = useGetAllClassSessionsByCourseId({
    courseId: parseInt(courseId),
    enabled: visible && !!courseId,
  });

  // Update AttendanceResponse when SelectedSession is changed
  useEffect(() => {
    if (selectedSession?.attendances) {
      setAttendanceResponses(selectedSession.attendances);
    } else {
      setAttendanceResponses([]);
    }
  }, [selectedSession]);

  const { onCheckAttendance, isLoading: isSubmitting } = useCheckAttendanceForTeacher({
    onSuccess: async () => {
      message.success('Attendance submitted successfully');
      await handleInvalidateClassSession();
      onClose();
    },
    onError: (error) => {
      message.error(`Failed to submit attendance: ${error.message}`);
    },
  });

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendanceResponses((prev) =>
      prev.map((record) => (record.studentId === studentId ? { ...record, status } : record)),
    );
  };

  const handleNotesChange = (studentId: number, notes: string) => {
    setNotes((prev) => ({ ...prev, [studentId]: notes }));
    setAttendanceResponses((prev) =>
      prev.map((record) => (record.studentId === studentId ? { ...record, notes: notes } : record)),
    );
  };

  const handleSubmit = () => {
    const payload: TeacherCheckAttendance = {
      classSessionId: parseInt(selectedSessionId, 10),
      attendanceResponses,
    };
    onCheckAttendance(payload);
  };

  const columns: ProColumns[] = useMemo(
    () => allColumns({ notes, handleStatusChange, handleNotesChange }),
    [notes],
  );

  return (
    <Modal
      title={`Attendance for Session: ${selectedSessionId === 'Select Session' ? '' : selectedSession.sessionDate.toString()}`}
      open={visible}
      onCancel={onClose}
      width={900}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={isSubmitting} onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Select
        placeholder="Select a class session"
        value={selectedSessionId}
        onChange={(value) => {
          setSelectedSessionId(value);
          const session = allSessions?.result?.find((session) => session.id.toString() === value);
          setSelectedSession(session);
        }}
        loading={isFetching}
        style={{ width: 200, marginBottom: 16 }}
      >
        {allSessions?.result?.map((session) => (
          <Select.Option key={session.id} value={session.id.toString()}>
            {`Session - ${session.sessionDate}`}
          </Select.Option>
        ))}
      </Select>
      <ProTable<AttendanceResponse>
        columns={columns}
        dataSource={attendanceResponses} // Sử dụng attendanceResponses làm dataSource
        rowKey="studentId"
        search={false}
        pagination={{ pageSize: 10 }}
        loading={isFetching}
        options={false}
      />
    </Modal>
  );
};

export default AttendanceTableView;
