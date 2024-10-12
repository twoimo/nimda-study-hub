import React, { useState, useEffect } from "react";

const Profile: React.FC<{ currentUser: { id: number; username: string } }> = ({
  currentUser,
}) => {
  const [profileData, setProfileData] = useState<{
    fullName: string;
    bio: string;
    avatar: string;
    location: string;
    occupation: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/profile?userId=${currentUser.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setProfileData(data);
          }
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("An error occurred while fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const fullName = formData.get("fullName") as string;
    const bio = formData.get("bio") as string;
    const avatar = formData.get("avatar") as string;
    const location = formData.get("location") as string;
    const occupation = formData.get("occupation") as string;

    try {
      const response = await fetch("/api/saveProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          fullName,
          bio,
          avatar,
          location,
          occupation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save profile data");
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
      setError("An error occurred while saving profile data");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (profileData) {
    return (
      <div>
        <h1>{profileData.fullName}</h1>
        <p>{profileData.bio}</p>
        <img src={profileData.avatar} alt="Avatar" />
        <p>{profileData.location}</p>
        <p>{profileData.occupation}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Create Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          required
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          required
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          required
          className="w-full p-2 mb-4 bg-black text-green-500 border border-green-500 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
