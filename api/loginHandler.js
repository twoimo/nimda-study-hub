import { createClient } from "@vercel/postgres";
import bcrypt from "bcrypt"; // Assuming you use bcrypt for password hashing

const client = createClient();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  try {
    await client.connect();

    // Fetch user from the database
    const userQuery = `
      SELECT id, password FROM users WHERE username = $1
    `;
    const userResult = await client.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = userResult.rows[0];

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Authentication successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  } finally {
    await client.end();
  }
};
