import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';
import { BlogsResponse, useGetAllBlogs } from '@/queries';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allColumns } from './allColumns';

const BlogList = () => {
  const navigate = useNavigate();

  const { blogs, setParams, totalElements } = useGetAllBlogs();

  const columns = useMemo(() => allColumns({ navigate }), [navigate]);
  return (
    <ProTable<BlogsResponse>
    rowKey="id"
    dataSource={blogs}
      columns={columns}
      request={async (params) => {
        const { current, pageSize, ...restParams } = params;
        setParams({
          current: current ?? 1,
          pageSize: pageSize ?? 10,
          ...restParams,
        });
        return {
          data: blogs,
          success: true,
          total: totalElements,
        };
      }}
      pagination={{
        total: totalElements,
        showSizeChanger: true,
        defaultPageSize: 10,
      }}
      cardBordered
      search={false}
      options={false}
      headerTitle="Blog Management"
      dateFormatter="string"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate(PATHS.ADD_BLOG);
          }}
          type="primary"
        >
          Add Blog
        </Button>,
      ]}
    />
  );
};

export default BlogList;
