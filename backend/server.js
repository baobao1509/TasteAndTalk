import dotenv from "dotenv";
const envResult = dotenv.config();

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import seedTours from "./config/seed.js";
import tourRoutes from "./routes/tourRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log("--- Environment Debug ---");
  if (envResult.error) {
    console.error("❌ Dotenv Error:", envResult.error.message);
  } else {
    console.log("✅ .env file loaded successfully");
  }
  console.log("MONGODB_URI present:", !!process.env.MONGODB_URI);
  console.log("-------------------------");

  // Connect to Database
  await connectDB();
  
  // Seed Database (Optional, only if empty)
  if (process.env.MONGODB_URI) {
    await seedTours();
  }

  // Middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/tours", tourRoutes);
  app.use("/api/auth", authRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      root: path.resolve(__dirname, "../frontend"),
      configFile: path.resolve(__dirname, "../frontend/vite.config.js"),
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'frontend', 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    if (process.env.MONGODB_URI) {
      console.log("📡 MONGODB_URI detected, attempting connection...");
    } else {
      console.warn("⚠️ MONGODB_URI is missing! App is running in Demo Mode.");
    }
  });
}

startServer();
