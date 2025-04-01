import { UploadFile } from 'antd';

export type LessonResponse = {
  id: number;
  title: string;
  courseId: number;
  description: string;
  published: boolean;
  files?: FileResponse[];
};

export interface FileResponse {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
}

export interface UpdateLessonPayload {
  id?: number;
  title: string;
  description: string;
  files?: UploadFile[];
  published?: boolean;
}
