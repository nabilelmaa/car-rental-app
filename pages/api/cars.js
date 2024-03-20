import pool from "../../backend/db";

export default async function handler(req, res) {
  try {
    const result = await pool.query(`
    SELECT
    cars.id AS car_id,
    manufacturers.id AS manufacturer_id,
    manufacturers.name AS manufacturer_name,
    cars.model,
    cars.fuel_type,
    cars.transmission_type,
    cars.production_year,
    cars.image_url,
    cars.seats,
    cars.price
  FROM
    cars
  INNER JOIN
    manufacturers ON cars.manufacturer_id = manufacturers.id
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching data from the database", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// LEFT JOIN
// rentals ON cars.id = rentals.car_id
// WHERE
// rentals.car_id IS NULL;
