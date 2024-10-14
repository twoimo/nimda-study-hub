import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const result = await sql`
        SELECT * FROM user_profiles WHERE id = ${userId}
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const profile = result.rows[0];
      res.status(200).json({
        ...profile,
        work_experience: JSON.parse(profile.work_experience || "[]"),
        education: JSON.parse(profile.education || "[]"),
        skills: JSON.parse(profile.skills || "[]"),
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
