import { Link } from "react-router"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { loginUser } from "../api/authApi";
import { AxiosError } from "axios";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ identifier, password });
      login({
        user: {
          _id: data._id,
          username: data.username,
          email: data.email,
        },
        accessToken: data.accessToken
      })
      navigate("/vault");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.errors) {
          setError(err.response?.data?.errors[0].message)
        } else {
          setError(err.response?.data?.message || "Login failed!");
        }
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 gap-10 items-center justify-center bg-white py-30">
      <div className="shadow-xl rounded-xl p-8 flex flex-col gap-5">
        <h1 className="text-center text-3xl p-5">Welcome Back</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input id="identifier" type="text" disabled={loading} value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Username or Email" className="px-4 py-2 rounded-3xl border border-gray-400" />
          <input id="password" type="password" disabled={loading} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="px-4 py-2 rounded-3xl border border-gray-400" />
          <button type="submit" disabled={loading} className="font-bold px-4 py-2 bg-black text-center text-white rounded-3xl cursor-pointer hover:bg-gray-800">{loading ? "Logging in.." : "Login"}</button>
        </form>
        {error && <p className="text-red-800 text-center">{error}</p>}
        <span className="text-center">Don't have an account? <Link to="/signup" className="hover:underline text-blue-500">Sign up</Link></span>
      </div>
    </div>
  )
}

export default LoginPage
