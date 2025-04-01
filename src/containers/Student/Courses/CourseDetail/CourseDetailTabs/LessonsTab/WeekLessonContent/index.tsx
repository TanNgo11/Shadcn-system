import { InboxOutlined } from '@ant-design/icons';
import { API_URLS } from '@queries';
import { LessonResponse } from '@queries/Lessons';
import { Input, Typography, UploadFile } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UploadFileStatus } from 'antd/es/upload/interface';
import { UploadProps } from 'antd/lib';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type WeekLessonContentProps = {
  lesson: LessonResponse;
  isEdit: boolean;
  toggleEdit: () => void;
};

type WeekLessonContentRef = {
  submit: () => { description: string; files: UploadFile[] } | undefined;
};

const WeekLessonContent = forwardRef<WeekLessonContentRef, WeekLessonContentProps>(
  ({ lesson, isEdit, toggleEdit }, ref) => {
    const { TextArea } = Input;
    const [description, setDescription] = useState(lesson?.description || '');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
      if (lesson?.files && lesson.files.length > 0) {
        const serverFiles = lesson.files.map((file, index) => {
          const downloadUri = file.filePath || '';
          const cleanDownloadUri = downloadUri.startsWith('/file-svc')
            ? downloadUri.replace('/file-svc', '')
            : downloadUri;
          const url = downloadUri ? `${API_URLS.FILE}${cleanDownloadUri}` : null;
          return {
            uid: `server-${index}`,
            name: file.fileName,
            status: 'done' as UploadFileStatus,
            url: url,
          };
        });
        setFileList(serverFiles);
      }
    }, [lesson]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        return {
          description,
          files: fileList.filter((file) => !file.url),
        };
      },
    }));

    const props: UploadProps = {
      name: 'file',
      multiple: true,
      fileList,
      beforeUpload: (file) => {
        setFileList((prev) => [...prev, file]);
        return false;
      },
      onChange(info) {
        setFileList(info.fileList);
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
      onRemove(file) {
        setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
      },
    };

    return (
      <>
        {isEdit ? (
          <>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter description"
              style={{ marginBottom: 16 }}
            />
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data
                or other banned files.
              </p>
            </Dragger>
          </>
        ) : (
          <>
            <Typography.Text>{lesson?.description}</Typography.Text>
            {lesson?.files && lesson.files.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Typography.Text strong>Attached Files:</Typography.Text>
                <ul>
                  {fileList.map((file) => (
                    <li key={file.uid}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </>
    );
  },
);

WeekLessonContent.displayName = 'WeekLessonContent';

export default WeekLessonContent;
