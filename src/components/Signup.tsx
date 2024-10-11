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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setError("");
    setSuccess("");

    // 클라이언트 측 유효성 검사
    if (!formData.username || !formData.password || !formData.email) {
      setError("필수 필드를 모두 입력해 주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("유효한 이메일 주소를 입력해 주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/signupHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess("회원가입이 완료되었습니다. 로그인 해주세요.");
        setTimeout(() => navigate("/"), 2000); // 2초 후 로그인 페이지로 리디렉션
      } else {
        const errorData = await response.json();
        setError(errorData.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
          required
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
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
