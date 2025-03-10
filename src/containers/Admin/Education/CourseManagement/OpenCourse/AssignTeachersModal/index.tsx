import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allColumns } from './allColumns';
import { TeacherResponse } from '@queries/Teachers/types';
import { useAssignTeachersToCourse } from '@queries/Registration/useAssignTeachersToCourse';
import { AssignTeacherPayload, RemovalTeacherFromCoursePayload } from '@queries/Registration/types';
import { Modal } from 'antd';
import { useGetTeachersList } from '@queries/Teachers/useGetTeachersList';
import { useRemoveTeacherFromCourses } from '@queries/Registration/useRemoveTeacherFromCourses';

interface AssignTeachersModalProps {
  courseId?: string[];
  open: boolean;
  onClose: () => void;
  semesterId: number;
}

const OpenTeacherModal: React.FC<AssignTeachersModalProps> = ({
  courseId,
  open,
  onClose,
  semesterId,
}: AssignTeachersModalProps) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>();
  const toast = useNotification();
  const { id } = useParams<{ id: string }>();
  const handleAddSelectionChange = (_: any, selectedTeacher: TeacherResponse) => {
    setSelectedTeacherId(selectedTeacher.teacherId);
  };
  const actionRef = useRef<ActionType>();

  const { teachers, handleInvalidateTeachersList, setParams, totalElements } = useGetTeachersList();

  const { onAssignTeacher, isLoading } = useAssignTeachersToCourse();
  const { onRemoveTeacherFromCourses} = useRemoveTeacherFromCourses();

  const handleAssignTeacher = useCallback((teacherId: string) => {
    const payload: AssignTeacherPayload = {
      teacherId: teacherId || '',
      courseIds: courseId,
      semesterId: semesterId.toString(),
    };
    onAssignTeacher(payload, {
      onSuccess: () => {
        toast.success({
          message: 'Assign Teacher',
          description: 'The teacher has been assigned successfully.',
        });
        onClose();
      },
      onError: () => {
        toast.error({
          message: 'Assign Teacher',
          description: 'The teacher could not be assigned.',
        });
      },
    });
  }, [toast, onAssignTeacher, courseId, semesterId, onClose]);

  const handleRemoveTeacher = useCallback((teacherId: string) => {
    const payload: RemovalTeacherFromCoursePayload = {
      teacherId: teacherId || '',
      courseIds: courseId,
      semesterId: semesterId.toString(),
    };
    
    onRemoveTeacherFromCourses(payload, {
      onSuccess: () => {
        toast.success({
          message: 'Remove Teacher',
          description: 'The teacher has been remove successfully.',
        });
        onClose();
      },
      onError: () => {
        toast.error({
          message: 'Remove Teacher',
          description: 'The teacher could not be removed.',
        });
      },
    });

    
  }, [toast, onRemoveTeacherFromCourses, courseId, semesterId, onClose]);

  const columns: ProColumns<TeacherResponse>[] = useMemo(
    () => allColumns({ handleAssignTeacher, handleRemoveTeacher}),
    [handleAssignTeacher, handleRemoveTeacher],
  );


  return (
    <Modal
      title={`Teachers List`}
      centered
      open={open}
      //onOk={handleAssignTeacher()}
      onCancel={onClose}
      okText="Add"
      width={1000}
      confirmLoading={isLoading}
    >
      <ProTable<TeacherResponse>
        dataSource={teachers}
        columns={columns}
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
          total: totalElements
        }}
        // rowSelection={{
        //   onChange: handleAddSelectionChange,
        //   selectedRowKeys: selectedRowBaseCourses, // Dùng selectedRowKeys để phản ánh realtime
        // }}
        dateFormatter="string"
        headerTitle="Base Course Management"
        options={false}
      />
    </Modal>
  );
};

export default OpenTeacherModal;
