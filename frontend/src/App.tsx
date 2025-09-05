import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Provider, useAtom } from "jotai";

// Jotai store setup from your files
import { jotaiStore, isUserAuthenticatedAtom } from "./store/store";

// --- Page & Layout Placeholders ---
// You will create these files in the 'pages/' directory
const LandingPage = () => <div>Landing Page with Navbar and Footer</div>;
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const OAuthRedirectHandler = React.lazy(
  () => import("./pages/OAuthRedirectHandler"),
);
const ShareContentPage = () => <div>Public Shared Content Page</div>;
const ShareUserPage = () => <div>Public User Second Brain Page</div>;

// The DashboardLayout will contain the sidebar and top search box
const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 h-screen p-4">
        {/* Sidebar content here */}
        <div className="text-white text-xl">Sidebar</div>
      </div>
      <div className="flex-1 p-8">
        {/* Top search/AI box here */}
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          Search & Ask AI Box
        </div>
        {/* The Outlet will render the nested route's content */}
        <Outlet />
      </div>
    </div>
  );
};

// Dashboard's nested pages
const ContentGridPage = () => <div>Grid of Content Cards</div>;
const SearchResultsPage = () => <div>Search Results Grid</div>;
const ProfilePage = () => <div>User Profile Page</div>;

// --- Private Route Component using Jotai ---
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated] = useAtom(isUserAuthenticatedAtom);
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// --- Main App Component ---
function App() {
  return (
    <Provider store={jotaiStore}>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/success" element={<OAuthRedirectHandler />} />

            {/* Public Share & Import Routes (to view and save public content) */}
            <Route
              path="/share/content/:contentId"
              element={<ShareContentPage />}
            />
            <Route path="/share/user/:userId" element={<ShareUserPage />} />

            {/* PRIVATE ROUTES (Protected by the PrivateRoute component) */}
            <Route
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              {/* This renders the DashboardLayout with the Outlet for nested routes */}

              {/* User's Main Content Dashboard */}
              <Route path="/dashboard" element={<ContentGridPage />} />
              <Route path="/dashboard/filter" element={<ContentGridPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/dashboard/search" element={<SearchResultsPage />} />

              {/* Import Routes */}
              <Route
                path="/import/content/:contentId"
                element={<ContentGridPage />}
              />
              <Route
                path="/import/user/:sourceUserId"
                element={<ContentGridPage />}
              />
            </Route>

            {/* Catch-all for 404 Not Found pages */}
            <Route path="*" element={<div>404: Not Found</div>} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
