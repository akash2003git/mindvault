import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { decodeTokenAndSetUser } from "../services/authService";

const OAuthRedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthRedirect = () => {
      const token = searchParams.get("token");

      if (token) {
        // Decode the token and set the user directly from the payload
        const success = decodeTokenAndSetUser(token);
        if (success) {
          navigate("/dashboard", { replace: true });
        } else {
          setError("Failed to log in. Please try again.");
          setTimeout(() => navigate("/auth", { replace: true }), 2000);
        }
      } else {
        setError("Login failed. No token received.");
        setTimeout(() => navigate("/auth", { replace: true }), 2000);
      }
      setLoading(false);
    };

    handleOAuthRedirect();
  }, [navigate, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Logging in...</h1>
          <p className="text-gray-400">
            Please wait while we set up your session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
};

export default OAuthRedirectHandler;
