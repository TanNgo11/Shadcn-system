import { StudentResponse } from '@/queries/Students/types';
import { useGetStudentsList } from '@/queries/Students/useGetStudentsList';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCallback, useMemo, useRef } from 'react';
import { allColumns } from './allColumns';
import { useNavigate } from 'react-router-dom';
import { Action } from './helpers';

export default function HomePage() {
  const navigate = useNavigate();
  const { students, handleInvalidateStudentsList } = useGetStudentsList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleEditStudent = useCallback(
    (id: string, action: Action) => {
      if (action === Action.EDIT) {
        navigate(`/admin/students/${id}`);
      }
    },
    [navigate],
  );

  const columns: ProColumns<StudentResponse>[] = useMemo(
    () => allColumns({  handleEditStudent }),
    [handleEditStudent],
  );

  const actionRef = useRef<ActionType>();

  return (
    <ProTable<StudentResponse>
      dataSource={students}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (_params, _sort, _filter) => {
        return {
          data: students,
          success: true,
          total: students.length,
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
            const newId = students.length + 1;
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
