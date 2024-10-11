import { createClient } from "@vercel/postgres";
import bcrypt from "bcrypt";

const client = createClient();

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res
      .status(201)
      .json({ message: "User registered successfully", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  } finally {
    await client.end();
  }
};

export default registerUser;
