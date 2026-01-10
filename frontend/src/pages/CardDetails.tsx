import Markdown from "react-markdown"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/Button"

const desc: string = "Deep Work \nCal Newport's book on meaningful work.\n- Avoid distractions\n- Focus deeply\n- Build rituals\n- Prioritize value\n\n**A must read!**"

const CardDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <Button variant="primary" size="md" text="Back to Dashboard" startIcon={ArrowLeft} onClick={() => navigate("/vault")} />
      <div className="mt-5 p-5 rounded-xl border-2 border-gray-400 flex flex-col gap-5 h-full">
        <h1 className="text-2xl font-bold underline">Video about deep work</h1>

        <div className="prose bg-gray-50 p-5 rounded-xl">
          <Markdown>{desc}</Markdown>
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Link: </span>
          <Link
            to="https://youtube.com"
            className="block w-full truncate text-blue-500 underline"
          >
            https:youtube.com
          </Link>
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Type: </span>
          <span>Video</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="font-semibold">Tags: </span>
          <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
            < span className="text-sm text-center" > #productivity</span>
          </div>
          <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
            <span className="text-sm text-center">#productivity</span>
          </div>
          <div className="bg-gray-300 rounded-3xl flex items-center p-2 py-1">
            <span className="text-sm text-center">#productivity</span>
          </div>
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Visibility: </span>
          <span>Public</span>
        </div>

        <div className="w-full flex gap-2">
          <span className="font-semibold">Added on: </span>
          <span>01/01/2025</span>
        </div>
      </div>
    </div>
  )
}

export default CardDetails
