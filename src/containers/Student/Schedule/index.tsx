import { Alert, Layout, Select, Spin, Typography } from 'antd';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useGetCurrentOpenSemesterByDate } from '@queries/Semester/useGetCurrentOpenSemesterByDate';
import { useGetSemesterList } from '@queries/Semester/useGetSemesterList';
import { useGetStudentCalendarByStudentIdAndSemesterId } from '@queries/Timetable/useGetStudentCalendarByStudentIdAndSemesterId';
import { useEffect, useState } from 'react';
import { WeeklyCalendar } from 'antd-weekly-calendar';
import { mapTimetablesToEvents } from './helpers';
import './styles.scss';


const { Content } = Layout;
const Schedule = () => {
  const { user } = useAuthStore();
  const [selectedSemester, setSelectedSemester] = useState<string>('');

  const { semester } = useGetCurrentOpenSemesterByDate();

  const { semesters, setParams } = useGetSemesterList({
    defaultParams: { academicYearId: semester?.academicYear?.id },
  });

  const semestersOptions = semesters.map((semester) => ({
    label: semester?.name,
    value: semester?.id,
  }));

  const { studentSchedule, isPending, isError, error } =
    useGetStudentCalendarByStudentIdAndSemesterId({
      semesterId: selectedSemester,
      studentId: String(user?.id),
    });

  useEffect(() => {
    if (semester) {
      setParams({ academicYearId: semester?.academicYear?.id });
      setSelectedSemester(semester?.id || '');
    }
  }, [semester, setParams]);

  const events = mapTimetablesToEvents(studentSchedule);

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
            style={{ height: 'calc(100vh - 170px)', overflowY: 'auto', padding: '0 1rem 1rem' }}
            className="timetable-modal"
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

export default Schedule;
