import { Brain, User } from "lucide-react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BottomSheet from "./BottomSheet"
import { useAuth } from "../../hooks/useAuth"

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsSheetOpen(false);
  }

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsSheetOpen(false);
  }

  return (
    <nav className="py-5 px-5 md:px-50 bg-white flex items-center justify-between border-b-2 border-gray-400">
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      >
        {user ?
          (
            <div className="flex flex-col gap-4">
              <Button
                text="My Vault"
                variant="primary"
                size="lg"
                onClick={() => handleNavigate("/vault")}
              />
              <Button
                text="Logout"
                variant="secondary"
                size="lg"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Button
                text="Login"
                variant="primary"
                size="lg"
                onClick={() => handleNavigate("/login")}
              />
              <Button
                text="Sign up"
                variant="secondary"
                size="lg"
                onClick={() => handleNavigate("/signup")}
              />
            </div>
          )
        }
      </BottomSheet>

      <div className="flex items-center gap-3">
        <div className="text-3xl flex font-bold gap-2 text-center items-center cursor-pointer" onClick={() => handleNavigate("/")}>
          <Brain className="w-8 h-8" />
          <span>MindVault</span>
        </div>
      </div>
      {user ? (
        <div className="hidden md:flex gap-2">
          <Button text="My Vault" variant="primary" size="lg" onClick={() => handleNavigate("/vault")}></Button>
          <Button text="Logout" variant="secondary" size="lg" onClick={handleLogout}></Button>
        </div>
      ) : (
        <div className="hidden md:flex gap-2">
          <Button text="Login" variant="primary" size="lg" onClick={() => handleNavigate("/login")}></Button>
          <Button text="Sign up" variant="secondary" size="lg" onClick={() => handleNavigate("/signup")}></Button>
        </div>
      )}
      <div className="md:hidden">
        <Button startIcon={User} variant="secondary" size="md" onClick={() => setIsSheetOpen(true)}></Button>
      </div>
    </nav>
  )
}

export default PublicNavbar
