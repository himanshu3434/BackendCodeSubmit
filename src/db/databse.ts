import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

// const notes = async () => {
//   return await pool.query("SELECT * from Submission");
// };

// async function fight() {
//   const [row] = await notes();
//   console.log(row);
// }
// fight();

export default pool;
