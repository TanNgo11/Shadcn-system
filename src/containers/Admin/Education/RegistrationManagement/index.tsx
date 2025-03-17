import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { GetPropertiesParams } from '@queries';
import { RegistrationResponse } from '@queries/Registration/types';
import useApproveRegistrations from '@queries/Registration/useApproveRegistrations';
import useGetAllRegistrationInSemester from '@queries/Registration/useGetAllRegistrationInSemeseter';
import { useGetCurrentOpenSemester } from '@queries/Semester/useGetCurrentOpenSemester';
import { Button } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allColumns } from './allColumns';

export default function RegistrationManagement() {
  const toast = useNotification();
  const { semester } = useGetCurrentOpenSemester();
  const navigate = useNavigate();
  const [propertiesParams, setPropertiesParams] = useState<GetPropertiesParams>({
    semesterId: semester?.id,
  });
  const { onApproveRegistrations, isSuccess } = useApproveRegistrations({
    onSuccess: () => {
      toast.success({
        message: 'Create base course successfully',
      });
      handleInvalidateAllRegistrations();
    },
    onError: (error) => {
      toast.error({
        message: 'Create base course failed',
        description: error.message,
      });
    },
  });
  const { allRegistrations, setParams, handleInvalidateAllRegistrations } =
    useGetAllRegistrationInSemester();
  const actionRef = useRef<ActionType>();
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  const handleApproveRegistration = (selectedRows: string[]) => {
    onApproveRegistrations({ semesterId: semester?.id, registrationIds: selectedRows });
  };

  const columns: ProColumns<RegistrationResponse>[] = useMemo(() => allColumns(), []);

  return (
    <ProTable<RegistrationResponse>
      dataSource={allRegistrations}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (_params, _sort, _filter) => {
        if (semester?.id) {
          setParams({ semesterId: semester.id });
        }
        return {
          data: allRegistrations,
          success: true,
          total: allRegistrations.length,
        };
      }}
      rowKey="id"
      search={{
        layout: 'vertical',
      }}
      rowSelection={{
        onChange: (_selectedRowKeys, selectedRows) => {
          setSelectedRow(selectedRows.map((row) => row.id));
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
        pageSize: 5,
        showSizeChanger: false,
        total: allRegistrations.length,
      }}
      dateFormatter="string"
      headerTitle="Course Management"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(`/admin/courses-management/create`);
          }}
          type="default"
        >
          Add New
        </Button>,

        selectedRow.length > 0 && (
          <Button key="button" onClick={() => handleApproveRegistration(selectedRow)}>
            Approve
          </Button>
        ),
      ]}
    />
  );
}
