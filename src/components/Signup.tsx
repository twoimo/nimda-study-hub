import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    bio: "",
    avatar: "",
    location: "",
    occupation: "",
    twitterHandle: "",
    linkedinUrl: "",
    githubUsername: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", formData); // 로그 추가
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg neon-border w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center glitch-text">
          Sign Up
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="twitterHandle"
          placeholder="Twitter Handle"
          value={formData.twitterHandle}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="linkedinUrl"
          placeholder="LinkedIn URL"
          value={formData.linkedinUrl}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="githubUsername"
          placeholder="GitHub Username"
          value={formData.githubUsername}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
