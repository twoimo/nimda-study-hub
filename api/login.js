import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "20241012"; // Manually set the JWT_SECRET

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  try {
    // Check if user exists
    const result = await sql`
      SELECT id, username, password FROM users WHERE username = ${username}
    `;

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET, // Use the manually set JWT_SECRET
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
