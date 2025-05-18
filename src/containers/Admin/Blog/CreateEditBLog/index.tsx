import { PATHS } from '@/containers/Layouts/Components/_AdminSidebarProps';
import { useNotification } from '@/containers/StartupContainers';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { UploadOutlined } from '@ant-design/icons';
import {
  API_URLS,
  BlogsPayload,
  useAddBlog,
  useGetAllBlogs,
  useGetAllTags,
  useUploadFile,
  useUpdateBlog,
} from '@queries';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from 'antd';
import JoditEditor from 'jodit-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { initData } from './helpers';
import { useGetBlogById } from '@queries/Blogs/useGetBlogById';
import './styles.scss';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const CreateEditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [content, setContent] = useState('');
  const { user } = useAuthStore();
  const toast = useNotification();

  const {
    blog: blogData,
    isFetching: isBlogLoading,
    handleInvalidateBlogById,
  } = useGetBlogById(Number(id));

  const { tags, setParams } = useGetAllTags();
  const { handleInvalidateBlogsList } = useGetAllBlogs();

  const { onAddBlog } = useAddBlog({
    onSuccess: () => {
      toast.success({ message: 'Blog created successfully' });
      handleInvalidateBlogsList();
      navigate(PATHS.BLOG);
    },
    onError: (err) => {
      toast.error({ message: err.message || 'Blog creation failed' });
    },
  });

  const { onUpdateBlog } = useUpdateBlog({
    onSuccess: () => {
      toast.success({ message: 'Blog updated successfully' });
      handleInvalidateBlogsList();
      handleInvalidateBlogById();
      navigate(PATHS.BLOG);
    },
    onError: (err: any) => {
      toast.error({ message: err.message ?? 'Blog update failed' });
    },
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<BlogsPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initData,
  });

  useEffect(() => {
    setParams({ take: 9999 });
  }, []);

  useEffect(() => {
    if (isEditMode && blogData) {
      reset({
        title: blogData.title,
        tags: blogData.tags.map((tag) => tag.name),
        allowComments: blogData.allowComments,
        isMobile: blogData.isMobile,
      });
      setContent(blogData.content || '');
      setThumbnailPreview(blogData.thumbnailUrl || null);
    }
  }, [blogData, isEditMode, reset]);

  const { onUploadFile, isLoading: isUploading } = useUploadFile({
    onError: (err) => {
      toast.error({ message: err.message || 'File upload failed' });
    },
  });

  const uploadProps = {
    name: 'thumbnail',
    multiple: false,
    fileList: thumbnailFile
      ? [{ uid: '-1', name: thumbnailFile.name, status: 'done' as const }]
      : thumbnailPreview
        ? [{ uid: '-1', name: 'Current Thumbnail', status: 'done' as const }]
        : [],
    beforeUpload: (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error({ message: 'File size exceeds 10MB limit' });
        return Upload.LIST_IGNORE;
      }
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
      return false;
    },
    onRemove: () => {
      setThumbnailFile(null);
      setThumbnailPreview(null);
    },
  };

  const editorConfig = {
    readonly: false,
    placeholder: 'Start typings...',
    spellcheck: true,
    toolbarInlineForSelection: true,
    showPlaceholder: false,
    disablePlugins:
      'xpath,add-new-line,ai-assistant,class-span,video,table-keyboard-navigation,iframe,media,powered-by-jodit,file',
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const uploadResponse = await new Promise<{ result: { downloadUri: string } }>(
      (resolve, reject) => {
        onUploadFile(formData, {
          onSuccess: resolve,
          onError: reject,
        });
      },
    );
    const downloadUri = uploadResponse?.result?.downloadUri || '';
    const cleanDownloadUri = downloadUri.startsWith('/file-svc')
      ? downloadUri.replace('/file-svc', '')
      : downloadUri;
    const url = downloadUri ? `${API_URLS.FILE}${cleanDownloadUri}` : null;
    if (!url) throw new Error('Failed to get image URL');
    return url;
  };

  const onSubmit = async (data: BlogsPayload) => {
    try {
      let finalThumbnailUrl: string | undefined | null;

      if (isEditMode) {
        if (thumbnailFile) {
          finalThumbnailUrl = await uploadImage(thumbnailFile);
        } else if (thumbnailPreview === null) {
          finalThumbnailUrl = null;
        } else {
          finalThumbnailUrl = blogData?.thumbnailUrl;
        }
      } else {
        finalThumbnailUrl = thumbnailFile ? await uploadImage(thumbnailFile) : undefined;
      }

      const payload: BlogsPayload = {
        ...data,
        userId: user.id,
        content: content,
        thumbnailUrl: finalThumbnailUrl,
      };

      if (isEditMode) {
        onUpdateBlog({ id: Number(id), data: payload });
      } else {
        onAddBlog(payload);
      }
    } catch (err) {
      toast.error({ message: `Failed to ${isEditMode ? 'update' : 'create'} blog` });
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Card title={isEditMode ? 'Edit Blog' : 'Create Blog'}>
        {isBlogLoading && isEditMode ? (
          <Typography.Text>Loading...</Typography.Text>
        ) : (
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
                      options={
                        tags?.map((tag) => ({
                          label: tag.name,
                          value: tag.name,
                        })) || []
                      }
                      {...field}
                      placeholder="Enter Tags"
                      mode="tags"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
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
            <Col span={4}>
              <Form.Item label="Is Mobile">
                <Controller
                  name="isMobile"
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
                  <Upload {...uploadProps} disabled={isUploading}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Col>
                <Col span={16}>
                  <Typography.Title level={4}>Preview</Typography.Title>
                  {thumbnailPreview ? (
                    <Image width={600} src={thumbnailPreview} alt="Thumbnail preview" />
                  ) : (
                    <div>No preview available</div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ marginTop: '32px' }} className="jodit-editor__custom">
              <JoditEditor
                value={content}
                config={editorConfig}
                onBlur={(newContent) => setContent(newContent)}
              />
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                style={{ marginTop: '16px' }}
                type="primary"
                htmlType="submit"
                disabled={isUploading || (isEditMode && isBlogLoading)}
              >
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </Col>
          </Row>
        )}
      </Card>
    </Form>
  );
};

export default CreateEditBlog;
