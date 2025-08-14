export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_SECRET = process.env.JWT_SECRET || "changeme";
export const AI_API_KEY = process.env.AI_API_KEY || "";

// <-- Google OAuth -->
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
// This should match the "Authorized redirect URIs" in Google Cloud Console
export const GOOGLE_CALLBACK_URL =
  process.env.GOOGLE_CALLBACK_URL ||
  "http://localhost:5000/api/v1/auth/google/callback";
// This is where your frontend will receive the JWT after successful login
export const FRONTEND_AUTH_SUCCESS_REDIRECT =
  process.env.FRONTEND_AUTH_SUCCESS_REDIRECT ||
  "http://localhost:5173/auth-success";
