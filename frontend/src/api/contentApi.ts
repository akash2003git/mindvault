import api from "./axiosInstance";

// Define the Tag and Content types (based on your backend model)
export interface Tag {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Content {
  _id: string;
  userId: string;
  title: string;
  link?: string;
  type: string;
  description?: string;
  tags: Tag[];
  publicStatus: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API response shape
interface GetAllContentResponse {
  message: string;
  userContent: Content[];
}

// API function
export const getAllContent = async (): Promise<Content[]> => {
  const response = await api.get<GetAllContentResponse>("/content");
  return response.data.userContent;
};
