import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useGetBaseCoursesInDepartmentById } from '@/queries/Departments/useGetBaseCoursesInDepartmentById';
import { useGetDepartmentList } from '@/queries/Departments/useGetDepartmentList';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Flex, Modal } from 'antd/lib';
import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseCourseResponse } from '../../helpers';
import { allColumns } from './allColumns';

interface OpenBaseCoursesModalProps {
  department?: string;
  open: boolean;
  onClose: () => void; 
}

const OpenBaseCoursesModal: React.FC<OpenBaseCoursesModalProps> = ({
  department,
  open,
  onClose,
}) => {
  const [selectedRowBaseCourses, setSelectedRowBaseCourses] = useState<string[]>([]);

  const toast = useNotification();
  const { id } = useParams<{ id: string }>();
  const [departmentId, setDepartmentId] = React.useState<string>(department || '');
  const actionRef = useRef<ActionType>();

  const { departments } = useGetDepartmentList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  React.useEffect(() => {
    setDepartmentId(department || '');
  }, [department]);

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

  const { baseCourses } = useGetBaseCoursesInDepartmentById({
    id: departmentId,
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleRowSelectionChange = (_: any, selectedRows: BaseCourseResponse[]) => {
    const selectedBaseCourses = selectedRows.map((row) => row.id);
    setSelectedRowBaseCourses(selectedBaseCourses);
  };

  const columns: ProColumns<BaseCourseResponse>[] = useMemo(
    () => allColumns({ handleDeleteCourse, handleEditCourse }),
    [handleEditCourse, handleDeleteCourse],
  );

  return (
    <Modal
      title={`Department: ${departments.find((dept) => dept.id === departmentId)?.departmentName || ''}`}
      centered
      open={open} 
      onOk={onClose}
      onCancel={onClose} 
      width={1000}
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
          pageSize: 10,
          onChange: (page: any) => console.log(page),
        }}
        rowSelection={{
          onChange: handleRowSelectionChange,
          defaultSelectedRowKeys: selectedRowBaseCourses,
        }}
        dateFormatter="string"
        headerTitle="Base Course Management"
      />
    </Modal>
  );
};

export default OpenBaseCoursesModal;
