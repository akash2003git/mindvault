export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_SECRET = process.env.JWT_SECRET || "changeme";
export const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || "http://localhost:5173";

// <-- Google OAuth -->
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
// This should match the "Authorized redirect URIs" in Google Cloud Console
export const GOOGLE_CALLBACK_URL =
  process.env.GOOGLE_CALLBACK_URL ||
  "http://localhost:5000/api/v1/auth/google/callback";

// <-- AI -->
export const AI_API_KEY = process.env.AI_API_KEY || "";
export const AI_API_URL =
  process.env.AI_API_URL ||
  "https://generativelanguage.googleapis.com/v1beta/models";
export const EMBEDDING_MODEL_NAME =
  process.env.EMBEDDING_MODEL_NAME || "text-embedding-004";
export const GEMINI_TEXT_MODEL_NAME =
  process.env.GEMINI_TEXT_MODEL_NAME || "gemini-2.5-flash-preview-05-20";
