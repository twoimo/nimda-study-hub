import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

interface SignupProps {
  setIsAuthenticated: (value: boolean) => void;
  setCurrentUser: (user: { id: number; username: string } | null) => void;
}

const Signup: React.FC<SignupProps> = ({
  setIsAuthenticated,
  setCurrentUser,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg neon-border w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center glitch-text flex items-center justify-center">
          <UserPlus className="mr-2" /> J01N TH3 H4CK3R
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
