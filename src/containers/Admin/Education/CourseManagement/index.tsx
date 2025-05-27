import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetAllCourse } from '@/queries/Courses/useGetAllCourses';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allColumns } from './allColumns';
import { BaseCourseResponse } from './helpers';
import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';

export default function CourseManagement() {
  const toast = useNotification();
  const navigate = useNavigate();
  const { courses } = useGetAllCourse({
    tableParams: {
      current: 1,
      pageSize: 10,
    },
  });
  const actionRef = useRef<ActionType>();

  const handleEditCourse = useCallback(() => {
    toast.error({
      message: 'Edit Course',
      description: 'The course could not be edited.',
    });
  }, [toast]);

  const handleDeleteCourse = useCallback(() => {
    toast.error({
      message: 'Delete Course',
      description: 'The course could not be deleted.',
    });
  }, [toast]);

  const columns: ProColumns<BaseCourseResponse>[] = useMemo(
    () =>
      allColumns({
        handleDeleteCourse,
        handleEditCourse,
      }),
    [handleEditCourse, handleDeleteCourse],
  );

  return (
    <ProTable<BaseCourseResponse>
      dataSource={courses}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (_params, _sort, _filter) => {
        return {
          data: courses,
          success: true,
          total: courses.length,
        };
      }}
      rowKey="id"
      search={false}
      options={false}
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
        pageSizeOptions: [10, 20, 50, 100],
        showSizeChanger: true,
        showTotal: (total: number) => `Total ${total} items`,
        onChange: (page: any) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Course Management"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(`/admin/courses-management/create`);
          }}
          type="primary"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
