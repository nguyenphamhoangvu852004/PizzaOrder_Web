import app from "./app.js";
import config from "./config/server_config.js";
import mysqlConnection from "./config/database_config.js";

const HOSTNAME = config.server.host;
const PORT = config.server.port || 3001;

mysqlConnection.getConnection()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on http://${HOSTNAME}:${PORT}`);
    });

  })
  .catch((err) => {
    console.log("Failed to connect to the database:", err);
  });


