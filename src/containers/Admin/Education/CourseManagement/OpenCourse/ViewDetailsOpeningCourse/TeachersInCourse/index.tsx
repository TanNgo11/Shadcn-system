import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { teachersAllColumns } from './allColumns';
import { TeacherResponse } from '@queries/Teachers/types';
import { useAssignTeachersToCourse } from '@queries/Registration/useAssignTeachersToCourse';
import { AssignTeacherPayload, RemovalTeacherFromCoursePayload } from '@queries/Registration/types';
import { Modal } from 'antd';
import { useGetTeachersList } from '@queries/Teachers/useGetTeachersList';
import { useRemoveTeacherFromCourses } from '@queries/Registration/useRemoveTeacherFromCourses';

interface CourseProps {
  courseId?: string;
  semesterId: number;
}

const OpenCourseTeacherDetailsModal: React.FC<CourseProps> = ({ courseId, semesterId }: CourseProps) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>();
  const toast = useNotification();
  const actionRef = useRef<ActionType>();
  const { teachers, handleInvalidateTeachersList, setParams, totalElements } = useGetTeachersList();

  const { onRemoveTeacherFromCourses } = useRemoveTeacherFromCourses();

  const handleRemoveTeacher = useCallback(
    (teacherId: string) => {
      const payload: RemovalTeacherFromCoursePayload = {
        teacherId: teacherId || '',
        courseIds: courseId ? [courseId] : [],
        semesterId: semesterId.toString(),
      };

      onRemoveTeacherFromCourses(payload, {
        onSuccess: () => {
          toast.success({
            message: 'Remove Teacher',
            description: 'The teacher has been remove successfully.',
          });
        },
        onError: () => {
          toast.error({
            message: 'Remove Teacher',
            description: 'The teacher could not be removed.',
          });
        },
      });
    },
    [toast, onRemoveTeacherFromCourses, courseId, semesterId],
  );

  const teacherColumns: ProColumns<TeacherResponse>[] = useMemo(
    () => teachersAllColumns({ handleRemoveTeacher }),
    [handleRemoveTeacher],
  );

  return (
    <ProTable<TeacherResponse>
      dataSource={teachers}
      columns={teacherColumns}
      cardBordered
      request={async (_params, _sort, _filter) => {
        const { current, pageSize, ...restParams } = _params;
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
      // rowSelection={{
      //   onChange: handleAddSelectionChange,
      //   selectedRowKeys: selectedRowBaseCourses, // Dùng selectedRowKeys để phản ánh realtime
      // }}
      dateFormatter="string"
      headerTitle="Base Course Management"
      options={false}
    />
  );
};

export default OpenCourseTeacherDetailsModal;
