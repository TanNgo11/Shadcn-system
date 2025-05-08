import {Callback} from '@/utils/helpers';
import {ProColumns} from '@ant-design/pro-table';
import {TeacherResponse} from '@queries/Teachers/types';
import {Button, message, Popconfirm} from 'antd';
import {PopconfirmProps} from 'antd/lib';

type TeachersProps = {
  handleRemoveTeacher: Callback;
};

// Popconfirm handlers
const confirm: PopconfirmProps['onConfirm'] = () => {
  message.success('Teacher removed successfully');
};

const cancel: PopconfirmProps['onCancel'] = () => {
  message.error('Action cancelled');
};

// ValueEnum for entityId
const valueEnum = {
  1: {text: 'Option 1'},
  2: {text: 'Option 2'},
  3: {text: 'Option 3'},
};

export const teachersAllColumns = ({handleRemoveTeacher}: TeachersProps): ProColumns<TeacherResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    hidden: true,
    search: false,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    valueType: 'text',
    render: (_, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'Entity ID',
    dataIndex: 'entityId',
    valueType: 'select',
    renderFormItem: () => (
      <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    valueType: 'option',
    render: (_, record) => [
      <Popconfirm
        key="remove"
        title="Are you sure you want to remove this teacher?"
        onConfirm={() => {
          handleRemoveTeacher(record.id);
          confirm();
        }}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Remove</Button>
      </Popconfirm>,
    ],
  },
];