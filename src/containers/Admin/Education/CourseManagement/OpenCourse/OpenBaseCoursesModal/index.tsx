import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetBaseCoursesInDepartmentById } from '@/queries/Departments/useGetBaseCoursesInDepartmentById';
import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Modal } from 'antd/lib';
import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCourseResponse } from '../../helpers';
import { allColumns } from './allColumns';
import { useAddBaseCourseToSemester } from '@/queries/Semester/useAddBaseCourseToSemester';
import { useGetOpenCoursesInDepartmentById } from '@/queries/Semester/useGetOpenCoursesInDepartmentById';
import { useGetUnOpenedBaseCoursesInDepartmentById } from '@/queries/Semester/useGetUnOpenedBaseCoursesInDepartment';

interface OpenBaseCoursesModalProps {
  department?: string;
  open: boolean;
  onClose: () => void;
  semesterId: number;
}

const OpenBaseCoursesModal: React.FC<OpenBaseCoursesModalProps> = ({
  department,
  open,
  onClose,
  semesterId,
}) => {
  const [selectedRowBaseCourses, setSelectedRowBaseCourses] = useState<string[]>([]);

  const toast = useNotification();
  const { id } = useParams<{ id: string }>();
  const [departmentId, setDepartmentId] = useState<string>(department || id || '');
  const { departments } = useGetDepartmentList({
    defaultParams: {
      current: 1,
      pageSize: 100,
    },
  });
  const { handleInvalidateSemesterList } = useGetOpenCoursesInDepartmentById({
    departmentId: departmentId,
    semesterId: id,
  });
  const { handleInvalidateUnOpenedBaseCoursesInDepartment } =
    useGetUnOpenedBaseCoursesInDepartmentById({
      semesterId: semesterId.toString(),
      departmentId: departmentId,
      defaultParams: {
        current: 1,
        pageSize: 100,
      },
    });

  // const { baseCourses } = useGetBaseCoursesInDepartmentById({
  //   id: departmentId,
  //   defaultParams: {
  //     current: 1,
  //     pageSize: 10,
  //   },
  // });

  const { baseCourses } = useGetUnOpenedBaseCoursesInDepartmentById({
    semesterId: semesterId.toString(),
    departmentId: departmentId,
    defaultParams: {
      current: 1,
      pageSize: 100,
    },
  });

  const { onAddBaseCourseToSemester, isLoading } = useAddBaseCourseToSemester({
    onSuccess: () => {
      toast.success({
        message: 'Success',
        description: 'Base courses added to semester successfully!',
      });
      handleInvalidateSemesterList();
      handleInvalidateUnOpenedBaseCoursesInDepartment();
      setSelectedRowBaseCourses([]);
      onClose();
    },
    onError: (error: any) => {
      toast.error({
        message: 'Error',
        description: error.message || 'Failed to add base courses.',
      });
    },
  });

  React.useEffect(() => {
    setDepartmentId(department ?? id ?? '');
  }, [department, id]);

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

  const handleRowSelectionChange = (_: any, selectedRows: BaseCourseResponse[]) => {
    const selectedBaseCourses = selectedRows.map((row) => row.id);
    setSelectedRowBaseCourses(selectedBaseCourses);
  };

  const columns: ProColumns<BaseCourseResponse>[] = useMemo(
    () => allColumns({ handleDeleteCourse, handleEditCourse }),
    [handleEditCourse, handleDeleteCourse],
  );

  const handleAddCourse = () => {
    if (typeof semesterId !== 'number') {
      toast.warning({
        message: 'Warning',
        description: 'Semester ID is missing.',
      });
      return;
    }
    if (selectedRowBaseCourses.length === 0) {
      toast.warning({
        message: 'Warning',
        description: 'Please select at least one course.',
      });
      return;
    }

    // Chuyển selectedRowBaseCourses từ string[] sang number[]
    const ids = selectedRowBaseCourses.map((id) => parseInt(id, 10));

    // Gọi mutation để thêm base courses vào semester
    onAddBaseCourseToSemester({ semesterId, ids });
  };

  return (
    <Modal
      title={`Department: ${departments.find((dept) => dept.id === departmentId)?.departmentName || ''}`}
      centered
      open={open}
      onOk={handleAddCourse} // Gọi handleAddCourse khi bấm "Add10"
      onCancel={onClose}
      okText="Add" // Văn bản nút OK là "Add"
      width={1000}
      confirmLoading={isLoading} // Hiển thị loading khi mutation chạy
    >
      <ProTable<BaseCourseResponse>
        dataSource={baseCourses}
        columns={columns}
        cardBordered
        request={async (_params, _sort, _filter) => {
          return {
            data: baseCourses,
            success: true,
            total: baseCourses.length,
          };
        }}
        rowKey="id"
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
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50, 100],
          showTotal: (total: number) => `Total ${total} items`,
        }}
        rowSelection={{
          onChange: handleRowSelectionChange,
          selectedRowKeys: selectedRowBaseCourses, // Dùng selectedRowKeys để phản ánh realtime
        }}
        dateFormatter="string"
        headerTitle="Base Course Management"
        options={false}
      />
    </Modal>
  );
};

export default OpenBaseCoursesModal;
