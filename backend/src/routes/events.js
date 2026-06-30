import { Router } from "express";
import { isDbConnected } from "../config/db.js";
import { Event } from "../models/Event.js";
import { authAdmin } from "../middlewares/auth.js";
import { inMemoryEvents } from "../data/store.js";

const router = Router();

// Get all events
router.get("/", async (_req, res, next) => {
  try {
    let list = inMemoryEvents;

    if (isDbConnected()) {
      const dbEvents = await Event.find({}).sort({ date: 1, time: 1 }).lean();
      list = dbEvents.length ? dbEvents : inMemoryEvents;
    }

    return res.json(list);
  } catch (error) {
    return next(error);
  }
});

// Create event (Admin only)
router.post("/", authAdmin, async (req, res, next) => {
  try {
    const { title, category, date, time, price, location, description, imageTone, imageUrl, bookingLink } = req.body;

    if (!title || !category || !date || !time || price === undefined || !location || !description) {
      return res.status(400).json({ message: "All fields except image tone, imageUrl, and bookingLink are required." });
    }

    const eventData = {
      title,
      category,
      date,
      time,
      price: Number(price),
      location,
      description,
      imageTone: imageTone || "sage",
      imageUrl: imageUrl || "",
      bookingLink: bookingLink || ""
    };

    if (isDbConnected()) {
      const newEvent = await Event.create(eventData);
      return res.status(201).json({ message: "Event created.", event: newEvent });
    }

    const newEvent = {
      _id: `mock-event-${Date.now()}`,
      ...eventData
    };
    inMemoryEvents.push(newEvent);

    return res.status(201).json({ message: "Event created in demo mode.", event: newEvent });
  } catch (error) {
    return next(error);
  }
});

// Update event (Admin only)
router.put("/:id", authAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, date, time, price, location, description, imageTone, imageUrl, bookingLink } = req.body;

    if (!title || !category || !date || !time || price === undefined || !location || !description) {
      return res.status(400).json({ message: "All fields except image tone, imageUrl, and bookingLink are required." });
    }

    const eventData = {
      title,
      category,
      date,
      time,
      price: Number(price),
      location,
      description,
      imageTone: imageTone || "sage",
      imageUrl: imageUrl || "",
      bookingLink: bookingLink || ""
    };

    if (isDbConnected()) {
      const updated = await Event.findByIdAndUpdate(id, eventData, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Event not found." });
      }
      return res.json({ message: "Event updated.", event: updated });
    }

    const index = inMemoryEvents.findIndex((e) => e._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Event not found." });
    }

    inMemoryEvents[index] = {
      ...inMemoryEvents[index],
      ...eventData
    };

    return res.json({ message: "Event updated in demo mode.", event: inMemoryEvents[index] });
  } catch (error) {
    return next(error);
  }
});

// Delete event (Admin only)
router.delete("/:id", authAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await Event.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Event not found." });
      }
      return res.json({ message: "Event deleted successfully." });
    }

    const index = inMemoryEvents.findIndex((e) => e._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Event not found." });
    }

    inMemoryEvents.splice(index, 1);
    return res.json({ message: "Event deleted in demo mode." });
  } catch (error) {
    return next(error);
  }
});

export default router;
