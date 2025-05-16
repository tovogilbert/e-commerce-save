import express from "express";
import cors from "cors";
import { sequelize } from "../db/connection";

const app = express();

// Middleware globaux
app.use(cors());
app.use(express.json());


sequelize.sync().then(() => {
  console.log("Database synchronized");
});

export default app;
