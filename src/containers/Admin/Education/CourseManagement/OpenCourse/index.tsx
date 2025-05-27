import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useModal } from '@/hooks/useModal';
import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import { useDeleteCoursesByIds } from '@/queries/Semester/useDeleteCoursesByIds';
import { useGetOpenCoursesInDepartmentById } from '@/queries/Semester/useGetOpenCoursesInDepartmentById';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, message, Popconfirm, PopconfirmProps, Select, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Action, CourseResponse } from '../helpers';
import { allColumns } from './allColumns';
import OpenTeacherModal from './AssignTeachersModal';
import OpenBaseCoursesModal from './OpenBaseCoursesModal';
import { TeacherRole } from '@queries/Registration/types';

const OpenCourse: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useNotification();
  const actionRef = useRef<ActionType | null>(null);

  const [departmentId, setDepartmentId] = React.useState<string>('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const { departments, isFetching:isLoadingDepartments } = useGetDepartmentList({
    defaultParams: {
      current: 1,
      pageSize: 100,
    },
  });

  const {
    semesters: openCourses,
    handleInvalidateSemesterList,
    setParams,
    totalElements,
  } = useGetOpenCoursesInDepartmentById({
    departmentId: departmentId,
    semesterId: String(id),
  });

  // Handle row selection
  const handleRowSelectionChange = (_: any, selectedRows: CourseResponse[]) => {
    const selectedIds = selectedRows.map((row) => row.id);
    setSelectedRowIds(selectedIds);
  };

  const handleEditCourse = useCallback(() => {
    toast.error({
      message: 'Edit Course',
      description: 'The course could not be edited.',
    });
  }, [toast]);

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

  // Assign teachers to courses
  const handleAssignTeachers = useCallback(
    (courseId: string, role: TeacherRole) => {
      toast.error({
        message: 'Assign Teachers',
        description: 'The teachers could not be assigned.',
      });
    },
    [toast],
  );

  const columns: ProColumns<CourseResponse>[] = useMemo(
    () =>
      allColumns({
        handleAssignTeachers,
        semesterId: id,
        departmentId: departmentId,
      }),
    [handleAssignTeachers, id, departmentId],
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

  const {
    isOpen: isBaseCourseModalOpen,
    open: openBaseCourseModal,
    close: closeBaseCourseModal,
  } = useModal();
  const {
    isOpen: isTeacherModalOpen,
    open: openTeacherModal,
    close: closeTeacherModal,
  } = useModal();
  useEffect(() => {
    if (!isLoadingDepartments && departments.length > 0 && !departmentId) {
      setDepartmentId(departments[0].id);
    }
  }, [departments, departmentId, isLoadingDepartments]);
  return (
    <>
      <Card style={{ marginBottom: 20 }}>
        <Typography.Title level={4}>Open Courses</Typography.Title>
        <Select
          placeholder="Select department"
          style={{ width: 200 }}
          value={departmentId || undefined}
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
        <Button
          type="primary"
          onClick={openBaseCourseModal}
          style={{ margin: '0 10px' }}
          disabled={!departmentId}
        >
          Add Base Courses
        </Button>
        {isBaseCourseModalOpen && (
          <OpenBaseCoursesModal
            semesterId={Number(id)}
            department={departmentId}
            open={isBaseCourseModalOpen}
            onClose={closeBaseCourseModal}
          />
        )}
      </Card>

      <ProTable<CourseResponse>
        actionRef={actionRef}
        dataSource={openCourses}
        columns={columns}
        cardBordered
        options={false}
        request={async (_params, _sort, _filter) => {
          const { current, pageSize, ...restParams } = _params;
          setParams({
            current: current ?? 1,
            pageSize: pageSize ?? 10,
            ...restParams,
          });
          return {
            data: openCourses,
            success: true,
            total: totalElements,
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
                Remove
              </Button>
            </Popconfirm>
          ),
          selectedRowIds.length === 1 && (
            <>
              <Button type="primary" onClick={openTeacherModal} style={{ margin: '0 10px' }}>
                Assign Teacher
              </Button>
              {isTeacherModalOpen && (
                <OpenTeacherModal
                  semesterId={Number(id)}
                  courseId={selectedRowIds}
                  open={isTeacherModalOpen}
                  onClose={closeTeacherModal}
                  departmentId={departmentId}
                />
              )}
              {selectedRowIds.length > 1 && setSelectedRowIds([])}
            </>
          ),
        ]}
        rowKey="id"
        search={false}
        pagination={{
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          showPrevNextJumpers: true,
          total: totalElements,
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
