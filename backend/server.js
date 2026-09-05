const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");
const authRouter  = require("./routes/auth.routes");
const mediaRouter = require("./routes/media.Routes");

const app = express();



connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/media",mediaRouter)

app.use((error, req, res, next) => {
  if (error.message === "Only supported image and video files are allowed") {
    return res.status(400).json({ message: error.message });
  }

  next(error);
});

app.get("/", (req, res) => {
  res.json({
    message: "Media Website Backend Running 🚀"
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});