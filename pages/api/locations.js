import pool from "../../backend/db";

export default async function handler(req, res) {
  try {
    const result = await pool.query(`
        SELECT * FROM store_location;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data from the database", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
