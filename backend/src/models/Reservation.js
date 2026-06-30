import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    space: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    hours: { type: Number, required: true, min: 1 },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export const Reservation = mongoose.model("Reservation", reservationSchema);
