import ProTable, { ProColumns } from '@ant-design/pro-table';
import { TeacherResponse } from '@queries/Teachers/types';
import { useGetAllTeachesHaveCourseInSemester } from '@queries/Teachers/useGetAllTeachersHaveCourseInSemester';
import { teacherColumns } from './teacherColumns';
import { useCallback, useMemo, useState } from 'react';
import { allColumns } from '../../allColumns';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';
import { useModal } from '@/hooks/useModal';
import TeacherCalendarModal from '../TeacherCalendarTable';
import TimetableModal from '../TimetableModal';

const TeacherTableActions = ({ semesterId }: { semesterId?: string }) => {
  const { teachers, totalElements, setParams } = useGetAllTeachesHaveCourseInSemester({
    semesterId,
    defaultParams: { current: 1, pageSize: 10 },
  });
  const navigate = useNavigate();
  const { open: openModal, close: closeModal, isOpen: isModalOpen } = useModal();
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherResponse>();
  const columns: ProColumns<TeacherResponse>[] = useMemo(() => teacherColumns({}), []);

  const handleRowClick = (teacher: TeacherResponse) => {
    setSelectedTeacher(teacher);
    openModal();
  };

  return (
    <>
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
              handleRowClick(record);
              // navigate(
              //   PATHS.TIME_SLOT_TEACHER_SEMESTER_MANAGER.replace(
              //     ':teacherId',
              //     record.id.toString() || '',
              //   ).replace(':semesterId', semesterId || ''),
              // );
            },
            style: { cursor: 'pointer' },
          };
        }}
      />
      {semesterId && selectedTeacher && (
        <TeacherCalendarModal
          open={isModalOpen}
          onCancel={() => closeModal()}
          semesterId={semesterId}
          teacherId={selectedTeacher.id.toString()}
        />
      )}
    </>
  );
};

export default TeacherTableActions;
