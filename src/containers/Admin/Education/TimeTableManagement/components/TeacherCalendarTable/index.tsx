import { Alert, Modal, Spin } from 'antd';
import { WeeklyCalendar } from 'antd-weekly-calendar';
import React from 'react';
import { useCalendarModel } from './useCalendarModel';
import { mapTimetablesToEvents } from './helpers';

interface Props {
  open: boolean;
  onCancel: () => void;
  semesterId: string;
  teacherId: string;
}

const TeacherCalendarModal: React.FC<Props> = ({ open, onCancel, semesterId, teacherId }) => {
  const {
    states: { teacherCalendar, isPending, isError, error },
  } = useCalendarModel({ semesterId, teacherId });
  const events = mapTimetablesToEvents(teacherCalendar);

  return (
    <Modal
      open={open}
      title="Teacher Calendar"
      onCancel={onCancel}
      destroyOnClose
      okText="Save"
      width="80%"
      styles={{
        body: { height: '70vh', overflowY: 'auto' },
      }}
      className="timetable-modal"
    >
      {isPending ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Spin tip="Loading timetable..." />
        </div>
      ) : isError ? (
        <Alert
          message="Failed to load timetable"
          description={error?.message || 'Something went wrong.'}
          type="error"
          showIcon
        />
      ) : (
        <WeeklyCalendar
          events={events}
          weekends={false}
        />
      )}
    </Modal>
  );
};

export default TeacherCalendarModal;
