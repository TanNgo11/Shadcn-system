import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
  Image,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { BlogsPayload, useAddBlog, useGetAllBlogs, useGetAllTags } from '@queries';
import { initData } from './helpers';
import { useNotification } from '@/containers/StartupContainers';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { UploadOutlined } from '@ant-design/icons';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

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
    onError: (err) => {
      const errorMessage = err.message || 'Blog creation failed';
      toast.error({ message: errorMessage });
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // URL cho preview

  const onSubmit = (data: BlogsPayload) => {
    onAddBlog({ ...data, userId: user.id });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogsPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initData,
  });

  useEffect(() => {
    setParams({ take: 9999 });
  }, []);

  const thumbnail = watch('thumbnail');

  useEffect(() => {
    if (thumbnail instanceof File) {
      const url = URL.createObjectURL(thumbnail);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [thumbnail]);

  const uploadProps = {
    name: 'thumbnail',
    multiple: false,
    beforeUpload: (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error({ message: 'File size exceeds 2MB limit' });
        return Upload.LIST_IGNORE;
      }
      setValue('thumbnail', file, { shouldValidate: true });
      return false;
    },
    onRemove: () => {
      setValue('thumbnail', null);
    }
  };

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
                  <Select
                    options={tags?.map((tag) => ({ label: tag.name, value: tag.name })) || []}
                    {...field}
                    placeholder="Enter Tags"
                    mode="tags"
                  />
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
            <Row gutter={16}>
              <Col span={8}>
                <Typography.Title level={4}>Thumbnail</Typography.Title>
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Col>
              <Col span={16}>
                <Typography.Title level={4}>Preview</Typography.Title>
                <Image width={600} src={previewUrl} />
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ marginTop: '32px' }}>
            <Controller
              name="content"
              control={control}
              render={({ field: { value, onChange } }) => (
                <JoditEditor
                  value={value}
                  config={{
                    readonly: false,
                    placeholder: 'Start typings...',
                    uploader: { insertImageAsBase64URI: true },
                    spellcheck: true,
                    toolbarInlineForSelection: true,
                    showPlaceholder: false,
                    disablePlugins:
                      'xpath,add-new-line,ai-assistant,class-span,video,table-keyboard-navigation,iframe,media,powered-by-jodit,file',
                  }}
                  onChange={onChange}
                />
              )}
            />
          </Col>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button style={{ marginTop: '16px' }} type="primary" htmlType="submit">
              Create
            </Button>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreateEditBlog;
