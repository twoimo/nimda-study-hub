import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Calendar,
  Twitter,
  Linkedin,
  Github,
  Edit2,
  Printer,
  Eye,
  EyeOff,
  Book,
  Award,
  Plus,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";

interface ProfileProps {
  currentUser: { id: number; username: string } | null;
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const { profile, setProfile, loading, error } = useProfile(
    currentUser?.id || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isResumeView, setIsResumeView] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    if (!profile || !currentUser) return;
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id, profile }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const printResume = () => {
    window.print();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden print:shadow-none print:bg-white print:text-black">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gray-700 p-4 print:bg-white print:text-black">
          <div className="text-center">
            <img
              className="h-24 w-24 md:h-32 md:w-32 rounded-full mx-auto mb-4 border-4 border-green-500 print:border-gray-300"
              src={profile.avatar || "https://via.placeholder.com/150"}
              alt={profile.username}
            />
            <h2 className="text-xl md:text-2xl font-semibold text-white print:text-black">
              {profile.full_name}
            </h2>
            <p className="text-green-500 text-sm md:text-base print:text-gray-600">
              @{profile.username}
            </p>
          </div>
          <div className="mt-4 text-gray-300 text-sm md:text-base print:text-gray-700">
            <p className="flex items-center mb-2">
              <MapPin size={16} className="mr-2" /> {profile.location}
            </p>
            <p className="flex items-center mb-2">
              <Briefcase size={16} className="mr-2" /> {profile.occupation}
            </p>
            <p className="flex items-center mb-2">
              <Calendar size={16} className="mr-2" /> Joined{" "}
              {new Date(profile.join_date).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4 flex justify-center space-x-4 print:hidden">
            {profile.twitter_handle && (
              <a
                href={`https://twitter.com/${profile.twitter_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <Twitter size={20} />
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500"
              >
                <Linkedin size={20} />
              </a>
            )}
            {profile.github_username && (
              <a
                href={`https://github.com/${profile.github_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300"
              >
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-center mb-4 print:hidden">
            <h3 className="text-lg md:text-xl font-semibold text-white">
              {isResumeView ? "Professional Resume" : "Profile Information"}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsResumeView(!isResumeView)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded flex items-center text-sm"
              >
                {isResumeView ? (
                  <Eye size={16} className="mr-1 md:mr-2" />
                ) : (
                  <EyeOff size={16} className="mr-1 md:mr-2" />
                )}
                {isResumeView ? "Profile" : "Resume"}
              </button>
              {isResumeView && (
                <button
                  onClick={printResume}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded flex items-center text-sm"
                >
                  <Printer size={16} className="mr-1 md:mr-2" /> Print
                </button>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded flex items-center text-sm"
              >
                {isEditing ? (
                  <Save size={16} className="mr-1 md:mr-2" />
                ) : (
                  <Edit2 size={16} className="mr-1 md:mr-2" />
                )}
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="full_name"
                    value={profile.full_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="mt-1 text-white">{profile.full_name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="mt-1 text-white">{profile.bio}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="mt-1 text-white">{profile.location}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Occupation
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="occupation"
                    value={profile.occupation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                ) : (
                  <p className="mt-1 text-white">{profile.occupation}</p>
                )}
              </div>
              {/* Add more fields as needed */}
            </div>
            {isEditing && (
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
