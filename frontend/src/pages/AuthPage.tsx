import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticatedAtom } from "../store/atoms/authAtom";
import { loginUser, signupUser } from "../services/authService";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [identifier, setIdentifier] = useState<string>(""); // For login
  const [username, setUsername] = useState<string>(""); // For signup
  const [email, setEmail] = useState<string>(""); // For both
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isAuthenticated = useAtomValue(isUserAuthenticatedAtom);
  const navigate = useNavigate();

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Use the identifier for login
        await loginUser({ identifier, password });
      } else {
        // Use separate email and username for signup
        await signupUser({ username, email, password });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect the user to the backend's Google auth endpoint
    window.location.href = import.meta.env.VITE_API_BASE_URL + "/auth/google";
  };

  if (isAuthenticated) {
    // Return null or a loading spinner while redirecting
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700">
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-l-lg transition-all duration-300 font-semibold ${isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
          >
            Log In
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg transition-all duration-300 font-semibold ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
          >
            Sign Up
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back!" : "Join MindVault"}
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          )}
          <div>
            <label
              className="block text-gray-300 text-sm font-medium mb-1"
              htmlFor="email"
            >
              {isLogin ? "Email or Username" : "Email"}
            </label>
            <input
              id="email"
              type={isLogin ? "text" : "email"}
              value={isLogin ? identifier : email}
              onChange={(e) =>
                isLogin
                  ? setIdentifier(e.target.value)
                  : setEmail(e.target.value)
              }
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-300 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-2">or</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8.083-11.303 8.083-6.702 0-12.095-5.393-12.095-12.095s5.393-12.095 12.095-12.095c3.488 0 6.645 1.442 8.875 3.73l6.57-6.57c-3.743-3.69-8.873-5.91-14.445-5.91C11.47 2.083 2.083 11.47 2.083 24s9.387 21.917 21.917 21.917c12.482 0 21.41-8.527 21.41-21.917-.001-1.288-.112-2.569-.32-3.832z"
              />
              <path
                fill="#FF3D00"
                d="M6.35 27.53l6.812 5.093c1.94 5.768 7.34 10.05 13.918 10.05 6.702 0 12.095-5.393 12.095-12.095 0-.74-.067-1.464-.192-2.174H24V32.17l-.014-.002c-4.205-.084-7.85-2.28-10.42-5.748l-6.22-3.218z"
              />
              <path
                fill="#4CAF50"
                d="M43.611 20.083c0-1.288-.112-2.569-.32-3.832H24v8h11.303c-1.649 4.657-6.08 8.083-11.303 8.083-6.702 0-12.095-5.393-12.095-12.095s5.393-12.095 12.095-12.095c3.488 0 6.645 1.442 8.875 3.73l6.57-6.57c-3.743-3.69-8.873-5.91-14.445-5.91C11.47 2.083 2.083 11.47 2.083 24s9.387 21.917 21.917 21.917c12.482 0 21.41-8.527 21.41-21.917-.001-1.288-.112-2.569-.32-3.832z"
              />
              <path
                fill="#1976D2"
                d="M24.083 45.917c10.465 0 19.33-7.697 21.11-17.788-1.78 10.09-10.645 17.788-21.11 17.788-11.43 0-20.917-8.157-21.917-19.584C2.083 33.74 11.569 41.917 24.083 45.917z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
