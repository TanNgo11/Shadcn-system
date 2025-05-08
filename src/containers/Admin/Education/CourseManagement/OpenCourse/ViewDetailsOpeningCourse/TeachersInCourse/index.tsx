import {useNotification} from '@/containers/StartupContainers/ToastContainer';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import useGetteachersInOpeningCourseByCourseId from '@queries/Courses/useGetTeachersInOpeningCourseByCourseId';
import {RemovalTeacherFromCoursePayload} from '@queries/Registration/types';
import {useRemoveTeacherFromCourses} from '@queries/Registration/useRemoveTeacherFromCourses';
import {TeacherResponse} from '@queries/Teachers/types';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {teachersAllColumns} from './allColumns';

interface CourseProps {
  courseId?: string;
  semesterId: number;
  departmentId: string;
}

const OpenCourseTeacherDetailsModal: React.FC<CourseProps> = ({
                                                                courseId,
                                                                semesterId,
                                                                departmentId,
                                                              }: CourseProps) => {
  const toast = useNotification();
  const actionRef = useRef<ActionType>();
  const {teachers, handleInvalidateTeachersList, setParams, totalElements} =
    useGetteachersInOpeningCourseByCourseId({
      courseId: courseId || '',
    });

  const {onRemoveTeacherFromCourses} = useRemoveTeacherFromCourses();

  const handleRemoveTeacher = useCallback(
    (teacherId: string) => {
      const payload: RemovalTeacherFromCoursePayload = {
        teacherId: teacherId || '',
        courseIds: courseId ? [courseId] : [],
        semesterId: semesterId.toString(),
        departmentId: departmentId,
      };

      onRemoveTeacherFromCourses(payload, {
        onSuccess: () => {
          toast.success({
            message: 'Remove Teacher',
            description: 'The teacher has been remove successfully.',
          });
          handleInvalidateTeachersList();
        },
        onError: () => {
          toast.error({
            message: 'Remove Teacher',
            description: 'The teacher could not be removed.',
          });
        },
      });
    },
    [
      toast,
      onRemoveTeacherFromCourses,
      courseId,
      semesterId,
      handleInvalidateTeachersList,
      departmentId,
    ],
  );

  const teacherColumns: ProColumns<TeacherResponse>[] = useMemo(
    () => teachersAllColumns({handleRemoveTeacher}),
    [handleRemoveTeacher],
  );

  useEffect(() => {
    handleInvalidateTeachersList();
  }, []);

  return (
    <ProTable<TeacherResponse>
      dataSource={teachers}
      columns={teacherColumns}
      cardBordered
      request={async (_params, _sort, _filter) => {
        const {current, pageSize, ...restParams} = _params;
        setParams({
          current: current ?? 1,
          pageSize: pageSize ?? 10,
          ...restParams,
        });
        actionRef.current?.reload();

        return {
          data: teachers,
          success: true,
          total: totalElements,
        };
      }}
      rowKey="id"
      search={{
        layout: 'vertical',
        filterType: 'light',
      }}
      form={{
        syncToUrl: (values: Record<string, any>, type: 'get' | 'set') => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
        total: totalElements,
      }}
      dateFormatter="string"
      headerTitle="Teachers In Course"
      options={false}
    />
  );
};

export default OpenCourseTeacherDetailsModal;
