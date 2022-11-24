import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import adressRoutes from "./routes/adress.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(adressRoutes);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});