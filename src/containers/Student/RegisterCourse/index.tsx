import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, Select, Typography } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCoursePayload, CourseResponse } from '../helpers';
import { allColumns } from './allColumns';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetOpenCoursesInDepartmentById } from '@/queries/Semester/useGetOpenCoursesInDepartmentById';
import { useModal } from '@/hooks/useModal';
import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import { useGetCurrentOpenSemester } from '@/queries/Semester/useGetCurrentOpenSemester';

const StudentRegisterCourse: React.FC<Props> = () => {
  const toast = useNotification();
  const { student, handleInvalidCurrentStudent } = useGetCurrentStudentInfo();
  const { semester } = useGetCurrentOpenSemester();

  const [departmentId, setDepartmentId] = useState<string>(student?.departmentId || '');
  const [selectedRows, setSelectedRows] = useState<CourseResponse[]>([]);

  useEffect(() => {
    if (student) {
      setDepartmentId(student.departmentId);
    } else {
      handleInvalidCurrentStudent();
    }
  }, [student]);

  const handleEditCourse = () => {
    toast.error({
      message: 'Edit Course',
      description: 'The course could not be edited.',
    });
  };

  const handleDeleteCourse = () => {
    toast.error({
      message: 'Delete Course',
      description: 'The course could not be deleted.',
    });
  };

  const handleRegisterCourses = () => {
    toast.success({
      message: 'Courses Registered',
      description: `Successfully registered ${selectedRows.length} course(s).`,
    });
    setSelectedRows([]);
  };

  // Get open courses in department
  const { semesters: openCourses } = useGetOpenCoursesInDepartmentById({
    departmentId: departmentId,
    semesterId: semester?.id || '',
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ProColumns<CourseResponse>[] = useMemo(
    () =>
      allColumns({
        handleDeleteCourse,
        handleEditCourse,
      }),
    [handleEditCourse, handleDeleteCourse],
  );

  return (
    <>
      <ProTable<CourseResponse>
        dataSource={openCourses}
        columns={columns}
        cardBordered
        request={async (_params, _sort, _filter) => {
          return {
            data: openCourses,
            success: true,
            total: openCourses.length,
          };
        }}
        rowKey="code"
        search={false}
        rowSelection={{
          onChange: (_, selectedRows: CourseResponse[]) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          selectedRows.length > 0 && (
            <Button type="primary" onClick={handleRegisterCourses}>
              Register Selected Courses
            </Button>
          ),
        ]}
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
        headerTitle="Opening Course Management"
      />
    </>
  );
};

type Props = {
  children?: React.ReactNode;
};

export default StudentRegisterCourse;
