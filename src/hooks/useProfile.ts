import { useState, useEffect } from "react";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  full_name: string;
  bio: string;
  avatar: string;
  location: string;
  occupation: string;
  join_date: string;
  twitter_handle: string;
  linkedin_url: string;
  github_username: string;
  work_experience: any[];
  education: any[];
  skills: string[];
}

export const useProfile = (userId: number | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/profile?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, setProfile, loading, error };
};
