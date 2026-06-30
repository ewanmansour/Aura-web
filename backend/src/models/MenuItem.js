import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["fridge", "hot drinks", "snacks", "pastries"],
      required: true
    },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
