import { useGetBlogById } from '@queries/Blogs/useGetBlogById';
import { Col, Image, Row, Spin, Tag, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const PreviewBlog = () => {
  const { id } = useParams<{ id: string }>();
  const { blog: blogData, isFetching: isBlogLoading, error } = useGetBlogById(Number(id));

  if (isBlogLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="Loading blog..." />
      </div>
    );
  }

  if (!blogData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Typography.Text>Blog not found {error ? `(Error: ${error.message})` : ''}</Typography.Text>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {blogData.thumbnailUrl && (
        <Col span={24}>
          <Image
            src={blogData.thumbnailUrl}
            alt="Blog thumbnail"
            width="100%"
            style={{ maxHeight: '400px', objectFit: 'fill' }}
          />
        </Col>
      )}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={2}>{blogData.title}</Typography.Title>
        </Col>

        <Col span={24}>
          <div
            dangerouslySetInnerHTML={{ __html: blogData.content || '' }}
            style={{ lineHeight: '1.6', fontSize: '16px' }}
          />
        </Col>

        {blogData.tags && blogData.tags.length > 0 && (
          <Col span={24}>
            <Typography.Text strong>Tags: </Typography.Text>
            {blogData.tags.map((tag) => (
              <Tag key={tag.id || tag.name || tag.toString()} color="blue" style={{ marginRight: '8px' }}>
                {tag.name || tag.toString()}
              </Tag>
            ))}
          </Col>
        )}

        <Col span={24}>
          <Typography.Text type="secondary">
            Allow Comments: {blogData.allowComments ? 'Yes' : 'No'} | Mobile Optimized:{' '}
            {blogData.isMobile ? 'Yes' : 'No'}
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default PreviewBlog;
