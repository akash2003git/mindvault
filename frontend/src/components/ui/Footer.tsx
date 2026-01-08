import { Earth, Github, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-white border-t-2 border-gray-400 p-5 flex flex-col items-center md:flex-row md:justify-between gap-5">
      <Link to="https://akash-tayade-dev.vercel.app">Contact Me</Link>
      <div className="flex gap-2">
        <Link to="https://akash-tayade-dev.vercel.app">
          <Github />
        </Link>
        <Link to="https://akash-tayade-dev.vercel.app">
          <Twitter />
        </Link>
        <Link to="https://akash-tayade-dev.vercel.app">
          <Earth />
        </Link>
      </div>
      <div>
        <span>2025, Akash Tayade</span>
      </div>
    </div>
  )
}

export default Footer
