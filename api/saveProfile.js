import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, fullName, bio, avatar, location, occupation } = req.body;

  try {
    const result = await sql`
      INSERT INTO profiles (user_id, full_name, bio, avatar, location, occupation)
      VALUES (${userId}, ${fullName}, ${bio}, ${avatar}, ${location}, ${occupation})
      RETURNING *
    `;

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving profile data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
