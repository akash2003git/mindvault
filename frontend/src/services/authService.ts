import axiosInstance from "../api/axiosInstance";
import { jotaiStore } from "../store/store";
import { accessTokenAtom, userAtom } from "../store/atoms/authAtom";
import { jwtDecode } from "jwt-decode";

// Define the API endpoints
const AUTH_URLS = {
  login: "/user/login",
  signup: "/user/signup",
  googleAuth: "/auth/google",
  getMe: "/user/me",
};

// Define the type for the user data you expect from the API
interface User {
  _id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

// Define the type for the login/signup response
// It now matches the backend's structure
interface AuthResponse {
  accessToken: string;
  _id: string;
  username: string;
  email: string;
  message: string;
  // Add other properties if your backend sends them
}

// Function to handle user login
export const loginUser = async (credentials: any): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      AUTH_URLS.login,
      credentials,
    );
    const { accessToken, _id, username, email } = response.data;

    // On successful login, save the token and user to Jotai
    jotaiStore.set(accessTokenAtom, accessToken);
    jotaiStore.set(userAtom, { _id, username, email });

    return response.data;
  } catch (error) {
    // Re-throw the error so it can be handled by the UI component
    throw error;
  }
};

// Function to handle user signup
export const signupUser = async (credentials: any): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      AUTH_URLS.signup,
      credentials,
    );
    const { accessToken, _id, username, email } = response.data;

    // On successful signup, save the token and user to Jotai
    jotaiStore.set(accessTokenAtom, accessToken);
    jotaiStore.set(userAtom, { _id, username, email });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get the current authenticated user's details
// This now correctly returns the top-level user object from the API
export const getMe = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(AUTH_URLS.getMe);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// A small utility to decode the token and set the user in Jotai
export const decodeTokenAndSetUser = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token);
    const user: User = {
      _id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email,
    };
    jotaiStore.set(accessTokenAtom, token);
    jotaiStore.set(userAtom, user);
    return true;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    jotaiStore.set(accessTokenAtom, null);
    jotaiStore.set(userAtom, null);
    return false;
  }
};

// A small utility to remove auth data
export const logoutUser = () => {
  jotaiStore.set(accessTokenAtom, null);
  jotaiStore.set(userAtom, null);
};
