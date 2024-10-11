import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/register", {
        username,
        password,
      });
      if (response.status === 201) {
        setSuccess("User registered successfully");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("User already exists or registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
