import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId } = req.query;

  try {
    const result = await sql`
      SELECT full_name, bio, avatar, location, occupation FROM profiles WHERE user_id = ${userId}
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
