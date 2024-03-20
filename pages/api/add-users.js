import pool from "../../backend/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userID, firstName, lastName, email, password } = req.body;

    try {
      console.log("Received form data:", req.body);

      const result = await pool.query(
        `
        INSERT INTO users (user_id, first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id;        
        `,
        [userID, firstName, lastName, email, password]
      );

      const insertedUserId = result.rows[0].user_id;
      console.log("Inserted User ID:", insertedUserId);

      res.status(201).json({ insertedUserId });
    } catch (error) {
      console.error("Error inserting data into the database", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }
}
