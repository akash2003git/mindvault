import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-black/60 rounded-3xl flex justify-between items-center px-6 md:px-12 py-4 w-[90%] max-w-6xl shadow-lg border border-white/10">
        <div className="text-2xl font-extrabold tracking-wide">Mindvault</div>
        <div className="hidden md:flex gap-8 items-center">
          <button className="hover:text-purple-400 transition-colors">
            Features
          </button>
          <button className="hover:text-purple-400 transition-colors">
            Use Cases
          </button>
          <button className="hover:text-purple-400 transition-colors">
            About
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-colors">
            Sign Up
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Sticky) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black/90 backdrop-blur-md flex flex-col items-center gap-6 py-6 rounded-3xl border border-white/10 shadow-xl md:hidden z-40"
          >
            <button
              className="hover:text-purple-400"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </button>
            <button
              className="hover:text-purple-400"
              onClick={() => setMenuOpen(false)}
            >
              Use Cases
            </button>
            <button
              className="hover:text-purple-400"
              onClick={() => setMenuOpen(false)}
            >
              About
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-48 px-8 md:px-20 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
          <h1 className="relative text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Second Brain
            </span>
          </h1>
        </div>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Save and organize anything — from YouTube videos to tweets — and
          retrieve it instantly with AI-powered search and one-click saving.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-full border border-white/20 hover:border-purple-400 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="relative mt-40 px-8 md:px-20 grid md:grid-cols-3 gap-10 text-left">
        <div className="p-6 rounded-3xl bg-white/5 hover:bg-white/10 transition">
          <h2 className="text-xl font-semibold mb-3">📦 Save Anything</h2>
          <p className="text-gray-400">
            Capture videos, posts, and articles with metadata, tags, and links
            for effortless recall.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 hover:bg-white/10 transition">
          <h2 className="text-xl font-semibold mb-3">🔎 Smarter Search</h2>
          <p className="text-gray-400">
            Leverage keyword and semantic vector search to retrieve relevant
            content in seconds.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white/5 hover:bg-white/10 transition">
          <h2 className="text-xl font-semibold mb-3">🤖 AI-Powered Context</h2>
          <p className="text-gray-400">
            Ask AI, get answers enriched with your saved context — or general
            knowledge if none match.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-40 py-8 text-center text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} Mindvault. All rights reserved.
      </footer>
    </div>
  );
}
