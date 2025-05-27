import { AcademicYearResponse } from '@/queries/AcademicYear/types';
import { useGetAcademicYearList } from '@/queries/AcademicYear/useGetAcademicYearList';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { allColumns } from './allColumns';
import { Action } from './helpers';
import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';

export default function HomePage() {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

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
        navigate(`${id}`);
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
      }}
      rowKey="id"
      options={false}
      search={false}
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
      headerTitle="Academic Year List"
      onRow={(record, _) => {
        return {
          onClick: () => {
            navigate(PATHS.SEMESTER_MANAGEMENT.replace(':id', record.id));
          },
          style: { cursor: 'pointer' },
        };
      }}
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/admin/academic-years-management/create');
          }}
          type="primary"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
