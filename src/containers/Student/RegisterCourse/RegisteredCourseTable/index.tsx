import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetRegisteredCourseForStudent } from '@/queries/Registration/useGetRegisteredCourseForStudent';
import { useGetUnregisteredCourseForStudent } from '@/queries/Registration/useGetUnregisteredCourseForStudent';
import { useRemoveRegistrations } from '@/queries/Registration/useRemoveRegistrations';
import { useGetCurrentOpenSemester } from '@/queries/Semester/useGetCurrentOpenSemester';
import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { CourseResponse, RemovalRegisterCourseForStudentPayload } from '../../helpers';
import { allColumns } from './allColumns';

const RegisteredCourseTable: React.FC = () => {
  const toast = useNotification();
  const { student } = useGetCurrentStudentInfo();
  const { semester } = useGetCurrentOpenSemester();
  const actionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<CourseResponse[]>([]);

  const { handleInvalidateUnregisteredCourses } = useGetUnregisteredCourseForStudent();

  const { registeredCourses, handleInvalidateRegisteredCourses, setParams, totalElements } =
    useGetRegisteredCourseForStudent();

  const { onRemoveRegistrations } = useRemoveRegistrations({
    onSuccess: () => {
      toast.success({
        message: 'Courses Removed',
        description: `Successfully removed ${selectedRows.length} course(s).`,
      });
      handleInvalidateRegisteredCourses();
      handleInvalidateUnregisteredCourses();
    },
    onError: (error) => {
      toast.error({
        message: 'Courses Removal Failed',
        description: error.message,
      });
    },
  });

  const handleRemoveRegisteredCourses = () => {
    if (!student?.studentId || !semester?.id) {
      toast.error({
        message: 'Registration Error',
        description: 'Missing student or semester information',
      });
      return;
    }

    const payload: RemovalRegisterCourseForStudentPayload = {
      studentId: student.id,
      courseCodes: selectedRows.map((row) => row.code),
      semesterId: semester.id,
    };

    onRemoveRegistrations(payload);
    setSelectedRows([]);
  };

  const columns: ProColumns<CourseResponse>[] = useMemo(() => allColumns(), []);

  return (
    <ProTable<CourseResponse>
      actionRef={actionRef}
      dataSource={registeredCourses}
      columns={columns}
      cardBordered
      request={async (params) => {
        const { current, pageSize, ...restParams } = params;
        setParams({
          current: current ?? 1,
          pageSize: pageSize ?? 20,
          studentId: student?.id,
          semesterId: semester?.id,
          departmentId: student?.departmentId,
          ...restParams,
        });

        return {
          data: registeredCourses,
          success: true,
          total: totalElements,
        };
      }}
      options={false}
      rowKey="code"
      search={{
        filterType: 'light',
      }}
      rowSelection={{
        onChange: (_, registeredRows) => setSelectedRows(registeredRows),
      }}
      toolBarRender={() =>
        selectedRows.length > 0
          ? [
              <Button
                key="registered"
                type="primary"
                onClick={() => handleRemoveRegisteredCourses()}
              >
                Remove
              </Button>,
            ]
          : []
      }
      pagination={false}
      dateFormatter="string"
      headerTitle="Registered Courses"
      style={{ marginTop: 20 }}
    />
  );
};

export default RegisteredCourseTable;
