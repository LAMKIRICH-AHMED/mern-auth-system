const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./src/models/userModel");
const connectDB = require("./src/utils/db");
const AuthRoutes = require("./src/routes/AuthRoutes");
const DashboardRoutes = require('./src/routes/DashboardRoutes')
connectDB();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", AuthRoutes);
app.use("/",DashboardRoutes)

app.listen(port, () => {
  console.log(`listining at localhost:${port}`);
});
