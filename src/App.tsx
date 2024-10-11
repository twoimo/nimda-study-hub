import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Terminal,
  Shield,
  Zap,
  Users,
  MessageSquare,
  LogOut,
  Menu,
} from "lucide-react";
import { sql } from "@vercel/postgres";
import Dashboard from "./components/Dashboard";
import Forum from "./components/Forum";
import Tools from "./components/Tools";
import Profile from "./components/Profile";
import HackingCategories from "./components/HackingCategories";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    username: string;
  } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = (e.currentTarget as HTMLFormElement).username.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;

    try {
      const result = await sql`
        SELECT id, username FROM users
        WHERE username = ${username} AND password = crypt(${password}, password)
      `;
      if (result.rows.length > 0) {
        const user = result.rows[0];
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsLoggingOut(false);
      localStorage.removeItem("currentUser");
    }, 1000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 p-8 rounded-lg neon-border w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center glitch-text">
            H4CK3R L0G1N
          </h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
          >
            Access System
          </button>
        </form>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-green-500 p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold glitch-text">
            N1MDA HUB
          </h1>
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden mr-4 text-green-500 hover:text-green-400"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <nav
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row absolute md:relative top-16 right-4 md:top-auto md:right-auto bg-gray-900 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none shadow-lg md:shadow-none z-50`}
            >
              <Link
                to="/"
                className="mb-2 md:mb-0 md:mr-4 hover:text-neon-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/forum"
                className="mb-2 md:mb-0 md:mr-4 hover:text-neon-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Forum
              </Link>
              <Link
                to="/tools"
                className="mb-2 md:mb-0 md:mr-4 hover:text-neon-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Tools
              </Link>
              <Link
                to="/categories"
                className="mb-2 md:mb-0 md:mr-4 hover:text-neon-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/profile"
                className="mb-2 md:mb-0 md:mr-4 hover:text-neon-blue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </nav>
            <button
              onClick={handleLogout}
              className={`flex items-center bg-red-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
                isLoggingOut ? "animate-pulse" : ""
              }`}
              aria-label="Logout"
            >
              <LogOut className="mr-1 md:mr-2" size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/forum"
              element={<Forum currentUser={currentUser} />}
            />
            <Route path="/tools" element={<Tools />} />
            <Route
              path="/profile"
              element={<Profile currentUser={currentUser} />}
            />
            <Route path="/categories" element={<HackingCategories />} />
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
