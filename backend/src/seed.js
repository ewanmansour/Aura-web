import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";
import { events, menuItems, spaces } from "./data/seedData.js";
import { Event } from "./models/Event.js";
import { MenuItem } from "./models/MenuItem.js";
import { Space } from "./models/Space.js";

async function seed() {
  const connected = await connectDb();

  if (!connected) {
    throw new Error("Cannot seed without a working MONGO_URI.");
  }

  await Promise.all([
    Event.deleteMany({}),
    MenuItem.deleteMany({}),
    Space.deleteMany({})
  ]);

  await Promise.all([
    Event.insertMany(events),
    MenuItem.insertMany(menuItems),
    Space.insertMany(spaces)
  ]);

  console.log("Seed data inserted.");
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
