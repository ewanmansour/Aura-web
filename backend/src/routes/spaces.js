import { Router } from "express";
import { isDbConnected } from "../config/db.js";
import { Reservation } from "../models/Reservation.js";
import { Space } from "../models/Space.js";
import { authAdmin } from "../middlewares/auth.js";
import { inMemorySpaces, inMemoryReservations } from "../data/store.js";

const router = Router();

// Get all spaces
router.get("/", async (_req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json(inMemorySpaces);
    }

    const spaces = await Space.find({}).sort({ hourlyRate: 1 }).lean();
    return res.json(spaces.length ? spaces : inMemorySpaces);
  } catch (error) {
    return next(error);
  }
});

// Submit a reservation request
router.post("/reservations", async (req, res, next) => {
  try {
    const { name, phone, space, date, time, hours, notes } = req.body;

    if (!name || !phone || !space || !date || !time || !hours) {
      return res.status(400).json({
        message: "Please fill in name, phone, space, date, time, and hours."
      });
    }

    const reservation = {
      name,
      phone,
      space,
      date,
      time,
      hours: Number(hours),
      notes: notes || ""
    };

    if (isDbConnected()) {
      const saved = await Reservation.create(reservation);
      return res.status(201).json({
        message: "Reservation request received.",
        reservation: saved
      });
    }

    const demoReservation = {
      _id: `demo-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...reservation
    };
    inMemoryReservations.push(demoReservation);

    return res.status(201).json({
      message: "Reservation request received in demo mode.",
      reservation: demoReservation
    });
  } catch (error) {
    return next(error);
  }
});

// Create space (Admin only)
router.post("/", authAdmin, async (req, res, next) => {
  try {
    const { name, slug, capacity, hourlyRate, deposit, features, description, imageUrl } = req.body;

    if (!name || !slug || !capacity || hourlyRate === undefined || deposit === undefined || !description) {
      return res.status(400).json({ message: "All fields except features are required." });
    }

    const spaceData = {
      name,
      slug,
      capacity,
      hourlyRate: Number(hourlyRate),
      deposit: Number(deposit),
      features: Array.isArray(features) ? features : [],
      description,
      imageUrl: imageUrl || ""
    };

    if (isDbConnected()) {
      const newSpace = await Space.create(spaceData);
      return res.status(201).json({ message: "Space created.", space: newSpace });
    }

    const newSpace = {
      _id: `mock-space-${Date.now()}`,
      ...spaceData
    };
    inMemorySpaces.push(newSpace);

    return res.status(201).json({ message: "Space created in demo mode.", space: newSpace });
  } catch (error) {
    return next(error);
  }
});

// Update space (Admin only)
router.put("/:id", authAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug, capacity, hourlyRate, deposit, features, description, imageUrl } = req.body;

    if (!name || !slug || !capacity || hourlyRate === undefined || deposit === undefined || !description) {
      return res.status(400).json({ message: "All fields except features are required." });
    }

    const spaceData = {
      name,
      slug,
      capacity,
      hourlyRate: Number(hourlyRate),
      deposit: Number(deposit),
      features: Array.isArray(features) ? features : [],
      description,
      imageUrl: imageUrl || ""
    };

    if (isDbConnected()) {
      const updated = await Space.findByIdAndUpdate(id, spaceData, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Space not found." });
      }
      return res.json({ message: "Space updated.", space: updated });
    }

    const index = inMemorySpaces.findIndex((s) => s._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Space not found." });
    }

    inMemorySpaces[index] = {
      ...inMemorySpaces[index],
      ...spaceData
    };

    return res.json({ message: "Space updated in demo mode.", space: inMemorySpaces[index] });
  } catch (error) {
    return next(error);
  }
});

// Delete space (Admin only)
router.delete("/:id", authAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Space.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Space not found." });
      }
      return res.json({ message: "Space deleted successfully." });
    }

    const index = inMemorySpaces.findIndex((s) => s._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Space not found." });
    }

    inMemorySpaces.splice(index, 1);
    return res.json({ message: "Space deleted in demo mode." });
  } catch (error) {
    return next(error);
  }
});

export default router;
