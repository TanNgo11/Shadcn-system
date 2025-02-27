import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseResponse } from './helpers';
import { allColumns } from './allColumns';
import { useGetBaseCoursesInDepartmentById } from '@/queries/Departments/useGetBaseCoursesInDepartmentById';
import React from 'react';
import { Button } from 'antd';
import { BackwardOutlined, PlusOutlined } from '@ant-design/icons';
import { BaseCourseResponse } from '@/queries/Courses/types';

export default function ViewCoursesDepartment() {
  const toast = useNotification();
  const navigate = useNavigate();
  const { id } = useParams();
  const departmentId = id || '';
  const { baseCourses } = useGetBaseCoursesInDepartmentById({
    id: departmentId,
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });
  const { handleInvalidateDepartmentList } = useGetDepartmentList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleBack = useCallback(() => {
    navigate(`/admin/departments-management`);
  }, [navigate]);

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

  const columns: ProColumns<BaseCourseResponse>[] = useMemo(
    () =>
      allColumns({
        handleEditCourse,
        handleDeleteCourse,
      }),
    [handleEditCourse, handleDeleteCourse],
  );

  const actionRef = React.useRef<ActionType>();

  return (
    <ProTable<BaseCourseResponse>
      dataSource={baseCourses}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (_params, _sort, _filter) => {
        return {
          data: baseCourses,
          success: true,
          total: baseCourses.length,
        };
      }}
      columnsState={{
        persistenceKey: 'pro-table-single-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
          startYear: { show: true },
          endYear: { show: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
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
      headerTitle="Advanced"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<BackwardOutlined />}
          onClick={() => {
            handleBack();
          }}
          type="primary"
        >
          Go Back to Department
        </Button>,
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(`/admin/departments-management`);
          }}
          type="default"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
