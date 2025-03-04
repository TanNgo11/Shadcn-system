import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ProTable
        columns={[]}
        cardBordered
        search={false}
        options={false}
        headerTitle="Blog Management"
        scroll={{ x: 1300 }}
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
    </div>
  );
}

export default BlogList