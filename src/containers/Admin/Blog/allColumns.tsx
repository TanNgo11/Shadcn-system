import ActionDialog from '@/components/ui/ActionsDialog';
import { formatDate } from '@/utils';
import { Callback } from '@/utils/helpers';
import { ProColumns } from '@ant-design/pro-table';
import { BlogsResponse, TagsResponse } from '@queries';
import { getBlogActions } from './helpers';


type Props ={
  navigate: Callback;
}
export const allColumns = (props: Props): ProColumns<BlogsResponse>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'text',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    valueType: 'text',
    key: 'title',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    valueType: 'text',
    render: (value) => {
      return <p>{(value as TagsResponse[])?.map((tag) => tag.name)}</p>;
    },
    key: 'tags',
  },
  {
    title: 'Uploaded By',
    dataIndex: 'fullName',
    valueType: 'text',
    key: 'fullName',
  },
  {
    title: 'Created At',
    dataIndex: 'createdDate',
    valueType: 'text',
    render: (value) => <p>{formatDate(value as string)}</p>,
    key: 'createdDate',
  },
  {
    title: 'Actions',
    valueType: 'option',
    render: (_text, record) => <ActionDialog actions={getBlogActions(record, props.navigate)} />,
    key: 'actions',
  },
];
