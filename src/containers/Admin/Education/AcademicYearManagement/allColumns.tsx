import { AcademicYearResponse } from '@/queries/AcademicYear/types';
import { Callback } from '@/utils/helpers';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { message, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib';
import { Action } from './helpers';

type ListAcademicYearsProps = {
  handleEditAcademicYear: Callback;
  handleDeleteAcademicYear: Callback;
};

// Notification box to confirm the deletion of a AcademicYear
const confirm: PopconfirmProps['onConfirm'] = (e) => {
  //handleDeleteAcademicYear(_record.id, Action.DELETE);
  message.success('Click on Yes');
};

const cancel: PopconfirmProps['onCancel'] = (e) => {
  console.log(e);
  message.error('Click on No');
};

export const allColumns = ({
  handleEditAcademicYear,
  handleDeleteAcademicYear,
}: ListAcademicYearsProps): ProColumns<AcademicYearResponse>[] => [

  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
  },
  {
    title: 'Start Year',
    dataIndex: 'startYear',
    valueType: 'text',
  },
  {
    title: 'End Year',
    dataIndex: 'endYear',
    valueType: 'text',
  },
  {
    title: 'Option',
    valueType: 'option',
    key: 'option',
    render: (_text, record) => [
      <a key="editable">
        <EditOutlined onClick={() => handleEditAcademicYear(record.id, Action.EDIT)} />
      </a>,
      <a key="delete">
        <Popconfirm
          title="Are you sure to delete this Academic Year?"
          onConfirm={() => handleDeleteAcademicYear(record.id, Action.DELETE)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      </a>,
    ],
  },
];
