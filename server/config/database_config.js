import dotenv from "dotenv"
dotenv.config()

import mysql2 from "mysql2/promise"

const hostname = process.env.DB_HOSTNAME
const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE


const mysqlConnection = mysql2.createPool({
  host: hostname,
  port: port,
  user: user,
  password: password,
  database: database,
})

export default mysqlConnection;
