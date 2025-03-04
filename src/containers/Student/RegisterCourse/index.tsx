import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, Select, Typography } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCoursePayload, CourseResponse, StudentRegisterCoursePayload } from '../helpers';
import { allColumns } from './allColumns';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetOpenCoursesInDepartmentById } from '@/queries/Semester/useGetOpenCoursesInDepartmentById';
import { useModal } from '@/hooks/useModal';
import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import { useGetCurrentOpenSemester } from '@/queries/Semester/useGetCurrentOpenSemester';
import { useRegisterCourseForStudent } from '@/queries/Students/useRegisterCourseForStudent';

const StudentRegisterCourse: React.FC<Props> = () => {
  const toast = useNotification();
  const { student, handleInvalidCurrentStudent } = useGetCurrentStudentInfo();
  const { semester } = useGetCurrentOpenSemester();

  const [departmentId, setDepartmentId] = useState<string>(student?.departmentId || '');
  const [selectedRows, setSelectedRows] = useState<CourseResponse[]>([]);
  const [registerPayload, setRegisterPayload] = useState<StudentRegisterCoursePayload | null>(null);

  useEffect(() => {
    if (student) {
      setDepartmentId(student.departmentId);
    } else {
      handleInvalidCurrentStudent();
    }
  }, [student]);

  useEffect(() => {
    if (registerPayload) {
      handleRegisterCourses();
    }
  }, [registerPayload]);

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

  const { onRegisterCourse } = useRegisterCourseForStudent({
    onSuccess: () => {
      toast.success({
        message: 'Courses Registered',
        description: `Successfully registered ${selectedRows.length} course(s).`,
      });
      setSelectedRows(selectedRows);
    },
    onError: (error) => {
      toast.error({
        message: 'Courses Registration Failed',
        description: error.message,
      });
    },
  });

  const handleRegisterCourses = () => {
    if (registerPayload) {
      onRegisterCourse(registerPayload);
    }
  };

  const { semesters: openCourses } = useGetOpenCoursesInDepartmentById({
    departmentId,
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
    [],
  );

  return (
    <ProTable<CourseResponse>
      dataSource={openCourses}
      columns={columns}
      cardBordered
      request={async (_params, _sort, _filter) => ({
        data: openCourses,
        success: true,
        total: openCourses.length,
      })}
      rowKey="code"
      search={false}
      rowSelection={{
        onChange: (_, selectedRows: CourseResponse[]) => {
          setSelectedRows(selectedRows);
        },
      }}
      toolBarRender={() =>
        selectedRows.length > 0
          ? [
              <Button
                key="register"
                type="primary"
                onClick={() => {
                  setRegisterPayload({
                    studentId: student?.studentId || '',
                    courseIds: selectedRows.map((row) => row.id),
                    semesterId: semester?.id || '',
                  });
                }}
              >
                Register
              </Button>,
            ]
          : []
      }
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
  );
};

type Props = {
  children?: React.ReactNode;
};

export default StudentRegisterCourse;
