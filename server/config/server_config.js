import dotenv from "dotenv"
dotenv.config()
var config = {

  //server details
  server: {
    host: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_PORT
  }
}
export default config;


