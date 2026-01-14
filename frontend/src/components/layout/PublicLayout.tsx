import Footer from "../ui/Footer"
import PublicNavbar from "../ui/PublicNavbar"
import { Outlet } from "react-router-dom"

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default PublicLayout
