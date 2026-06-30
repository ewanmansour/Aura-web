export const fallbackEvents = [
  {
    title: "Clay & Coffee",
    category: "Workshop",
    date: "2026-06-05",
    time: "7:00 PM",
    price: 450,
    location: "Aura Garden",
    description:
      "A slow evening of hand-building clay pieces, warm drinks, and quiet creative company.",
    imageTone: "clay"
  },
  {
    title: "Sound Healing Night",
    category: "Wellness",
    date: "2026-06-12",
    time: "8:30 PM",
    price: 350,
    location: "Main Hall",
    description:
      "A candle-lit sound journey designed for rest, grounding, and soft reconnection.",
    imageTone: "sage"
  },
  {
    title: "Open Mic at Aura",
    category: "Community",
    date: "2026-06-19",
    time: "8:00 PM",
    price: 150,
    location: "Outdoor Stage",
    description:
      "Poetry, acoustic sets, and stories from the community in an intimate open-air setup.",
    imageTone: "rose"
  }
];

export const fallbackSpaces = [
  {
    name: "Meeting Room",
    slug: "meeting-room",
    capacity: "2-8 people",
    hourlyRate: 250,
    deposit: 200,
    features: ["Fast Wi-Fi", "Whiteboard", "Coffee service"],
    description: "A calm room for planning sessions, study groups, and small teams."
  },
  {
    name: "Podcast Studio",
    slug: "podcast-studio",
    capacity: "1-4 people",
    hourlyRate: 450,
    deposit: 300,
    features: ["Two microphones", "Acoustic panels", "Recording desk"],
    description: "A warm, treated corner for interviews, solo shows, and voice work."
  },
  {
    name: "Event Hall",
    slug: "event-hall",
    capacity: "Up to 45 people",
    hourlyRate: 900,
    deposit: 500,
    features: ["Projector", "Sound system", "Flexible seating"],
    description: "A flexible hall for workshops, launches, screenings, and community nights."
  }
];

export const fallbackMenu = {
  categories: {
    fridge: [
      { title: "Water", price: 10 },
      { title: "V-Cola", price: 30 },
      { title: "Redbull", price: 80 },
      { title: "Ice Tea", price: 50 },
      { title: "Hibro", price: 50 },
      { title: "Ice Coffee", price: 60 }
    ],
    "hot drinks": [
      { title: "Turkish Coffee", price: 35 },
      { title: "Americano", price: 45 },
      { title: "Latte", price: 65 },
      { title: "Hot Chocolate", price: 60 },
      { title: "Herbal Tea", price: 35 }
    ],
    snacks: [
      { title: "Bimbo", price: 20 },
      { title: "Oreo Biscuit", price: 30 },
      { title: "Granola Bar", price: 70 },
      { title: "Pretzels", price: 30 },
      { title: "Greek Yoghurt", price: 70 }
    ],
    pastries: [
      { title: "Cookies", price: 70 },
      { title: "Carrot Cake", price: 70 },
      { title: "Chocolate Cake", price: 70 },
      { title: "Brownies", price: 80 },
      { title: "Cheese Cake", price: 150 }
    ]
  }
};
