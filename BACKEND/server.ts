import "module-alias/register";
import app from "./src/infrastructure/http/app";
import dotenv from "dotenv";
import { sequelize } from "./src/infrastructure/db/connection";

dotenv.config();

const PORT = process.env.PORT || 3002;

async function startServer() {
  try {
    // Lancement du serveur HTTP
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
