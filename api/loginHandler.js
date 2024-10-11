const { Client } = require("@neondatabase/serverless");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
    const values = [username, password];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ error: "An error occurred during login. Please try again." });
  } finally {
    await client.end();
  }
};
