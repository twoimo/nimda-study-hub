const { Client } = require("@vercel/postgres");

const client = new Client();

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

  try {
    await client.connect();
    const query = `
      INSERT INTO users (username, password, email, fullName, bio, avatar, location, occupation, twitterHandle, linkedinUrl, githubUsername)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
    const values = [
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
    ];
    await client.query(query, values);
    await client.end();

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "An error occurred during signup" });
  }
};
