import React, { useCallback, useMemo, useRef } from 'react';
import { Modal } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';

import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { allColumns } from './allColumns';

import { useGetTeachersList } from '@queries/Teachers/useGetTeachersList';
import { useAssignTeachersToCourse } from '@queries/Registration/useAssignTeachersToCourse';
import { useRemoveTeacherFromCourses } from '@queries/Registration/useRemoveTeacherFromCourses';
import { useAssignTeacherRoleToCourse } from '@queries/Registration/useAssignTeacherRoleToCourse';

import { TeacherResponse } from '@queries/Teachers/types';
import {
  AssignTeacherPayload,
  RegistrationTeacherRoleRequest,
  RemovalTeacherFromCoursePayload,
  TeacherRole,
} from '@queries/Registration/types';

interface AssignTeachersModalProps {
  courseId?: string[];
  open: boolean;
  onClose: () => void;
  semesterId: number;
  departmentId: string;
}

const OpenTeacherModal: React.FC<AssignTeachersModalProps> = ({
  courseId = [],
  open,
  onClose,
  semesterId,
  departmentId,
}) => {
  const toast = useNotification();
  const actionRef = useRef<ActionType>();

  const { teachers, totalElements, setParams } = useGetTeachersList();
  const { onAssignTeacher, isLoading } = useAssignTeachersToCourse();
  const { onRemoveTeacherFromCourses } = useRemoveTeacherFromCourses();
  const { onAssignTeacherRole } = useAssignTeacherRoleToCourse();

  const handleAssignTeacher = useCallback(
    async (teacher: TeacherResponse, role: TeacherRole) => {
      try {
        const assignPayload: AssignTeacherPayload = {
          teacherId: String(teacher.id),
          courseIds: courseId,
          semesterId: semesterId.toString(),
          departmentId,
          username: teacher.username,
        };

        const rolePayload: RegistrationTeacherRoleRequest = {
          courseId: courseId[0],
          teacherId: teacher.id.toString(),
          teacherRole: role,
        };

        await onAssignTeacherRole(rolePayload);
        // await onAssignTeacher(assignPayload);

        toast.success({
          message: 'Assign Teacher',
          description: 'Teacher assigned successfully.',
        });
        actionRef.current?.reload();
        onClose();
      } catch (err) {
        toast.error({
          message: 'Assign Teacher',
          description: 'Failed to assign teacher or role.',
        });
      }
    },
    [toast, onAssignTeacher, onAssignTeacherRole, courseId, semesterId, departmentId, onClose],
  );

  const handleRemoveTeacher = useCallback(
    (teacherId: string) => {
      const payload: RemovalTeacherFromCoursePayload = {
        teacherId,
        courseIds: courseId,
        semesterId: semesterId.toString(),
        departmentId,
      };

      onRemoveTeacherFromCourses(payload, {
        onSuccess: () => {
          toast.success({
            message: 'Remove Teacher',
            description: 'Teacher removed successfully.',
          });
          onClose();
        },
        onError: () => {
          toast.error({
            message: 'Remove Teacher',
            description: 'Failed to remove teacher.',
          });
        },
      });
    },
    [toast, onRemoveTeacherFromCourses, courseId, semesterId, departmentId, onClose],
  );

  const columns: ProColumns<TeacherResponse>[] = useMemo(
    () => allColumns({ handleAssignTeacher, handleRemoveTeacher }),
    [handleAssignTeacher, handleRemoveTeacher],
  );

  return (
    <Modal
      title="Teachers List"
      centered
      open={open}
      onCancel={onClose}
      width={1000}
      confirmLoading={isLoading}
      footer={null}
    >
      <ProTable<TeacherResponse>
        request={async (_params, _sort, _filter) => {
          const { current, pageSize, ...restParams } = _params;
          setParams({
            current: current ?? 1,
            pageSize: pageSize ?? 10,
            departmentId,
            ...restParams,
          });

          return {
            data: teachers,
            success: true,
            total: totalElements,
          };
        }}
        actionRef={actionRef}
        dataSource={teachers}
        columns={columns}
        rowKey="id"
        search={false}
        cardBordered
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          total: totalElements,
        }}
        options={false}
        dateFormatter="string"
      />
    </Modal>
  );
};

export default OpenTeacherModal;
