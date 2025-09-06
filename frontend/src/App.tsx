import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "jotai";
import { jotaiStore } from "./store/store";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const LandingPage = () => <div>Landing Page with Navbar and Footer</div>;
const OAuthRedirectHandler = React.lazy(
  () => import("./pages/OAuthRedirectHandler"),
);

function App() {
  return (
    <Provider store={jotaiStore}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/success" element={<OAuthRedirectHandler />} />
          {/* 404 Page */}
          <Route path="*" element={<div>404: Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
