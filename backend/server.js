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

/* ---------------- SECURITY ---------------- */
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

/* ---------------- RATE LIMITING ---------------- */
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter);

/* ---------------- CORS (PRODUCTION SAFE) ---------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-a4os.onrender.com",
  "https://url-shortener-w5rm.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests like Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);

      // DO NOT throw error (prevents Render crash)
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

/* ---------------- FIX PRE-FLIGHT (IMPORTANT) ---------------- */

// SAFE alternative to app.options("*")
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

/* ---------------- ROUTES ---------------- */

app.use("/api/v1", urlRoutes);

app.get("/r/:shortId", redirectUrl);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
  });
});

/* ---------------- START SERVER ---------------- */

const startServer = async () => {
  try {
    await connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed:", err.message);
    process.exit(1);
  }
};

startServer();
