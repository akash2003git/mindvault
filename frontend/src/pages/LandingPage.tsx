import { Brain, User, Share2, Search, Sparkle, Download } from "lucide-react"
import { Button } from "../components/ui/Button"
import Footer from "../components/ui/Footer"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        {/* Navbar */}
        <nav className="py-5 px-5 md:px-50 bg-white flex items-center justify-between border-b-2 border-gray-400">
          <div className="flex items-center gap-3">
            <div className="text-3xl flex font-bold gap-2 text-center items-center">
              <Brain className="w-8 h-8" />
              <span>MindVault</span>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <Button text="Login" variant="primary" size="lg" onClick={() => console.log("login")}></Button>
            <Button text="Sign up" variant="secondary" size="lg" onClick={() => console.log("Sign Up")}></Button>
          </div>
          <div className="md:hidden">
            <Button startIcon={User} variant="secondary" size="md" onClick={() => console.log("user modal")}></Button>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex flex-col items-center gap-5 p-5 md:p-8 mt-10 md:mt-15 mx-5 md:mx-25 xl:mx-100 rounded-xl border-2 border-gray-400 text-center">
          <h1 className="font-bold text-[35px] md:text-[60px]">Your Second brain for links, notes and ideas.</h1>
          <span className="text-gray-600">Save articles, videos, tweets, and thoughts in one place. Search, tag and share your knowledge effortlessly.</span>
          <div className="flex gap-5">
            <Button text="Get Started" variant="primary" size="lg" onClick={() => console.log("Sign Up")}></Button>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20 flex flex-col lg:flex-row items-center gap-2 md:gap-5 p-2 md:p-5 mt-10 md:mt-15 mx-5 md:mx-25 xl:mx-100 rounded-xl bg-gray-100 text-center">
          <div className="p-5 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-4xl border bg-gray-100">
              <Download />
            </div>
            <h2 className="font-bold text-xl">Save Anything</h2>
            <h3 className="text-gray-600">Store links, notes, tweets, videos, and tools.</h3>
          </div>
          <div className="p-5 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-4xl border bg-gray-100">
              <Search />
            </div>
            <h2 className="font-bold text-xl">Search Fast</h2>
            <h3 className="text-gray-600">Instantly find content with tags and filters.</h3>
          </div>
          <div className="p-5 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-4xl border bg-gray-100">
              <Share2 />
            </div>
            <h2 className="font-bold text-xl">Share knowledge</h2>
            <h3 className="text-gray-600">Share single items or your entire vault.</h3>
          </div>
          <div className="p-5 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-4xl border bg-gray-100">
              <Sparkle />
            </div>
            <h2 className="font-bold text-xl">Think Clearly</h2>
            <h3 className="text-gray-600">Organize your digital brain effortlessly.</h3>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default LandingPage
