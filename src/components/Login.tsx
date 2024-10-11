import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    setError("");

    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.status === 200) {
        // Store the token in localStorage or context
        localStorage.setItem("token", response.data.token);
        console.log("Login successful:", response.data);
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logged out successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
