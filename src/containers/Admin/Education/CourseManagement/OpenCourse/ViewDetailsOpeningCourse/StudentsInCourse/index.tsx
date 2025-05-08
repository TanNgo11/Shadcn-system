import {useNotification} from '@/containers/StartupContainers/ToastContainer';
import ProTable, {ActionType, ProColumns} from '@ant-design/pro-table';
import React, {useCallback, useMemo, useRef} from 'react';
import useGetStudentsInOpeningCourseByCourseId from '@queries/Courses/useGetStudentsInOpeningCourseByCourseId';
import {studentsAllColumns} from './allColumns';
import {RemovalStudentFromCoursePayload, StudentResponse} from '@queries/Registration/types';

interface CourseProps {
  courseId?: string;
  semesterId: number;
  departmentId: string;
}

const OpenCourseStudentDetailsModal: React.FC<CourseProps> = ({
                                                                courseId,
                                                                semesterId,
                                                                departmentId,
                                                              }: CourseProps) => {
  const toast = useNotification();
  const actionRef = useRef<ActionType>();
  const {students, handleInvalidateStudentsList, setParams, totalElements} =
    useGetStudentsInOpeningCourseByCourseId({
      courseId: courseId || '',
    });

  // const { onRemoveStudentsFromCourse } = useRemoveStudentsFromCourseRegistration();

  const handleRemoveStudent = useCallback(
    (studentId: string) => {
      const payload: RemovalStudentFromCoursePayload = {
        studentId: studentId || '',
        courseIds: courseId ? [courseId] : [],
        semesterId: semesterId.toString(),
        departmentId: departmentId,
      };

      // onRemoveStudentsFromCourse({
      //   onSuccess: () => {
      //     toast.success({
      //       message: 'Remove Teacher',
      //       description: 'The teacher has been remove successfully.',
      //     });
      //     handleInvalidateStudentsList();
      //   },
      //   onError: () => {
      //     toast.error({
      //       message: 'Remove Teacher',
      //       description: 'The teacher could not be removed.',
      //     });
      //   },
      // });
    },
    [toast, courseId, semesterId, handleInvalidateStudentsList],
  );

  const studentColumns: ProColumns<StudentResponse>[] = useMemo(
    () => studentsAllColumns({handleRemoveStudent}),
    [handleRemoveStudent],
  );

  return (
    <ProTable<StudentResponse>
      dataSource={students}
      columns={studentColumns}
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
          data: students,
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
      headerTitle="Student In Course"
      options={false}
    />
  );
};

export default OpenCourseStudentDetailsModal;

function useRemoveStudentsFromCourseRegistration(): { onRemoveStudentsFromCourse: any } {
  throw new Error('Function not implemented.');
}
