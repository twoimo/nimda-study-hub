import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("User logged out");
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
