import api from "./axiosInstance";
import { ContentTypes } from "../types/ContentTypes";

export interface ShareItemResponse {
  message: string;
  shareUrl: string;
  isPublic: true;
}

export interface ToggleItemPrivacyResponse {
  message: string;
  isPublic: boolean;
  shareUrl: string | null;
}

export interface ShareVaultResponse {
  message: string;
  shareUrl: string;
  vaultPublic: true;
}

export interface SharedTag {
  _id: string;
  title: string;
}

export interface SharedVaultItem {
  _id: string;
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags: SharedTag[];
  userId: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SharedSingleResponse {
  type: "single";
  item: SharedVaultItem;
}

export interface SharedCollectionResponse {
  type: "collection";
  items: SharedVaultItem[];
}

export type SharedLinkResponse =
  | SharedSingleResponse
  | SharedCollectionResponse;

export const shareItem = async (
  id: string
): Promise<ShareItemResponse> => {
  const { data } = await api.post<ShareItemResponse>(
    `/api/share/item/${id}`
  );
  return data;
};

export const makeItemPrivate = async (
  id: string
): Promise<ToggleItemPrivacyResponse> => {
  const { data } = await api.patch<ToggleItemPrivacyResponse>(
    `/api/share/item/${id}/toggle`
  );
  return data;
};

export const shareVault = async (): Promise<ShareVaultResponse> => {
  const { data } = await api.post<ShareVaultResponse>(
    "/api/share/vault"
  );
  return data;
};

export const openSharedLink = async (
  hash: string
): Promise<SharedLinkResponse> => {
  const { data } = await api.get<SharedLinkResponse>(
    `/api/share/${hash}`
  );
  return data;
};
