import { useEffect } from "react";
import { useAtom } from "jotai";
import { useSearchParams, useNavigate } from "react-router-dom";
import { accessTokenAtom, userAtom } from "../store/store";
import { jwtDecode } from "jwt-decode";

interface User {
  _id: string;
  username: string;
  email: string;
}

const AuthSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token) as User; // Decode the JWT to get user data

        setUser(decodedUser);
        setAccessToken(token);

        // Redirect to the home page after successful login
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Redirect to login on token error
        navigate("/login", { replace: true });
      }
    } else {
      // Redirect to login if no token is found in the URL
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, setUser, setAccessToken]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600">Logging you in...</p>
      </div>
    </div>
  );
};

export default AuthSuccessPage;
