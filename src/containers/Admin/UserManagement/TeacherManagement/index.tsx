import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { allColumns } from './allColumns';
import { useNavigate } from 'react-router-dom';
import { TeacherResponse } from '@/queries/Teachers/types';
import { useGetTeachersList } from '@/queries/Teachers/useGetTeachersList';
import { Action } from './helpers';
import { useDeleteTeacherById } from '@/queries/Teachers/useDeleteTeacherById';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useDeleteTeacherByUsernames } from '@/queries/Teachers/useDeleteTeacherByUsernames';
import { PopconfirmProps } from 'antd/lib';

export default function HomePage() {
  const navigate = useNavigate();
  const toast = useNotification();
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [selectedRowUsernames, setSelectedRowUsernames] = useState<string[]>([]);
  const { teachers, handleInvalidateTeachersList, setParams } = useGetTeachersList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  // Handle delete teacher
  const { onDeleteTeacherByUsernames } = useDeleteTeacherByUsernames({
    onSuccess: async () => {
      toast.success({
        message: 'Delete teacher successfully',
        description: 'You have successfully deleted a new teacher.',
      });
      handleInvalidateTeachersList({});
    },
    onError: (error) => {
      toast.error({
        message: 'Delete teacher failed',
        description: error.message,
      });
    },
  });

  // Handle row selection
  const handleRowSelectionChange = (_: any, selectedRows: TeacherResponse[]) => {
    const selectedUsernames = selectedRows.map((row) => row.username);
    setSelectedRowUsernames(selectedUsernames);
  };

  const handleDeleteTeacher = useCallback(
    (username: string[], action: Action) => {
      if (action === Action.DELETE) {
        onDeleteTeacherByUsernames(username);
      }
    },
    [onDeleteTeacherByUsernames],
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

  // Notification box to confirm the deletion of a teacher
  const confirm =
    (handleDeleteTeacher: any, usernames: string[]): PopconfirmProps['onConfirm'] =>
    () => {
      if (usernames.length > 0) {
        handleDeleteTeacher(usernames, Action.DELETE);
      }
    };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Cancel Action');
  };

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
      search={{
        layout: 'vertical',
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
        showSizeChanger: true,
        onChange: (current: any, pageSize: any) => {
          setParams((prev) => ({
            ...prev,
            current,
            pageSize,
          }));
        },
      }}
      dateFormatter="string"
      headerTitle="Advanced"
      rowSelection={{
        onChange: handleRowSelectionChange,
        defaultSelectedRowKeys: selectedRowUsernames,
      }}
      toolBarRender={() => [
        selectedRowUsernames.length > 0 && (
          <Popconfirm
            title="Are you sure to delete this teacher?"
            onCancel={cancel}
            onConfirm={confirm(handleDeleteTeacher, selectedRowUsernames)}
            cancelText="Cancel"
            okText="Yes"
          >
            <Button key="button" danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        ),
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
