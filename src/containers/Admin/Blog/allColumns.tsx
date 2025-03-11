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
      return <p>{(value as TagsResponse[])?.map((tag) => tag.name)}</p>;
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
  {
    title: 'Actions',
    valueType: 'option',
    render: (_text, record) => <ActionDialog actions={getBlogActions(record, props.navigate)} />,
  },
];
