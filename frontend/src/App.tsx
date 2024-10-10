import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { AuthLayout } from "./layouts/auth_layout";
import { MainLayout } from "./layouts/main-layout";
import SignUpPage from "./pages/auth/signup";
import LoginPage from "./pages/auth/login";
import routes from "./utils/routes";
import { RequireAuth } from "./utils/auth-user";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Auth Layout */}
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        {/* Main Layout with Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayout
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              >
                <Outlet />
              </MainLayout>
            </RequireAuth>
          }
        />

        {/* Child Routes inside Main Layout */}
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RequireAuth>
                <MainLayout
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                  title={route.title as string}
                >
                  <route.component />
                </MainLayout>
              </RequireAuth>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
