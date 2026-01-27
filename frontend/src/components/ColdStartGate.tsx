import { useEffect, useState } from "react"
import axios from "axios"
import { Brain } from "lucide-react"

type Props = {
  children: React.ReactNode
}

const API_URL = import.meta.env.VITE_API_URL

const ColdStartGate = ({ children }: Props) => {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const wakeServer = async () => {
      try {
        await axios.get(`${API_URL}/`, {
          timeout: 120000,
        })
        setReady(true)
      } catch {
        setError(true)
      }
    }

    wakeServer()
  }, [])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4 text-center">
        <div className="max-w-sm">
          <h1 className="text-xl font-semibold text-gray-900">
            Server unavailable
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            The server is taking longer than expected to start.
            Please refresh in a moment.
          </p>
        </div>
      </div>
    )
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4 text-center">

        {/* Logo */}
        <div className="flex items-center gap-2 text-gray-900">
          <Brain size={32} />
          <span className="text-2xl font-semibold tracking-tight">
            MindVault
          </span>
        </div>

        {/* Tagline */}
        <p className="max-w-xs text-sm text-gray-500">
          Your second brain for links, notes, and ideas
        </p>

        {/* Loader */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          <p className="text-sm text-gray-600">
            Starting up the server
            <span className="block text-xs text-gray-400">
              This can take up to 45-60 seconds on the first visit
            </span>
          </p>
        </div>

      </div>
    )
  }

  return <>{children}</>
}

export default ColdStartGate
