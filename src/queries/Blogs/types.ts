import { TagPayload, TagsResponse } from '@queries/Tags';

export interface BlogsResponse {
  id: number;
  createdDate: Date;
  modifiedDate: Date;
  createdBy: string;
  modifiedBy: string;
  title: string;
  slug: string;
  content: string;
  userId: string;
  fullName: string;
  tags: TagsResponse[];
  allowComments: boolean;
  hotScore: number;
  thumbnailUrl: string;
  isMobile: boolean;
}

export interface BlogsPayload {
  userId: number;
  title: string;
  content: string;
  tags: string[];
  allowComments: boolean;
  isMobile: boolean;
  thumbnailUrl: string;
}
