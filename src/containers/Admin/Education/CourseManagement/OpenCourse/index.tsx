import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, message, Popconfirm, PopconfirmProps, Select, Typography } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Action, BaseCoursePayload, CourseResponse } from '../helpers';
import { allColumns } from './allColumns';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import OpenBaseCoursesModal from './OpenBaseCoursesModal';
import { useGetOpenCoursesInDepartmentById } from '@/queries/Semester/useGetOpenCoursesInDepartmentById';
import { useModal } from '@/hooks/useModal';
import { useDeleteCoursesByIds } from '@/queries/Semester/useDeleteCoursesByIds';

const OpenCourse: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useNotification();
  const actionRef = useRef<ActionType>();

  const [departmentId, setDepartmentId] = React.useState<string>('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const { departments } = useGetDepartmentList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const { handleInvalidateSemesterList } = useGetOpenCoursesInDepartmentById();
  
  // Handle row selection
  const handleRowSelectionChange = (_: any, selectedRows: CourseResponse[]) => {
    const selectedIds = selectedRows.map((row) => row.id);
    setSelectedRowIds(selectedIds);
  };


  const handleEditCourse = () => {
    toast.error({
      message: 'Edit Course',
      description: 'The course could not be edited.',
    });
  };


  const { onDeleteCoursesByIds } = useDeleteCoursesByIds({
    onSuccess: async () => {
      toast.success({
        message: 'Delete courses successfully',
        description: 'You have successfully deleted.',
      });
      handleInvalidateSemesterList();
    },
    onError: (error) => {
      toast.error({
        message: 'Delete course failed',
        description: error.message,
      });
    },
  });

  const handleDeleteCourse = useCallback(
    (id: string[], action: Action) => {
      if (action === Action.DELETE) {
        onDeleteCoursesByIds(id);
      }
    },
    [onDeleteCoursesByIds],
  );

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
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Cancel Action');
  };

  const confirm =
    (handleDeleteCourse: any, courseIds: string[]): PopconfirmProps['onConfirm'] =>
      () => {
        if (courseIds.length > 0) {
          handleDeleteCourse(courseIds, Action.DELETE);
        }
      };
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
          Add Base Courses
        </Button>
        <OpenBaseCoursesModal
          semesterId={Number(id)}
          department={departmentId}
          open={isOpen}
          onClose={close}
        />
      </Card>

      <ProTable<CourseResponse>
        actionRef={actionRef}
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
        toolBarRender={() => [
          selectedRowIds.length > 0 && (
            <Popconfirm
              title="Are you sure to delete these courses?"
              onCancel={cancel}
              onConfirm={confirm(handleDeleteCourse, selectedRowIds)}
              cancelText="Cancel"
              okText="Yes"
            >
              <Button key="button" danger type="primary">
                Delete
              </Button>
            </Popconfirm>
          ),
        ]}
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
        headerTitle="Opening Course Management"
        rowSelection={{
          onChange: handleRowSelectionChange,
          defaultSelectedRowKeys: selectedRowIds,
        }}
      />
    </>
  );
};

type Props = {
  children?: React.ReactNode;
};

export default OpenCourse;
