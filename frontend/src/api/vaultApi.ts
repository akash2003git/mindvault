import api from "./axiosInstance";
import { type VaultResponse, type FilterParams, type VaultItemResponse, type NewVaultItemResponse } from "../types/VaultTypes.ts";
import { type AddContentPayload } from "../components/forms/AddContentForm.tsx";

export const getVaultItems = async (params: FilterParams): Promise<VaultResponse> => {
  const { data } = await api.get<VaultResponse>(`/api/vault/`, {
    params: {
      pageNumber: params.page || 1,
      itemsPerPage: params.limit || 12,
      search: params.search || undefined,
      type: params.type || undefined,
      tags: params.tags || undefined
    }
  })
  return data;
}

export const getVaultItemById = async (id: string): Promise<VaultItemResponse> => {
  const { data } = await api.get<VaultItemResponse>(`/api/vault/${id}`);
  return data;
}

export const createItem = async (input: AddContentPayload): Promise<NewVaultItemResponse> => {
  const { data } = await api.post<NewVaultItemResponse>("/api/vault", input);
  return data;
}

export const deleteItem = async (id: string): Promise<VaultItemResponse> => {
  const { data } = await api.delete<VaultItemResponse>(`/api/vault/${id}`);
  return data;
}
