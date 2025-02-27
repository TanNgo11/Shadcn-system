import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, Select, Typography } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { any } from 'zod';
import { BaseCoursePayload, CourseResponse } from '../helpers';
import { allColumns } from './allColumns';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import OpenBaseCoursesModal from './OpenBaseCoursesModal';
import { useGetOpenCoursesInDepartmentById } from '@/queries/Semester/useGetOpenCoursesInDepartmentById';
import { useModal } from '@/hooks/useModal';

const OpenCourse: React.FC<Props> = () => {
  const toast = useNotification();

  const { id } = useParams<{ id: string }>();
  const [departmentId, setDepartmentId] = React.useState<string>('');
  const actionRef = useRef<ActionType>();

  const { departments } = useGetDepartmentList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

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

  // Get open courses in department
  const { semesters: openCourses } = useGetOpenCoursesInDepartmentById({
    departmentId: departmentId,
    semesterId: id,
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  // Handle open base courses modal
  const handleOpenBaseCourses = () => {
    return;
  };

  const columns: ProColumns<CourseResponse>[] = useMemo(
    () =>
      allColumns({
        handleDeleteCourse,
        handleEditCourse,
      }),
    [handleEditCourse, handleDeleteCourse],
  );
  const { isOpen, open, close } = useModal();
  return (
    <>
      <Card style={{ marginBottom: 20 }}>
        <Typography.Title level={4}>Open Courses</Typography.Title>
        <Select
          placeholder="Select department"
          style={{ width: 200 }}
          onChange={(value) => {
            setDepartmentId(value);
          }}
        >
          {departments.map((department) => (
            <Select.Option key={department.id} value={department.id}>
              {department.departmentName}
            </Select.Option>
          ))}
        </Select>
        <Button type="primary" onClick={open} style={{ margin: '0 10px' }}>
          Select Base Courses
        </Button>
        <OpenBaseCoursesModal department={departmentId} open={isOpen} onClose={close} />
      </Card>

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
        rowKey="id"
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
        headerTitle="Course Management"
      />
    </>
  );
};

type Props = {
  children?: React.ReactNode;
};

export default OpenCourse;
