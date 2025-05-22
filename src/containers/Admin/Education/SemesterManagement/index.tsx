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
  const { semesters, setParams } = useGetSemesterList({
    defaultParams: {
      current: 1,
      pageSize: 10,
      academicYearId: id ? Number(id) : undefined,
    },
  });

  const filteredSemesters = useMemo(() => {
    if (!semesters || semesters.length === 0) return [];
    if (!id) return semesters;
    return semesters.filter((semester) => semester.academicYear?.id === Number(id)) || [];
  }, [semesters, id]);

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
      dataSource={filteredSemesters}
      columns={columns}
      cardBordered
      request={async (params) => {
        const { current, pageSize, ...restParams } = params;
        setParams({
          current: current ?? 1,
          pageSize: pageSize ?? 10,
          ...restParams,
        });
        return {
          data: filteredSemesters,
          success: true,
          total: filteredSemesters.length,
        };
      }}
      search={false}
      rowKey="id"
      pagination={{
        total: filteredSemesters.length,
      }}
      dateFormatter="string"
      headerTitle="Semester Management"
      options={false}
      onRow={(record, _) => {
        if (record.registrationOpen && record.semesterActive) {
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
