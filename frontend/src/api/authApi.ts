import api from "./axiosInstance";

interface AuthResponse {
  accessToken: string;
  _id: string;
  username: string;
  email: string;
  message: string;
}

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/user/login", {
    identifier: credentials.identifier,
    password: credentials.password,
  });
  return response.data;
};

export const signupUser = async (
  credentials: SignupCredentials,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/user/signup", {
    username: credentials.username,
    email: credentials.email,
    password: credentials.password,
  });
  return response.data;
};
