import { Alert, Layout, Select, Spin, Typography } from 'antd';
import { WeeklyCalendar } from 'antd-weekly-calendar';
import React from 'react';
import { useGetCalendar } from './useCalendarModel';
import { mapTimetablesToEvents } from './helpers';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import "./styles.scss";
const { Content } = Layout;

const TeacherCalendarView: React.FC = () => {
  const { user } = useAuthStore();

  const {
    states: { teacherCalendar, selectedSemester, semestersOptions, error, isPending, isError },
    handlers: { setSelectedSemester },
  } = useGetCalendar({ teacherId: user?.id.toString() });
  const events = mapTimetablesToEvents(teacherCalendar);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: 0, margin: 0 }}>
        <div style={{ padding: '1rem' }}>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Teacher Calendar
          </Typography.Title>
          <Select
            size="large"
            onChange={setSelectedSemester}
            style={{ width: 240, margin: '1rem 0' }}
            options={semestersOptions}
            value={selectedSemester}
          />
        </div>

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
            style={{ margin: '1rem' }}
          />
        ) : (
          <div
            className="timetable-modal"
            style={{ height: 'calc(100vh - 170px)', overflowY: 'auto', padding: '0 1rem 1rem' }}
          >
            <WeeklyCalendar
              events={events}
              onEventClick={(event) => console.log(event)}
              onSelectDate={(date) => console.log(date)}
              weekends={false}
              
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default TeacherCalendarView;
