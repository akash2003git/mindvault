import { Earth, Github, Twitter, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-400 bg-white px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-gray-600 md:flex-row md:justify-between">

        {/* Contact */}
        <a
          href="mailto:akash.tayade.dev@gmail.com"
          className="flex items-center gap-2 font-medium text-gray-700 hover:text-black transition"
        >
          <Mail size={18} />
          Contact Me
        </a>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/akash2003git/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>

          <a
            href="https://x.com/akash2003_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>

          <a
            href="https://akash-tayade-dev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            aria-label="Website"
          >
            <Earth size={20} />
          </a>
        </div>

        {/* Copyright */}
        <span className="text-gray-500">
          © 2025 MindVault
        </span>
      </div>
    </footer>
  )
}

export default Footer
