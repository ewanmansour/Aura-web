import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageTone: { type: String, default: "sage" },
    imageUrl: { type: String, trim: true },
    bookingLink: { type: String, trim: true }
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
