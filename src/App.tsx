import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Terminal,
  Shield,
  Zap,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import Forum from "./components/Forum";
import Tools from "./components/Tools";
import Profile from "./components/Profile";
import HackingCategories from "./components/HackingCategories";
import AuthForm from "./components/AuthForm";
import Logout from "./components/Logout";

const Header: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center mb-8 print:hidden">
      <h1 className="text-2xl md:text-3xl font-bold glitch-text">
        N1MD4 STU3Y HU8
      </h1>
      <nav className="hidden md:flex items-center">
        <NavLinks handleLogout={handleLogout} />
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-gray-800 p-4 rounded-lg shadow-lg z-50">
          <nav className="flex flex-col space-y-2">
            <NavLinks handleLogout={handleLogout} mobile />
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks: React.FC<{ handleLogout: () => void; mobile?: boolean }> = ({
  handleLogout,
  mobile,
}) => {
  const linkClass = mobile
    ? "text-white hover:text-neon-blue transition-colors duration-300"
    : "mr-4 hover:text-neon-blue transition-colors duration-300";

  return (
    <>
      <Link to="/" className={linkClass}>
        Dashboard
      </Link>
      <Link to="/forum" className={linkClass}>
        Forum
      </Link>
      <Link to="/tools" className={linkClass}>
        Tools
      </Link>
      <Link to="/categories" className={linkClass}>
        Categories
      </Link>
      <Link to="/profile" className={linkClass}>
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className={`flex items-center bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
          mobile ? "mt-2" : ""
        }`}
      >
        <LogOut className="mr-2" size={16} />
        <span>Logout</span>
      </button>
    </>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    username: string;
  } | null>(null);
  const location = useLocation();

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

  const showHeader = isAuthenticated && location.pathname !== "/auth";
  const showFooter = isAuthenticated;

  return (
    <div className="min-h-screen bg-black text-green-500 p-4">
      {showHeader && <Header handleLogout={handleLogout} />}
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
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />}
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
              isAuthenticated ? <HackingCategories /> : <Navigate to="/auth" />
            }
          />
        </Routes>
      </main>

      {showFooter && (
        <footer className="mt-8 text-center text-xs md:text-sm print:hidden">
          <p>
            Disclaimer: This platform is for educational purposes only. Engage
            in ethical hacking and always obtain proper authorization.
          </p>
        </footer>
      )}
    </div>
  );
};

export default App;
