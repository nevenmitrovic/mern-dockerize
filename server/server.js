const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.DB_URI;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// routes
app.get("/", (req, res) => {
  res.status(200).json({ status: "healty!" });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { username } = req.body;

    const newUser = new User({ username });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // connect to MongoDB
  console.log("connecting to db...");
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connection established"))
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
});
