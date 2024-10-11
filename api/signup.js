// api/signup.js
const express = require("express");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development.local" });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const router = express.Router();

router.post("/signup", async (req, res) => {
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

  console.log("Received data:", req.body); // 로그 추가

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("BEGIN");

    const userResult = await pool.query(
      `INSERT INTO users (username, password, email)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, hashedPassword, email]
    );

    const userId = userResult.rows[0].id;

    await pool.query(
      `INSERT INTO user_profiles (id, full_name, bio, avatar, location, occupation, twitter_handle, linkedin_url, github_username)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        userId,
        fullName,
        bio,
        avatar,
        location,
        occupation,
        twitterHandle,
        linkedinUrl,
        githubUsername,
      ]
    );

    await pool.query("COMMIT");

    res.status(201).json(userResult.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ error: "An error occurred during signup. Please try again." });
  }
});

module.exports = router;
