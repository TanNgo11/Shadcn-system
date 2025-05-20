import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useGetAllCoursesBySemesterId } from '@queries/Courses/useGetAllCoursesBySemesterId';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CourseResponse } from '../CourseManagement/helpers';
import { allColumns } from './allColumns';
import { useTimeTableManagement } from './useTimeTableManagement';
import EditConstraintModal from './components/EditConstraintModal/EditConstraintModal';
import { useGetAllTeachesHaveCourseInSemester } from '@queries/Teachers/useGetAllTeachersHaveCourseInSemester';
import { TeacherResponse } from '@queries/Teachers/types';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TeacherTableActions from './components/TeacherTable/TeacherTable';

const TimeTableManagement = () => {
  const { semesterId } = useParams();
  const actionRef = useRef<ActionType | null>(null);
  const { courses, setParams, totalElements } = useGetAllCoursesBySemesterId();
  const {
    state: { isOpen, close, selectedCourse },
    handlers: { handleEditCourseConstraint },
  } = useTimeTableManagement();

  const columns: ProColumns<CourseResponse>[] = useMemo(
    () => allColumns({ handleEditCourseConstraint }),
    [handleEditCourseConstraint],
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

  return (
    <>
      <Tabs defaultActiveKey="courses" items={items} />
      <EditConstraintModal open={isOpen} onCancel={close} course={selectedCourse} />
    </>
  );
};

export default TimeTableManagement;
