import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCallback, useMemo, useRef } from 'react';
import { allColumns } from './allColumns';
import { useNavigate } from 'react-router-dom';
import { TeacherResponse } from '@/queries/Teachers/types';
import { useGetTeachersList } from '@/queries/Teachers/useGetTeachersList';

export default function HomePage() {
  const navigate = useNavigate();
  const { teachers } = useGetTeachersList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleEditTeacher = useCallback(
    (id: string) => {
      navigate(`/admin/teachers/${id}`);
    },
    [navigate],
  );

  const columns: ProColumns<TeacherResponse>[] = useMemo(
    () => allColumns({ handleViewTeacherDetail: handleEditTeacher }),
    [handleEditTeacher],
  );

  const actionRef = useRef<ActionType>();

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
          address: { show: false },
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
        syncToUrl: (values, type) => {
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
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Advanced"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            const newId = teachers.length + 1; // Example logic to generate new ID
            console.log(`New record ID: ${newId}`);
            actionRef.current?.reload();
          }}
          type="primary"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
