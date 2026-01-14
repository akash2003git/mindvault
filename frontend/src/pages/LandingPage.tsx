import { Share2, Search, Sparkle, Download } from "lucide-react"
import { Button } from "../components/ui/Button"

const LandingPage = () => {
  return (
    <>
      {/* Hero */}
      <div className="flex flex-col items-center gap-5 p-5 md:p-8 mt-10 md:mt-15 mx-5 md:mx-25 xl:mx-100 rounded-xl border-2 border-gray-400 text-center">
        <h1 className="font-bold text-[35px] md:text-[50px]">Your Second brain for links, notes and ideas.</h1>
        <span className="text-gray-600 text-2xl mb-5">Save articles, videos, tweets, and thoughts in one place. Search, tag and share your knowledge effortlessly.</span>
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
    </>
  )
}

export default LandingPage
