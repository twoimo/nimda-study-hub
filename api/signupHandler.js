import { Client } from "@vercel/postgres";

const client = new Client();

export default async (req, res) => {
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

  try {
    await client.connect();

    // Insert into users table
    const userQuery = `
      INSERT INTO users (username, password, email)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const userValues = [username, password, email];
    const userResult = await client.query(userQuery, userValues);
    const userId = userResult.rows[0].id;

    // Insert into user_profiles table
    const profileQuery = `
      INSERT INTO user_profiles (id, full_name, bio, avatar, location, occupation, twitter_handle, linkedin_url, github_username)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const profileValues = [
      userId,
      fullName,
      bio,
      avatar,
      location,
      occupation,
      twitterHandle,
      linkedinUrl,
      githubUsername,
    ];
    await client.query(profileQuery, profileValues);

    await client.end();

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "An error occurred during signup" });
  }
};
