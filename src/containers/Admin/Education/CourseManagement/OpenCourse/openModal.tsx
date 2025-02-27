import { useGetBaseCoursesInDepartmentById } from "@/queries/Departments/useGetBaseCoursesInDepartmentById";
import { Button, Card, Flex, Modal, Select } from "antd/lib";
import { useMemo, useRef, useState } from "react";
import { BaseCourseResponse } from "../helpers";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { useGetDepartmentList } from "@/queries/Departments/useGetDepartmentList";
import { useParams } from "react-router-dom";
import React from "react";
import { useNotification } from "@/containers/StartupContainers/ToastContainer";
import { allColumns } from "./allColumnOpenModal";

interface OpenBaseCoursesModalProps {
  department?: string;
}

const OpenBaseCoursesModal: React.FC<OpenBaseCoursesModalProps> = ({ department }) => {
  const [open, setOpen] = useState(false);
  const [selectedRowBaseCourses, setSelectedRowBaseCourses] = useState<string[]>([]);

  const toast = useNotification();
    const { id } = useParams<{ id: string }>();
    const [departmentId, setDepartmentId] = React.useState<string>(department|| '');
    const actionRef = useRef<ActionType>();
  
    const { departments } = useGetDepartmentList({
      defaultParams: {
        current: 1,
        pageSize: 10,
        },
      }
    );

    React.useEffect(() => {
      setDepartmentId(department || '');
    }, [department, setDepartmentId]);
  
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
    const { baseCourses } = useGetBaseCoursesInDepartmentById({
      id: departmentId,
      defaultParams: {
        current: 1,
        pageSize: 10,
      },
    });

      // Handle row selection
      const handleRowSelectionChange = (_: any, selectedRows: BaseCourseResponse[]) => {
        const selectedBaseCourses = selectedRows.map((row) => row.id);
        setSelectedRowBaseCourses(selectedBaseCourses);
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
    <Flex vertical={true} gap="middle" align="flex-start" style={{ paddingTop: 20 }}>
      {/* Basic */}
      <Button type="primary" onClick={() => setOpen(true)}>
        Select Base Courses
      </Button>
      <Modal
        title={`Department: ${departments.find((department) => department.id === departmentId)?.departmentName || ''}`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {/* <Card style={{ marginBottom: 20 }}>
          <Select
            placeholder="Select department"
            style={{ width: 200}}
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
        </Card> */}

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

      {/* Responsive
      <Button type="primary" onClick={() => setOpenResponsive(true)}>
        Open Modal of responsive width
      </Button>
      <Modal
        title="Modal responsive width"
        centered
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        className="responsive-modal"
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal> */}
    </Flex>
  );
};

export default OpenBaseCoursesModal;
