import express from "express";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log("app running on port 3000");
});
