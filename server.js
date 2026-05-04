// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Example API route (optional, for Telegram bot interactions)
app.post("/api/bet", (req, res) => {
  const { numbers, amount } = req.body;
  // You can add your betting logic here
  console.log("Bet received:", numbers, amount);
  res.json({ status: "success", message: "Bet placed!" });
});

// Catch-all route to serve index.html for Telegram Mini App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
