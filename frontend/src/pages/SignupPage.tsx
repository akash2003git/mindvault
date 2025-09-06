import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  accessTokenAtom,
  userAtom,
  isUserAuthenticatedAtom,
} from "../store/store";
import { signupUser } from "../api/authApi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUser] = useAtom(userAtom);
  const isUserAuthenticated = useAtomValue(isUserAuthenticatedAtom);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await signupUser({ username, email, password });
      const { _id, username: newUsername, email: newEmail, accessToken } = data;
      setUser({ _id, username: newUsername, email: newEmail });
      setAccessToken(accessToken);
    } catch (error: any) {
      setAuthLoading(false);
      // Handle Zod validation errors from the backend
      if (error.response?.data?.errors) {
        const fieldErrors = error.response.data.errors;
        const firstField = Object.keys(fieldErrors)[0];
        if (firstField && fieldErrors[firstField]?.length > 0) {
          setAuthError(fieldErrors[firstField][0]);
        } else {
          setAuthError("Validation failed. Please check your input.");
        }
      } else if (error.response?.data?.message) {
        // Handle other backend errors (e.g., username/email exists)
        setAuthError(error.response.data.message);
      } else if (error.message) {
        // Handle network or other Axios errors
        setAuthError(error.message);
      } else {
        setAuthError("An unexpected error occurred during sign-up.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/");
    }
  }, [isUserAuthenticated]);

  useEffect(() => {
    setAuthError("");
  }, [email, password]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Sign Up
        </h2>

        {/* SignUp Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-gray-800"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-gray-800"
              placeholder="Enter email or username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-gray-800"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            {authLoading ? "Signing you up..." : "Sign Up"}
          </button>
        </form>

        {/* Error Message */}
        {authError && (
          <div className="text-red-600 text-sm mt-5 text-center">
            {authError}
          </div>
        )}

        {/* Separator */}
        <div className="relative mt-6 mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        {/* Google Button */}
        <button className="cursor-pointer w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
          <FcGoogle className="mr-2" />
          Continue with Google
        </button>

        <div className="mt-5">
          <p className="text-center text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
