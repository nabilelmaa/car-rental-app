// const { Pool } = require("pg");

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "nabil200101@",
//   database: "rahioui-cars",
// });

// module.exports = pool;

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: true // Ensure SSL certificate verification
  }
});

// Handle pool connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
