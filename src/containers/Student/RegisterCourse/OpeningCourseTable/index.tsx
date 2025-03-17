import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import { useGetUnregisteredCourseForStudent } from '@/queries/Registration/useGetUnregisteredCourseForStudent';
import { useGetCurrentOpenSemester } from '@/queries/Semester/useGetCurrentOpenSemester';
import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import { useRegisterCourseForStudent } from '@/queries/Students/useRegisterCourseForStudent';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, Col, Row, Select, Typography } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { CourseResponse, StudentRegisterCoursePayload } from '../../helpers';
import { allColumns } from './allColumns';
import { useGetRegisteredCourseForStudent } from '@/queries/Registration/useGetRegisteredCourseForStudent';

const StudentRegisterCourse: React.FC = () => {
  const toast = useNotification();
  const { student } = useGetCurrentStudentInfo();
  const { semester } = useGetCurrentOpenSemester();
  const actionRef = useRef<ActionType>();
  const { departments } = useGetDepartmentList({
    enabled: true,
  });

  const [departmentId, setDepartmentId] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<CourseResponse[]>([]);

  const departmentName = departments?.find(
    (dep) => Number(dep?.id) === Number(student?.departmentId),
  )?.departmentName;

  const { handleInvalidateRegisteredCourses } = useGetRegisteredCourseForStudent();

  const { onRegisterCourse } = useRegisterCourseForStudent({
    onSuccess: () => {
      toast.success({
        message: 'Courses Registered',
        description: `Successfully registered ${selectedRows.length} course(s).`,
      });
      handleInvalidateRegisteredCourses();
      handleInvalidateUnregisteredCourses();
    },
    onError: (error) => {
      toast.error({
        message: 'Courses Registration Failed',
        description: error.message,
      });
    },
  });

  const handleRegisterCourses = () => {
    if (!student?.studentId || !semester?.id) {
      toast.error({
        message: 'Registration Error',
        description: 'Missing student or semester information',
      });
      return;
    }

    const payload: StudentRegisterCoursePayload = {
      studentId: student.id,
      courseIds: selectedRows.map((row) => row.id),
      semesterId: semester.id,
    };

    onRegisterCourse(payload);
  };

  const { unregisteredCourses, handleInvalidateUnregisteredCourses, setParams, totalElements } =
    useGetUnregisteredCourseForStudent();

  const columns: ProColumns<CourseResponse>[] = useMemo(() => allColumns(), []);

  return (
    <>
      <Card style={{ marginBottom: 20 }}>
        <Col>
          <Typography.Title level={4}>Department: {departmentName}</Typography.Title>
          <Row style={{ justifyContent: 'space-between' }}>
            <Typography.Title level={5}>Year: 2024 - 2025</Typography.Title>
            <Select value={departmentId} onChange={setDepartmentId} style={{ width: 200 }}>
              <Select.Option value={student?.departmentId || ''}>{student?.faculty}</Select.Option>
            </Select>
          </Row>
        </Col>
      </Card>

      <ProTable<CourseResponse>
        dataSource={unregisteredCourses}
        columns={columns}
        cardBordered
        actionRef={actionRef}
        rowKey="code"
        search={{
          filterType: 'light',
        }}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
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
            data: unregisteredCourses,
            success: true,
            total: totalElements,
          };
        }}
        toolBarRender={() =>
          selectedRows.length > 0
            ? [
                <Button key="register" type="primary" onClick={handleRegisterCourses}>
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
              };
            }
            return values;
          },
        }}
        pagination={{
          total: totalElements,
        }}
        dateFormatter="string"
        headerTitle="Opening Course Management"
        columnsState={{
          persistenceKey: 'pro-table-single-demos',
          persistenceType: 'localStorage',
        }}
      />
    </>
  );
};

export default StudentRegisterCourse;
