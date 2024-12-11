import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { allColumns } from './allColumns';
import { useNavigate } from 'react-router-dom';
import { Action } from './helpers';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetAcademicYearList } from '@/queries/AcademicYear/useGetAcademicYearList';
import { AcademicYearResponse } from '@/queries/AcademicYear/types';

export default function HomePage() {
  const navigate = useNavigate();
  const toast = useNotification();
  const actionRef = useRef<ActionType>();
  const { handleInvalidateAcademicYearList } = useGetAcademicYearList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });
  // const { onDeleteAcademicYearById } = useDeleteAcademicYearById({
  //   onSuccess: async () => {
  //     toast.success({
  //       message: 'Delete Academic year successfully',
  //       description: 'You have successfully deleted a new AcademicYear.',
  //     });
  //     handleInvalidateAcademicYearList({
  //       current: 1,
  //       pageSize: 10,
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error({
  //       message: 'Delete Academic Year failed',
  //       description: error.message,
  //     });
  //   },
  // });

  const { academicYears } = useGetAcademicYearList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  // const handleDeleteAcademicYear = useCallback(
  //   (id: string, action: Action) => {
  //     if (action === Action.DELETE) {
  //       onDeleteAcademicYearById(id);
  //     }
  //   },
  //   [onDeleteAcademicYearById],
  // );

  const handleEditAcademicYear = useCallback(
    (id: string, action: Action) => {
      if (action === Action.EDIT) {
        navigate(`/admin/academic-years/${id}`);
      }
    },
    [navigate],
  );

  const handleDeleteAcademicYear = useCallback((id: string, action: Action) => {
    if (action === Action.DELETE) {
      // onDeleteAcademicYearById(id);
    }
  }, []);

  const columns: ProColumns<AcademicYearResponse>[] = useMemo(
    () =>
      allColumns({
        handleEditAcademicYear,
        handleDeleteAcademicYear,
      }),
    [handleEditAcademicYear, handleDeleteAcademicYear],
  );

  return (
    <ProTable<AcademicYearResponse>
      dataSource={academicYears}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (_params, _sort, _filter) => {
        return {
          data: academicYears,
          success: true,
          total: academicYears.length,
        };
      }}
      columnsState={{
        persistenceKey: 'pro-table-single-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
          startYear: { show: true },
          endYear: { show: true },
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
        pageSize: 10,
        onChange: (page: any) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Advanced"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/admin/academic-year/create');
          }}
          type="primary"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
