// api/signup.js
const { sql } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    username,
    password,
    email,
    fullName,
    bio,
    avatar,
    location,
    occupation,
    twitterHandle,
    linkedinUrl,
    githubUsername,
  } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await sql`
      INSERT INTO users (username, password, email)
      VALUES (${username}, ${hashedPassword}, ${email})
      RETURNING id
    `;

    const userId = userResult.rows[0].id;

    await sql`
      INSERT INTO user_profiles (id, full_name, bio, avatar, location, occupation, twitter_handle, linkedin_url, github_username)
      VALUES (${userId}, ${fullName}, ${bio}, ${avatar}, ${location}, ${occupation}, ${twitterHandle}, ${linkedinUrl}, ${githubUsername})
    `;

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "An error occurred during signup. Please try again." });
  }
};
