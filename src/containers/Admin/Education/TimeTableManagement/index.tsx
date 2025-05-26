import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useGetAllCoursesBySemesterId } from '@queries/Courses/useGetAllCoursesBySemesterId';
import type { TabsProps } from 'antd';
import { Button, Tabs } from 'antd';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CourseResponse } from '../CourseManagement/helpers';
import { allColumns } from './allColumns';
import EditConstraintModal from './components/EditConstraintModal/EditConstraintModal';
import TeacherTableActions from './components/TeacherTable/TeacherTable';
import { useTimeTableManagement } from './useTimeTableManagement';
import TimetableModal from './components/TimetableModal';
import { useGenerateTimetableBySemesterId } from '@queries/Timetable/useGenerateTimetableBySemesterId';
import { useNotification } from '@/containers/StartupContainers';

const TimeTableManagement = () => {
  const toast = useNotification();
  const { semesterId } = useParams();
  const actionRef = useRef<ActionType | null>(null);
  const { courses, setParams, totalElements } = useGetAllCoursesBySemesterId();
  const {
    state: {
      isOpen,
      close,
      selectedCourse,
      isViewEditCourseConstraint,
      isViewTimeTableOpen,
      selectedCourseId,
    },
    handlers: { handleEditCourseConstraint, handleViewTimeTable },
  } = useTimeTableManagement();

  const columns: ProColumns<CourseResponse>[] = useMemo(
    () => allColumns({ handleEditCourseConstraint, handleViewTimeTable }),
    [handleEditCourseConstraint, handleViewTimeTable],
  );

  const items: TabsProps['items'] = [
    {
      key: 'courses',
      label: 'Courses',
      children: (
        <ProTable<CourseResponse>
          actionRef={actionRef}
          dataSource={courses}
          columns={columns}
          cardBordered
          request={async (_params, _sort, _filter) => {
            const { current, pageSize, ...restParams } = _params;
            setParams({
              current: current ?? 1,
              pageSize: pageSize ?? 10,
              semesterId: semesterId,
              ...restParams,
            });

            return {
              data: courses,
              success: true,
              total: totalElements,
            };
          }}
          rowKey="id"
          search={false}
          pagination={{
            pageSizeOptions: [10, 20, 50, 100],
            showSizeChanger: true,
            showPrevNextJumpers: true,
            showTotal: (total: number) => `Total ${total} items`,
            onChange: (page: any) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="Courses List"
        />
      ),
    },
    {
      key: 'teachers',
      label: 'Teachers',
      children: <TeacherTableActions semesterId={semesterId} />,
    },
  ];
  const { onGenerateTimetableBySemesterId } = useGenerateTimetableBySemesterId({
    onSuccess: () => {
      actionRef.current?.reload();
      toast.success({
        message: ' Timetable Generation',
        description: ' Timetable generated successfully.',
      });
    },
    onError: (error) => {
      toast.error({
        message: ' Timetable Generation',
        description: error.message || 'Failed to generate timetable.',
      });
    },
  });

  const handleGenerateTimeTable = () => {
    onGenerateTimetableBySemesterId({ semesterId: semesterId });
  };

  return (
    <>
      <Button onClick={handleGenerateTimeTable}>Generate Time Table</Button>
      <Tabs defaultActiveKey="courses" items={items} />
      <EditConstraintModal
        open={isOpen && isViewEditCourseConstraint}
        onCancel={close}
        course={selectedCourse}
      />
      <TimetableModal
        selectedCourseId={selectedCourseId}
        open={isOpen && isViewTimeTableOpen}
        onCancel={close}
      />
    </>
  );
};

export default TimeTableManagement;
