import api from "./axiosInstance";

export type AuthResponse = {
  _id: string;
  username: string;
  email: string;
  accessToken: string;
  message: string;
};

export const loginUser = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> => {
  const payload = identifier.includes("@")
    ? { email: identifier, password }
    : { username: identifier, password };

  const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
  return data;
};

export const signupUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const payload = { username, email, password }
  const { data } = await api.post<AuthResponse>("/api/auth/signup", payload);
  return data;
};
