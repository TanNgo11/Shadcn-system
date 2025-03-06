import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Card, Col, Row, Select, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { CourseResponse, StudentRegisterCoursePayload } from '../helpers';
import { allColumns } from './allColumns';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetOpenCoursesInDepartmentById } from '@/queries/Semester/useGetOpenCoursesInDepartmentById';
import { useGetCurrentStudentInfo } from '@/queries/Students/useGetCurrentStudentInfo';
import { useGetCurrentOpenSemester } from '@/queries/Semester/useGetCurrentOpenSemester';
import { useRegisterCourseForStudent } from '@/queries/Students/useRegisterCourseForStudent';
import { useGetRegisteredCourseForStudent } from '@/queries/Registration/useGetRegisteredCourseForStudent';
import { useGetUnregisteredCourseForStudent } from '@/queries/Registration/useGetUnregisteredCourseForStudent';

const StudentRegisterCourse: React.FC = () => {
  const toast = useNotification();
  const { student } = useGetCurrentStudentInfo();
  const { semester } = useGetCurrentOpenSemester();

  const { departments } = useGetDepartmentList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const [departmentId, setDepartmentId] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<CourseResponse[]>([]);
  const [registeredRows, setRegisteredRows] = useState<CourseResponse[]>([]);
  const [departmentName, setDepartmentName] = useState<string>('');

  // Initialize student department when data is available
  useEffect(() => {
    if (student?.departmentId) {
      setDepartmentId(student.departmentId);
    }
  }, [student]);


  // Update department name when department changes
  useEffect(() => {
    if (departments.length > 0 && departmentId) {
      const department = departments.find((dep) => dep.id === departmentId);
      setDepartmentName(department?.departmentName || '');
    }
  }, [departments, departmentId]);

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
      studentId: student.studentId,
      courseIds: selectedRows.map((row) => row.id),
      semesterId: semester.id,
    };

    onRegisterCourse(payload);
  };

  useGetOpenCoursesInDepartmentById({
    departmentId,
    semesterId: semester?.id || '',
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });


  const { unregisteredCourses, handleInvalidateUnregisteredCourses } =
    useGetUnregisteredCourseForStudent({
      courseParams: {
        studentId: student?.studentId || "",
        semesterId: semester?.id || "",
        departmentId
      },
      tableParams: {
        current: 1,
        pageSize: 10,
      },
    });

  
  const { registeredCourses, handleInvalidateRegisteredCourses } = useGetRegisteredCourseForStudent(
    {
      courseParams: {
        studentId: student?.studentId || '',
        semesterId: semester?.id || '',
        departmentId,
      },
      tableParams: {
        current: 1,
        pageSize: 10,
      },
    },
  );




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
        options={false}
        request={async () => ({
          data: unregisteredCourses,
          success: true,
          total: unregisteredCourses.length,
        })}
        rowKey="code"
        search={false}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
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
          syncToUrl: (values, type) => {
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
        }}
        dateFormatter="string"
        headerTitle="Opening Course Management"
      />

      <ProTable<CourseResponse>
        dataSource={registeredCourses}
        columns={columns}
        cardBordered
        request={async () => ({
          data: registeredCourses,
          success: true,
          total: registeredCourses.length,
        })}
        options={false}
        rowKey="code"
        search={false}
        rowSelection={{
          onChange: (_, registeredRows) => setRegisteredRows(registeredRows),
        }}
        toolBarRender={() =>
          registeredRows.length > 0
            ? [
                <Button key="registered" type="primary" onClick={() => console.log('register')}>
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
    </>
  );
};

export default StudentRegisterCourse;
