import express from "express";
import authRoutes from "./routes/authRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import usersRouters from "./routes/usersRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
const passportConfig = require("./config/passport");
const app = express();
const PORT = process.env.PORT || 3000;
passportConfig(passport);
app.use(bodyParser.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api/", messagesRoutes);
app.use("/api/users", usersRouters);

app.listen(PORT, () => {
  console.log("app running on port 3000");
});
