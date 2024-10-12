import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Forum from "./components/Forum";
import Tools from "./components/Tools";
import Profile from "./components/Profile";
import HackingCategories from "./components/HackingCategories";
import AuthForm from "./components/AuthForm";
import Logout from "./components/Logout";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    username: string;
  } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("/api/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
          if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-green-500 p-4">
        <main>
          <Routes>
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <AuthForm
                    setIsAuthenticated={setIsAuthenticated}
                    setCurrentUser={setCurrentUser}
                  />
                )
              }
            />
            <Route
              path="/logout"
              element={<Logout handleLogout={handleLogout} />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/forum"
              element={
                isAuthenticated ? (
                  <Forum currentUser={currentUser} />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/tools"
              element={isAuthenticated ? <Tools /> : <Navigate to="/auth" />}
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile currentUser={currentUser} />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/categories"
              element={
                isAuthenticated ? (
                  <HackingCategories />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
          </Routes>
        </main>

        <footer className="mt-8 text-center text-xs md:text-sm">
          <p>
            Disclaimer: This platform is for educational purposes only. Engage
            in ethical hacking and always obtain proper authorization.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
