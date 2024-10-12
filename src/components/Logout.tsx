import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  handleLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
    navigate("/auth");
  }, [handleLogout, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-green-500 text-xl">Logging out...</p>
    </div>
  );
};

export default Logout;
