import { StudentResponse, StudentStatus } from '@/queries/Students/types';
import { useGetStudentsList } from '@/queries/Students/useGetStudentsList';
import { FileExcelOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { allColumns } from './allColumns';
import { Action } from './helpers';
import { useUpdateListStudentStatus } from '@/queries/Students/useUpdateListStudentStatus';
import Dragger from 'antd/es/upload/Dragger';
import { UploadProps } from 'antd/lib';
import { useUploadStudents } from '@/queries/Students/useUploadStudents';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';

export default function HomePage() {
  const navigate = useNavigate();
  const toast = useNotification();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const searchParam = useSearchParams();
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const { students, setParams, handleInvalidateStudentsList } = useGetStudentsList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });
  console.log('student', students);
  const handleRowSelectionChange = (_: any, selectedRows: StudentResponse[]) => {
    const selectedIds = selectedRows.map((row) => row.id);
    setSelectedRowIds(selectedIds);
  };
  const handleEditStudent = useCallback(
    (id: string, action: Action) => {
      if (action === Action.EDIT) {
        navigate(`/admin/students/${id}`);
      }
    },
    [navigate],
  );
  const { onUpdateStudentStatus } = useUpdateListStudentStatus();
  const { onUploadStudents } = useUploadStudents();

  const handleDeleteStudent = () => {
    onUpdateStudentStatus({
      ids: selectedRowIds.map((id) => Number(id)),
      status: StudentStatus.INACTIVE,
    });
  };

  const columns: ProColumns<StudentResponse>[] = useMemo(
    () => allColumns({ handleEditStudent }),
    [handleEditStudent],
  );

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const actionRef = useRef<ActionType>();

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append('file', file as File);

        onUploadStudents(formData);
        if (onSuccess) onSuccess('ok');
        toast.success({
          message: 'Create student successfully',
          description: 'You have successfully created a new student.',
        });
        handleInvalidateStudentsList({
          current: 1,
          pageSize: 10,
        });
        setOpen(false);
      } catch (error) {}
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop: (e) => {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <ProTable<StudentResponse>
      dataSource={students}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (_params, _sort, _filter) => {
        return {
          data: students,
          success: true,
          total: students.length,
        };
      }}
      columnsState={{
        persistenceKey: 'pro-table-single-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
          lastName: { show: false },
          phoneNumber: { show: false },
          address: { show: false },
          citizenId: { show: false },
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
        // showSizeChanger: true,
        // onChange: (current: any, pageSize: any) => {
        //   setParams((prev) => ({
        //     ...prev,
        //     current,
        //     pageSize,
        //   }));
        // },
        pageSize: 8,
        onChange: (page: any) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Advanced"
      rowSelection={{
        onChange: handleRowSelectionChange,
        selectedRowKeys: selectedRowIds,
      }}
      toolBarRender={() => [
        selectedRowIds.length > 0 && (
          <Button key="button" danger type="primary" onClick={handleDeleteStudent}>
            Delete
          </Button>
        ),
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/admin/students/create');
          }}
          type="primary"
        >
          Add New
        </Button>,
      ]}
    />
  );
}
