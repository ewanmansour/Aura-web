import { Router } from "express";
import { isDbConnected } from "../config/db.js";
import { authAdmin } from "../middlewares/auth.js";
import { Reservation } from "../models/Reservation.js";
import { inMemoryReservations } from "../data/store.js";

const router = Router();

// Protect all routes with admin auth
router.use(authAdmin);

// Get all reservations
router.get("/", async (_req, res, next) => {
  try {
    if (isDbConnected()) {
      const reservations = await Reservation.find({}).sort({ createdAt: -1 }).lean();
      return res.json(reservations);
    }
    return res.json(inMemoryReservations);
  } catch (error) {
    return next(error);
  }
});

// Update reservation
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, space, date, time, hours, notes } = req.body;

    if (!name || !phone || !space || !date || !time || !hours) {
      return res.status(400).json({ message: "All fields except notes are required." });
    }

    const updateData = {
      name,
      phone,
      space,
      date,
      time,
      hours: Number(hours),
      notes: notes || ""
    };

    if (isDbConnected()) {
      const updated = await Reservation.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Reservation not found." });
      }
      return res.json({ message: "Reservation updated successfully.", reservation: updated });
    }

    const index = inMemoryReservations.findIndex((r) => r._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    inMemoryReservations[index] = {
      ...inMemoryReservations[index],
      ...updateData
    };

    return res.json({
      message: "Reservation updated in demo mode.",
      reservation: inMemoryReservations[index]
    });
  } catch (error) {
    return next(error);
  }
});

// Delete reservation
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Reservation.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Reservation not found." });
      }
      return res.json({ message: "Reservation deleted successfully." });
    }

    const index = inMemoryReservations.findIndex((r) => r._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    inMemoryReservations.splice(index, 1);
    return res.json({ message: "Reservation deleted in demo mode." });
  } catch (error) {
    return next(error);
  }
});

export default router;
