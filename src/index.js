import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});