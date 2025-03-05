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
  tags: Tag[];
  allowComments: boolean;
  hotScore: number;
}

//TODO move to Tag queries
export interface Tag {
  id: number;
  name: string;
}
