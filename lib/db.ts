import { Client, Pool } from "pg";

let pool: Pool | undefined;

// if (!pool) {
//   pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: Number(process.env.DB_PORT) || 5432,
//   });
// }



// user: process.env.DB_USER,
// host: process.env.DB_HOST,
// database: process.env.DB_DATABASE,
// password: process.env.DB_PASSWORD,
// port: Number(process.env.DB_PORT) || 5432,
// ssl: {
//   rejectUnauthorized: false, // This accepts self-signed certificates if necessary
// },


// with pg
// const client= new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }, // usually needed for Neon
// });
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;