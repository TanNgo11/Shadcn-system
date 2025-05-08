import { Callback } from '@/utils/helpers';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox, message, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { DepartmentResponse } from '@/queries/Departments/types';
import { useNavigate } from 'react-router-dom';

type DepartmentsProps = {
  handleEditDepartment: Callback;
  handleDeleteDepartment: Callback;
  handleCellClick: Callback;
};

// Notification box to confirm the deletion of a Department
const confirm: PopconfirmProps['onConfirm'] = () => {
  //handleDeleteDepartment(_record.id, Action.DELETE);
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = () => {
  message.error('Click on No');
};

export const allColumns = ({
  handleCellClick,
}: DepartmentsProps): ProColumns<DepartmentResponse>[] => [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    render: (_text, record: DepartmentResponse) => (
      <Checkbox
        onChange={(e: { target: { checked: any } }) => console.log(e.target.checked, record)}
      />
    ),
  },
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
  },
  {
    title: 'Department Name',
    dataIndex: 'departmentName',
    valueType: 'text',
    onCell: (_record) => {
      return {
        onClick: () => {
          handleCellClick(_record);
        },
      };
    },
  },
  // {
  //   title: 'Department Code',
  //   dataIndex: 'departmentCode',
  //   valueType: 'text',
  // },
  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => console.log('edit department')} />
      </a>,
      <a key="delete">
        {/* <Popconfirm
          title="Are you sure to delete this Department?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        ></Popconfirm> */}
        <DeleteOutlined
          onClick={() => {
            console.log('Delete department ' + _record.id);
          }}
        />
      </a>,
    ],
  },
];
