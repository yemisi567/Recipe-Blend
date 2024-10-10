require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4090;

app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);

// Test Route to check if the server is running
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
