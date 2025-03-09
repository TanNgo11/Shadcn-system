import { Button, Card, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { BlogsPayload, useAddBlog, useGetAllBlogs, useGetAllTags } from '@queries';
import { initData } from './helpers';
import { useNotification } from '@/containers/StartupContainers';
import { useAuthStore } from '@/zustand/auth/useAuthStore';

const CreateEditBlog = () => {
  const { user } = useAuthStore();
  const toast = useNotification();
  const { tags, setParams } = useGetAllTags();
  const { handleInvalidateBlogsList } = useGetAllBlogs();
  const { onAddBlog } = useAddBlog({
    onSuccess: () => {
      toast.success({ message: 'Blog created successfully' });
      handleInvalidateBlogsList();
    },
    onError: () => {
      toast.error({ message: 'Blog creation failed' });
    },
  });
  const onSubmit = (data: BlogsPayload) => {
    onAddBlog({ ...data, userId: user.id });
  };

  const tagOptions = tags?.map((tag) => ({ label: tag.name, value: tag.name })) || [];
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typings...',
      uploader: {
        insertImageAsBase64URI: true,
      },
      spellcheck: true,
      toolbarInlineForSelection: true,
      showPlaceholder: false,
    }),
    [],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogsPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // resolver: zodResolver(baseCourseCreationSchema),
    defaultValues: initData,
  });

  useEffect(() => {
    setParams({
      take: 9999,
    });
  }, []);

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Card title={'Create Blog'}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Title">
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Enter Title" />}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tags">
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Select options={tagOptions} {...field} placeholder="Enter Tags" mode="tags" />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Allow Comments">
              <Controller
                name="allowComments"
                control={control}
                render={({ field: { value, ...fields } }) => (
                  <Checkbox {...fields} checked={value} />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Controller
              name="content"
              control={control}
              render={({ field: { value, onChange } }) => (
                <JoditEditor value={value} config={config} tabIndex={5} onChange={onChange} />
              )}
            />
          </Col>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button style={{ marginTop: '16px' }} type="primary" htmlType="submit">
              {'Create'}
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateEditBlog;
