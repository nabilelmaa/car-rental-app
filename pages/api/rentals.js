// import pool from "../../backend/db";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const {
//       location,
//       pickUpDate,
//       dropOffDate,
//       pickUpTime,
//       dropOffTime,
//       phone,
//       carId,
//     } = req.body;

//     try {
//       console.log("Received form data:", req.body);

//       const result = await pool.query(
//         `
//         INSERT INTO rentals (car_id, store_loc, pick_up_date, drop_off_date, pick_up_time, drop_off_time, phone)
//         VALUES ($1, (SELECT id FROM store_location WHERE address = $2), $3, $4, $5, $6, $7)
//         RETURNING id;
//         `,
//         [
//           carId,
//           location,
//           pickUpDate,
//           dropOffDate,
//           pickUpTime,
//           dropOffTime,
//           phone,
//         ]
//       );

//       const rentalId = result.rows[0].id;
//       console.log("Rental ID:", rentalId);

//       res.status(201).json({ rentalId });
//     } catch (error) {
//       console.error("Error inserting data into the database", error);
//       res
//         .status(500)
//         .json({ error: "Internal Server Error", details: error.message });
//     }
//   }
// }

import pool from "../../backend/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      location,
      pickUpDate,
      dropOffDate,
      pickUpTime,
      dropOffTime,
      phone,
      carId,
    } = req.body;

    try {
      console.log("Received form data:", req.body);

      // Log values for debugging
      console.log(
        "Values for query:",
        carId,
        location,
        pickUpDate,
        dropOffDate,
        pickUpTime,
        dropOffTime,
        phone
      );

      // Check for time conflicts
      const conflictQueryText = `
      SELECT id FROM rentals
      WHERE car_id = $1
      AND store_loc = (SELECT id FROM store_location WHERE address = $2)
      AND (
        (pick_up_date, pick_up_time) < ($4, $6) AND (drop_off_date, drop_off_time) > ($3, $5)
        OR
        (pick_up_date, pick_up_time) < ($4, $6) AND (drop_off_date, drop_off_time) > ($3, $5)
        OR
        (pick_up_date, pick_up_time) >= ($3, $5) AND (drop_off_date, drop_off_time) <= ($4, $6)
      )
    `;
    
    console.log("Conflict check query:", conflictQueryText);
    console.log("Conflict check parameters:", [carId, location, pickUpDate, dropOffDate, pickUpTime, dropOffTime]);
    

      const conflictQuery = await pool.query(conflictQueryText, [carId, location, pickUpDate, dropOffDate, pickUpTime, dropOffTime]);

      if (conflictQuery.rows.length > 0) {
        // Time conflict found
        return res.status(400).json({ error: "Time conflict for the selected car." });
      }

      // If no time conflict, proceed with the insertion
      const result = await pool.query(
        `
          INSERT INTO rentals (car_id, store_loc, pick_up_date, drop_off_date, pick_up_time, drop_off_time, phone)
          VALUES ($1, (SELECT id FROM store_location WHERE address = $2), $3, $4, $5, $6, $7)
          RETURNING id;
        `,
        [carId, location, pickUpDate, dropOffDate, pickUpTime, dropOffTime, phone]
      );

      const rentalId = result.rows[0].id;
      console.log("Rental ID:", rentalId);

      res.status(201).json({ rentalId });
    } catch (error) {
      console.error("Error inserting data into the database", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
}
