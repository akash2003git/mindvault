import api from "./axiosInstance";

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
