import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connect from "./config/db.js";
import urlRoutes from "./route/url.routes.js";
import { redirectUrl } from "./controller/Url.controllers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter);

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
  }),
);

app.use("/api/v1", urlRoutes);

app.get("/r/:shortId", redirectUrl);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
  });
});

const startServer = async () => {
  try {
    await connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
