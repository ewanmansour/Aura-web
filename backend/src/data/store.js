import { events as seedEvents, menuItems as seedMenuItems, spaces as seedSpaces } from "./seedData.js";

// Add temporary mock IDs and parameters to seed data so they can be identified, updated, and deleted
export const inMemoryReservations = [];

const mockImages = [
  "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop", // Clay & Coffee
  "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop", // Sound Healing
  "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&auto=format&fit=crop"  // Open Mic
];

export const inMemoryEvents = seedEvents.map((item, idx) => ({
  _id: `mock-event-${idx + 1}`,
  imageUrl: mockImages[idx % mockImages.length],
  bookingLink: "https://www.instagram.com/auraspace.art",
  ...item
}));

export const inMemoryMenuItems = seedMenuItems.map((item, idx) => ({
  _id: `mock-menu-${idx + 1}`,
  available: item.available !== false, // default true
  ...item
}));

const mockSpaceImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop", // Meeting Room
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop", // Podcast Studio
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"  // Event Hall
];

export const inMemorySpaces = seedSpaces.map((item, idx) => ({
  _id: `mock-space-${idx + 1}`,
  imageUrl: mockSpaceImages[idx % mockSpaceImages.length],
  ...item
}));

