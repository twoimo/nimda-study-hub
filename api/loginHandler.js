import { createClient } from "@vercel/postgres";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const client = createClient();
const secretKey = "your_secret_key"; // 환경 변수로 설정하는 것이 좋습니다.

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  } finally {
    await client.end();
  }
};

export default loginUser;
