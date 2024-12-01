import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { allColumns } from './allColumns';
import { useNavigate } from 'react-router-dom';
import { TeacherResponse } from '@/queries/Teachers/types';
import { useGetTeachersList } from '@/queries/Teachers/useGetTeachersList';
import { Action } from './helpers';
import { useDeleteTeacherById } from '@/queries/Teachers/useDeleteTeacherById';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetTeacherById } from '@/queries/Teachers/useGetTeacherById';

export default function HomePage() {
  const navigate = useNavigate();
  const toast = useNotification();
  const actionRef = useRef<ActionType>();
  const { handleInvalidateTeachersList } = useGetTeachersList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const { onDeleteTeacherById } = useDeleteTeacherById({
    onSuccess: async () => {
      toast.success({
        message: 'Delete teacher successfully',
        description: 'You have successfully deleted a new teacher.',
      });
      // Reload the teachers list after deleting a teacher
      handleInvalidateTeachersList({
        current: 1,
        pageSize: 10,
      });
    },
    onError: (error) => {
      toast.error({
        message: 'Delete teacher failed',
        description: error.message,
      });
    },
  });

  const { teachers } = useGetTeachersList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleDeleteTeacher = useCallback(
    (id: string, action: Action) => {
      if (action === Action.DELETE) {
        onDeleteTeacherById(id);
      }
    },
    [onDeleteTeacherById],
  );

  const handleEditTeacher = useCallback(
    (id: string, action: Action) => {
      if (action === Action.EDIT) {
        navigate(`/admin/teachers/${id}`);
      }
    },
    [navigate],
  );

  const columns: ProColumns<TeacherResponse>[] = useMemo(
    () =>
      allColumns({
        handleEditTeacher: handleEditTeacher,
        handleDeleteTeacher: handleDeleteTeacher,
      }),
    [handleEditTeacher, handleDeleteTeacher],
  );

  return (
    <ProTable<TeacherResponse>
      dataSource={teachers}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (_params, _sort, _filter) => {
        return {
          data: teachers,
          success: true,
          total: teachers.length,
        };
      }}
      columnsState={{
        persistenceKey: 'pro-table-single-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
          lastName: { show: false },
          phoneNumber: { show: false },
          address: { show: true },
          citizenId: { show: false },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      options={{
        setting: {
          listsHeight: 400,
        },
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
        pageSize: 8,
        onChange: (page: any) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Advanced"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/admin/teachers/create');
          }}
          type="primary"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
