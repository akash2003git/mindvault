import { Brain, User } from "lucide-react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BottomSheet from "./BottomSheet"

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <nav className="py-5 px-5 md:px-50 bg-white flex items-center justify-between border-b-2 border-gray-400">
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <Button
            text="Login"
            variant="primary"
            size="lg"
            onClick={() => navigate("/login")}
          />
          <Button
            text="Sign up"
            variant="secondary"
            size="lg"
            onClick={() => navigate("/signup")}
          />
        </div>
      </BottomSheet>

      <div className="flex items-center gap-3">
        <div className="text-3xl flex font-bold gap-2 text-center items-center">
          <Brain className="w-8 h-8" />
          <span>MindVault</span>
        </div>
      </div>
      <div className="hidden md:flex gap-2">
        <Button text="Login" variant="primary" size="lg" onClick={() => navigate("/login")}></Button>
        <Button text="Sign up" variant="secondary" size="lg" onClick={() => navigate("/signup")}></Button>
      </div>
      <div className="md:hidden">
        <Button startIcon={User} variant="secondary" size="md" onClick={() => setIsSheetOpen(true)}></Button>
      </div>
    </nav>
  )
}

export default PublicNavbar
