import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", formData);
      const response = await fetch("/api/loginHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/dashboard"); // Redirect to dashboard or another page after successful login
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg neon-border w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center glitch-text">
          Login
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
