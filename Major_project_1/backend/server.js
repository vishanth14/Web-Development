import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(cors({
      origin: process.env.CLIENT_URL || "*",
      credentials: true,
    }));
    app.use(express.json());

    app.use("/api/admin", adminRoutes);
    app.use("/api/contact", contactRoutes);
    app.use("/api/content", contentRoutes);

    app.get("/", (req, res) => {
      res.send("API Running");
    });

    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();