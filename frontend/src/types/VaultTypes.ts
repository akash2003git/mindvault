export type Tag = {
  _id: string;
  title: string;
}

export type VaultItem = {
  _id: string;
  title: string;
  description: string;
  link?: string;
  type: string;
  tags: Tag[];
  userId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export type VaultResponse = {
  items: VaultItem[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export type FilterParams = {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  tags?: string;
}
