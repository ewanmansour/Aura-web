import crypto from "node:crypto";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { isDbConnected } from "../config/db.js";
import { authAdmin } from "../middlewares/auth.js";
import { Event } from "../models/Event.js";
import { MenuItem } from "../models/MenuItem.js";
import { Reservation } from "../models/Reservation.js";
import { Space } from "../models/Space.js";
import {
  inMemoryEvents,
  inMemoryMenuItems,
  inMemoryReservations,
  inMemorySpaces
} from "../data/store.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "aura_secret_key_production_ready";

function timingSafeCompare(a, b) {
  const aHash = crypto.createHash("sha256").update(a).digest();
  const bHash = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(aHash, bHash);
}

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

  const isUsernameValid = timingSafeCompare(username || "", expectedUsername);
  const isPasswordValid = timingSafeCompare(password || "", expectedPassword);

  if (isUsernameValid && isPasswordValid) {
    const token = jwt.sign({ username, isAdmin: true }, JWT_SECRET, {
      expiresIn: "24h"
    });
    return res.json({
      token,
      message: "Logged in successfully."
    });
  }

  return res.status(401).json({ message: "Invalid credentials." });
});

router.get("/stats", authAdmin, async (_req, res, next) => {
  try {
    if (isDbConnected()) {
      const [reservations, menuItems, events, spaces] = await Promise.all([
        Reservation.countDocuments({}),
        MenuItem.countDocuments({}),
        Event.countDocuments({}),
        Space.countDocuments({})
      ]);
      return res.json({ reservations, menuItems, events, spaces });
    }

    return res.json({
      reservations: inMemoryReservations.length,
      menuItems: inMemoryMenuItems.length,
      events: inMemoryEvents.length,
      spaces: inMemorySpaces.length,
      demoMode: true
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
