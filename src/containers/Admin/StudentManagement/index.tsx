import { StudentResponse, StudentStatus } from '@/queries/Students/types';
import { useGetStudentsList } from '@/queries/Students/useGetStudentsList';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allColumns } from './allColumns';
import { Action } from './helpers';
import { useUpdateListStudentStatus } from '@/queries/Students/useUpdateListStudentStatus';

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const { students, setParams } = useGetStudentsList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });
  const handleRowSelectionChange = (_: any, selectedRows: StudentResponse[]) => {
    const selectedIds = selectedRows.map((row) => row.id);
    setSelectedRowIds(selectedIds);
  };
  const handleEditStudent = useCallback(
    (id: string, action: Action) => {
      if (action === Action.EDIT) {
        navigate(`/admin/students/${id}`);
      }
    },
    [navigate],
  );
  const { onUpdateStudentStatus } = useUpdateListStudentStatus();

  const handleDeleteStudent = () => {
    onUpdateStudentStatus({
      ids: selectedRowIds.map((id) => Number(id)),
      status: StudentStatus.INACTIVE,
    });
  };

  const columns: ProColumns<StudentResponse>[] = useMemo(
    () => allColumns({ handleEditStudent }),
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
        syncToUrl: (values: { startTime: any; endTime: any }, type: string) => {
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
        selectedRowKeys: selectedRowIds,
      }}
      toolBarRender={() => [
        selectedRowIds.length > 0 && (
          <Button key="button" danger type="primary" onClick={handleDeleteStudent}>
            Delete
          </Button>
        ),
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/admin/students/create');
          }}
          type="primary"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
