import mongoose from "mongoose";

const spaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    capacity: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    deposit: { type: Number, required: true },
    features: [{ type: String }],
    description: { type: String, required: true },
    imageUrl: { type: String, trim: true }
  },
  { timestamps: true }
);

export const Space = mongoose.model("Space", spaceSchema);
