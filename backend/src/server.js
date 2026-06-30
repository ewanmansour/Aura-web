import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDb } from "./config/db.js";
import eventsRouter from "./routes/events.js";
import menuRouter from "./routes/menu.js";
import spacesRouter from "./routes/spaces.js";
import adminRouter from "./routes/admin.js";
import reservationsRouter from "./routes/reservations.js";

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

// Production Environment Safeguards
if (process.env.NODE_ENV === "production") {
  if (!process.env.MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI environment variable is required in production!");
    process.exit(1);
  }
  if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET environment variable is required in production!");
    process.exit(1);
  }
}

await connectDb();

// Rate limiters for security
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: "Too many login attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false
});

const reservationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: { message: "Too many reservation requests. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(compression());
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim())
  : [
      process.env.CLIENT_ORIGIN || "http://127.0.0.1:5173",
      "http://127.0.0.1:5174"
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed === "*") return true;
        return origin === allowed;
      });
      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ message: "Aura API is active and running.", health: "/api/health" });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "aura-api" });
});

// Register routers
app.use("/api/admin/login", loginLimiter);
app.use("/api/admin", adminRouter);
app.use("/api/spaces/reservations", reservationLimiter);
app.use("/api/spaces", spacesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/menu", menuRouter);
app.use("/api/reservations", reservationsRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientDistPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong."
  });
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Aura API listening on http://127.0.0.1:${port}`);
  });
}

export default app;
