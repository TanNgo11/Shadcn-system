import { Modal } from 'antd';
import { WeeklyCalendar } from 'antd-weekly-calendar';
import React from 'react';
import { useTimeTableModal } from './useTimeTableModal';
import { mapTimetablesToEvents } from './helpers';
import './styles.scss';
interface Props {
  open: boolean;
  onCancel: () => void;
  selectedCourseId: string;
}

const TimetableModal: React.FC<Props> = ({ open, onCancel, selectedCourseId }) => {
  const {
    state: { timetables },
  } = useTimeTableModal({ courseId: selectedCourseId });
  const events = mapTimetablesToEvents(timetables);
  return (
    <Modal
      open={open}
      title="Edit Course Constraint"
      onCancel={onCancel}
      destroyOnClose
      okText="Save"
      width={'90%'}
      styles={{
        body: { height: '70vh', overflowY: 'auto' },
      }}
      className="timetable-modal"
    >
      <WeeklyCalendar
        events={events}
        onEventClick={(event) => console.log(event)}
        onSelectDate={(date) => console.log(date)}
        weekends={false}
        
      />
    </Modal>
  );
};

export default TimetableModal;
