import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Dashboard from "./components/layout/Dashboard";
import CardDetails from "./pages/CardDetails";
import VaultLayout from "./components/layout/VaultLayout";
import PublicLayout from "./components/layout/PublicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected */}
        <Route path="/vault" element={<ProtectedRoute />}>
          <Route element={<VaultLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="item/:id" element={<CardDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
