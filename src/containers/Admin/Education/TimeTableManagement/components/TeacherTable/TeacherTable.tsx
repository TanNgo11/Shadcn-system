import ProTable, { ProColumns } from '@ant-design/pro-table';
import { TeacherResponse } from '@queries/Teachers/types';
import { useGetAllTeachesHaveCourseInSemester } from '@queries/Teachers/useGetAllTeachersHaveCourseInSemester';
import { teacherColumns } from './teacherColumns';
import { useCallback, useMemo } from 'react';
import { allColumns } from '../../allColumns';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';

const TeacherTableActions = ({ semesterId }: { semesterId?: string }) => {
  const { teachers, totalElements, setParams } = useGetAllTeachesHaveCourseInSemester({
    semesterId,
    defaultParams: { current: 1, pageSize: 10 },
  });
  const navigate = useNavigate();

  const columns: ProColumns<TeacherResponse>[] = useMemo(() => teacherColumns({}), []);

  return (
    <ProTable<TeacherResponse>
      dataSource={teachers}
      columns={columns}
      cardBordered
      rowKey="id"
      search={false}
      pagination={{
        pageSizeOptions: [10, 20, 50],
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
        onChange: (current, pageSize) => {
          setParams({ current, pageSize });
        },
      }}
      dateFormatter="string"
      headerTitle="Teachers List"
      onRow={(record, _) => {
        return {
          onClick: () => {
            navigate(
              PATHS.TIME_SLOT_TEACHER_SEMESTER_MANAGER.replace(
                ':teacherId',
                record.id.toString() || '',
              ).replace(':semesterId', semesterId || ''),
            );
          },
          style: { cursor: 'pointer' },
        };
      }}
    />
  );
};

export default TeacherTableActions;
