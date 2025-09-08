import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes.js";
import philosophyRoutes from "./routes/philosophyRoutes.js";
import LoveRoutes from "./routes/LoveRoutes.js";
import EmotionalRoutes from "./routes/EmotionalRoutes.js";
import SelfRoutes from "./routes/SelfRoutes.js";
import studentBookRoutes from "./routes/book.routes.js"; // ✅ Changed variable name
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/philosophy", philosophyRoutes);
app.use("/api/love", LoveRoutes);
app.use("/api/emotional", EmotionalRoutes);
app.use("/api/self", SelfRoutes);
app.use("/api/user", studentBookRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });