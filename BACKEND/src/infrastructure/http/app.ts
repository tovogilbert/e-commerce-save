import express from "express";
import cors from "cors";
import { sequelize } from "../db/connection";
import clientRoutes from "./routes/clientRoutes";
import brandRoutes from "./routes/brandRoutes";
import featureRoutes from "./routes/featureRoute";
import productRoutes from "./routes/productRoutes";
import { setupSwagger } from './config/swagger';
import { setupRelations } from "../db/models/product/Relations";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

// Middleware globaux
app.use(cors());
app.use(express.json());
setupRelations();

// Routes
const api = "/api";
app.use(`${api}/clients`, clientRoutes);
app.use(`${api}/brands`, brandRoutes);
app.use(`${api}/features`, featureRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/payments`, paymentRoutes);


// Setup Swagger
setupSwagger(app);

sequelize.sync().then(() => {
  console.log("Database synchronized");
});

export default app;
