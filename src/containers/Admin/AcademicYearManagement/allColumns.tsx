import { Callback } from '@/utils/helpers';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Checkbox, message, Popconfirm } from 'antd';
import { Gender } from '../components/types';
import { Action } from './helpers';
import { PopconfirmProps } from 'antd/lib';
import { AcademicYearResponse } from '@/queries/AcademicYear/types';

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

export const allColumns = ({}: ListAcademicYearsProps): ProColumns<AcademicYearResponse>[] => [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    render: (_text, record) => (
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
    render: (_text, _record, _) => [
      <a key="editable">
        <EditOutlined onClick={() => console.log('edit academic year')} />
      </a>,
      <a key="delete">
        {/* <Popconfirm
          title="Are you sure to delete this AcademicYear?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        ></Popconfirm> */}
        <DeleteOutlined
          onClick={() => {
            console.log('Delete AcademicYear ' + _record.id);
          }}
        />
      </a>,
    ],
  },
];
