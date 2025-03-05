import { BlogsResponse, Tag } from '@/queries';
import { StudentResponse } from '@/queries/Students/types';
import { formatDate } from '@/utils';
import { Callback } from '@/utils/helpers';
import { EditOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd/lib';

type Props = {};

export const allColumns = (): ProColumns<BlogsResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    valueType: 'text',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    valueType: 'text',
    render: (value) => {
      return <p>{(value as Tag[])?.map((tag) => tag.name)}</p>;
    },
  },
  {
    title: 'Uploaded By',
    dataIndex: 'fullName',
    valueType: 'text',
  },
  {
    title: 'Created At',
    dataIndex: 'createdDate',
    valueType: 'text',
    render: (value) => <p>{formatDate(value as string)}</p>,
  },
];
