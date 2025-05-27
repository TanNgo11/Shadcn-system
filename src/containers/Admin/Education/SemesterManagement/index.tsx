import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';
import { SemesterResponse } from '@/queries/Semester';
import { useGetSemesterList } from '@/queries/Semester/useGetSemesterList';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allColumns } from './allColumns';

const SemesterManagement = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { semesters, setParams, isFetching } = useGetSemesterList();

  const handleNavigateToTimeTable = React.useCallback(
    (event: any, semesterId: string) => {
      event.stopPropagation();
      navigate(PATHS.TIME_TABLE_MANAGEMENT.replace(':semesterId', semesterId));
    },
    [navigate],
  );

  const columns: ProColumns<SemesterResponse>[] = useMemo(
    () => allColumns(handleNavigateToTimeTable),
    [handleNavigateToTimeTable],
  );

  return (
    <ProTable<SemesterResponse>
      dataSource={semesters}
      columns={columns}
      cardBordered
      loading={isFetching}
      request={async (params) => {
        const { current, pageSize, ...restParams } = params;
        setParams({
          academicYearId: id ?? '',
          current: current ?? 1,
          pageSize: pageSize ?? 10,
          ...restParams,
        });
        return {
          data: semesters,
          success: true,
          total: semesters.length,
        };
      }}
      search={false}
      rowKey="id"
      pagination={{
        total: semesters.length,
      }}
      dateFormatter="string"
      headerTitle="Semester Management"
      options={false}
      onRow={(record, _) => {
        if (record.registrationOpen) {
          return {
            onClick: () => {
              navigate(PATHS.OPEN_COURSE.replace(':id', record.id));
            },
            style: { cursor: 'pointer' },
          };
        }
        return {};
      }}
    />
  );
};

export default SemesterManagement;
