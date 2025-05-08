import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, Select, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {
  AttendanceResponse,
  StudentAttendanceRecord,
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
  const [attendanceRecords, setAttendanceRecords] = useState<StudentAttendanceRecord[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});

  // For ClassSession fetching
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>('Session');

  // Get the return attributes from hook
  const {
    data: allSessions,
    error,
    isFetching,
    handleInvalidateClassSession,
  } = useGetAllClassSessionsByCourseId({
    courseId: parseInt(courseId) || 95,
    enabled: visible && !!courseId,
  });

  useEffect(() => {
    if (allSessions?.result?.length && !selectedSessionId) {
      setSelectedSessionId(allSessions.result[0].id.toString());
    }

    console.log('Selected Session ID:', selectedSessionId);
    console.log('course:', courseId);
  }, [allSessions, selectedSessionId, courseId]);

  const selectedSession = useMemo(() => {
    return Array.isArray(allSessions?.result)
      ? allSessions.result.find(
          (session: { id: number }) => session.id.toString() === selectedSessionId,
        )
      : null;
  }, [allSessions, selectedSessionId]);

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

  useEffect(() => {
    if (!selectedSession || !Array.isArray(selectedSession?.timetable?.attendanceRecords)) return;

    const initialNotes: Record<number, string> = {};
    const initialRecords: StudentAttendanceRecord[] =
      selectedSession.timetable.attendanceRecords.map(
        (attendanceRecords: StudentAttendanceRecord) => {
          initialNotes[attendanceRecords.studentId] = attendanceRecords.notes || '';
          return {
            studentId: attendanceRecords.studentId,
            status: attendanceRecords.status || 'Present',
            notes: attendanceRecords.notes || '',
          };
        },
      );

    setAttendanceRecords(initialRecords);
    setNotes(initialNotes);
  }, [selectedSession]);

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendanceRecords((prev) =>
      prev.map((record) => (record.studentId === studentId ? { ...record, status } : record)),
    );
  };

  const handleNotesChange = (studentId: number, note: string) => {
    setNotes((prev) => ({ ...prev, [studentId]: note }));
    setAttendanceRecords((prev) =>
      prev.map((record) => (record.studentId === studentId ? { ...record, notes: note } : record)),
    );
  };

  const handleSubmit = () => {
    const payload: TeacherCheckAttendance = {
      classSessionId: parseInt(selectedSessionId, 10),
      attendanceRecords,
    };
    onCheckAttendance(payload);
  };

  const columns: ProColumns[] = useMemo(
    () => allColumns({ notes, handleStatusChange, handleNotesChange }),
    [notes],
  );

  return (
    <Modal
      title={`Attendance for Session: ${selectedSessionId == 'Session' ? '' : selectedSessionId}`}
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
        onChange={setSelectedSessionId}
        loading={isFetching}
        style={{ width: 200, marginBottom: 16 }}
      >
        {allSessions?.result?.map((session) => (
          <Select.Option key={session.id} value={session.id}>
            {`Session ${session.id} - ${session.sessionDate}`}
          </Select.Option>
        ))}
      </Select>
      <ProTable
        columns={columns}
        dataSource={selectedSession?.timetable?.attendanceRecords || []}
        rowKey="studentId"
        search={false}
        pagination={false}
        loading={isFetching}
        options={false}
      />
    </Modal>
  );
};

export default AttendanceTableView;
