import { StudentResponse, StudentStatus } from '@/queries/Students/types';
import { useGetStudentsList } from '@/queries/Students/useGetStudentsList';
import { FileExcelOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageLoading, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Popconfirm, PopconfirmProps, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { allColumns } from './allColumns';
import { Action, splitFullName, transformSortParams } from './helpers';
import { useUpdateListStudentStatus } from '@/queries/Students/useUpdateListStudentStatus';
import Dragger from 'antd/es/upload/Dragger';
import { UploadProps } from 'antd/lib';
import { useUploadStudents } from '@/queries/Students/useUploadStudents';
import { useNotification } from '@/containers/StartupContainers/ToastContainer';
import { useDeleteStudentByUsernames } from '@/queries/Students/useDeleteStudentByUsernames';
import './styles.scss';

export default function HomePage() {
  const navigate = useNavigate();
  const toast = useNotification();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const searchParam = useSearchParams();
  const [selectedRowUsernames, setSelectedRowUsernames] = useState<string[]>([]);
  const {
    students,
    setParams,
    handleInvalidateStudentsList,
    totalPages,
    current,
    pageSize,
    totalElements,
  } = useGetStudentsList({
    defaultParams: {
      current: 1,
      pageSize: 10,
    },
  });

  console.log('student', students);
  // Handle row selection
  const handleRowSelectionChange = (_: any, selectedRows: StudentResponse[]) => {
    const selectedUsernames = selectedRows.map((row) => row.username);
    setSelectedRowUsernames(selectedUsernames);
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
  const { onUploadStudents, isLoading } = useUploadStudents({
    onSuccess: async () => {
      toast.success({
        message: 'Create student successfully',
        description: 'You have successfully created a new student.',
      });
      handleInvalidateStudentsList({
        current: 1,
        pageSize: 10,
      });
    },
  });

  const { onDeleteStudentByUsernames } = useDeleteStudentByUsernames({
    onSuccess: async () => {
      toast.success({
        message: 'Delete student successfully',
        description: 'You have successfully deleted a new student.',
      });
      handleInvalidateStudentsList({});
    },
    onError: (error) => {
      toast.error({
        message: 'Delete student failed',
        description: error.message,
      });
    },
  });

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

  // Handle delete student
  const handleDeleteStudent = useCallback(
    (username: string[], action: Action) => {
      if (action === Action.DELETE) {
        onDeleteStudentByUsernames(username);
      }
    },
    [onDeleteStudentByUsernames],
  );

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Cancel Action');
  };

  // Notification box to confirm the deletion of a teacher
  const confirm =
    (handleDeleteStudent: any, usernames: string[]): PopconfirmProps['onConfirm'] =>
    () => {
      if (usernames.length > 0) {
        handleDeleteStudent(usernames, Action.DELETE);
      }
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
    <>
      <Spin spinning={isLoading} tip="Loading...">
        <Modal
          title="Title"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>
            {
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company
                  data or other banned files.
                </p>
              </Dragger>
            }
          </p>
        </Modal>
        <ProTable<StudentResponse>
          dataSource={students}
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (_params, _sort, _filter) => {
            if (_sort && Object.keys(_sort).length > 0) {
              const { sortBy, sortDirection } = transformSortParams(
                Object.keys(_sort).reduce(
                  (acc, key) => {
                    acc[key] = _sort[key] as string;
                    return acc;
                  },
                  {} as Record<string, string>,
                ),
              );

              setParams({
                ..._params,
                current: 1,
                pageSize: _params.pageSize,
                sortDirection: sortDirection,
                sortBy: sortBy,
              });
            } else {
              setParams({
                ..._params,
                current: 1,
                pageSize: _params.pageSize,
                sortDirection: undefined,
                sortBy: undefined,
              });
            }

            return {
              data: students,
              success: true,
              total: students.length,
            };
          }}
          search={{
            layout: 'vertical',
          }}
          columnsState={{
            persistenceKey: 'pro-table-single-demos',
            persistenceType: 'localStorage',
            defaultValue: {
              option: { fixed: 'right', disable: true },
              lastName: { show: false },
              phoneNumber: { show: false },
              address: { show: true },
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
            showSizeChanger: true,
            current: current,
            pageSize: pageSize,
            total: totalElements,
            onChange: (current: any, pageSize: any) => {
              setParams((prev) => ({
                ...prev,
                current,
                pageSize,
              }));
            },
          }}
          dateFormatter="string"
          headerTitle="Advanced"
          rowSelection={{
            onChange: handleRowSelectionChange,
            defaultSelectedRowKeys: selectedRowUsernames,
          }}
          toolBarRender={() => [
            selectedRowUsernames.length > 0 && (
              <Popconfirm
                title="Are you sure to delete this teacher?"
                onCancel={cancel}
                onConfirm={confirm(handleDeleteStudent, selectedRowUsernames)}
                cancelText="Cancel"
                okText="Yes"
              >
                <Button key="button" danger type="primary">
                  Delete
                </Button>
              </Popconfirm>
            ),
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                navigate('/admin/teachers/create');
              }}
              type="primary"
            >
              Add New
            </Button>,
            <Button onClick={showModal} key="excel-button" icon={<FileExcelOutlined />}>
              Import Excel
            </Button>,
          ]}
        />
      </Spin>
    </>
  );
}
