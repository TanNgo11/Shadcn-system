import { useGetAllCourse } from '@/queries/Courses/useGetAllCourses';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseResponse } from '../DepartmentManagement/ViewCoursesDepartment/helpers';
import { allColumns } from './allColumns';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { Button } from 'antd';
import { BackwardOutlined, PlusOutlined } from '@ant-design/icons';
import { BaseCourseResponse } from './helpers';

export default function CourseManagement() {
  const toast = useNotification();
  const navigate = useNavigate();
  const { courses, setParams, handleInvalidateCoursesList } = useGetAllCourse({
    tableParams: {
      current: 1,
      pageSize: 10,
    },
  });
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);

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
      search={{
        layout: 'vertical',
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
