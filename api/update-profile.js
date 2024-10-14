import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, profile } = req.body;

    if (!userId || !profile) {
      return res
        .status(400)
        .json({ error: "User ID and profile data are required" });
    }

    try {
      await sql`
        UPDATE user_profiles
        SET
          full_name = ${profile.full_name},
          bio = ${profile.bio},
          location = ${profile.location},
          occupation = ${profile.occupation},
          twitter_handle = ${profile.twitter_handle},
          linkedin_url = ${profile.linkedin_url},
          github_username = ${profile.github_username},
          work_experience = ${JSON.stringify(profile.work_experience)},
          education = ${JSON.stringify(profile.education)},
          skills = ${JSON.stringify(profile.skills)}
        WHERE id = ${userId}
      `;

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
