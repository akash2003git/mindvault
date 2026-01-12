import { Link } from "react-router"

const LoginPage = () => {
  return (
    <div className="flex gap-10 items-center justify-center bg-white min-h-screen">
      <div className="shadow-xl rounded-xl p-8 flex flex-col gap-5">
        <h1 className="text-center text-3xl p-5">Welcome Back</h1>
        <form className="flex flex-col gap-5">
          <input id="identifier" type="string" placeholder="Username or Email" className="px-4 py-2 rounded-3xl border border-gray-400" />
          <input id="password" type="password" placeholder="Password" className="px-4 py-2 rounded-3xl border border-gray-400" />
          <button type="submit" className="font-bold px-4 py-2 bg-black text-center text-white rounded-3xl cursor-pointer hover:bg-gray-800">Login</button>
        </form>
        <span className="text-center">Don't have an account? <Link to="/signup" className="hover:underline text-blue-500">Signup</Link></span>
      </div>
    </div>
  )
}

export default LoginPage
