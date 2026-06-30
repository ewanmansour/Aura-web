import { Router } from "express";
import { isDbConnected } from "../config/db.js";
import { MenuItem } from "../models/MenuItem.js";
import { authAdmin } from "../middlewares/auth.js";
import { inMemoryMenuItems } from "../data/store.js";

const router = Router();

function groupByCategory(items) {
  return items.reduce((groups, item) => {
    const category = item.category;
    groups[category] = groups[category] || [];
    groups[category].push(item);
    return groups;
  }, {});
}

// Get all menu items
router.get("/", async (_req, res, next) => {
  try {
    let items = inMemoryMenuItems;

    if (isDbConnected()) {
      const storedItems = await MenuItem.find({})
        .sort({ category: 1, title: 1 })
        .lean();
      items = storedItems.length ? storedItems : inMemoryMenuItems;
    }

    return res.json({
      categories: groupByCategory(items),
      items
    });
  } catch (error) {
    return next(error);
  }
});

// Create menu item (Admin only)
router.post("/", authAdmin, async (req, res, next) => {
  try {
    const { title, category, price, available } = req.body;

    if (!title || !category || price === undefined) {
      return res.status(400).json({ message: "Title, category, and price are required." });
    }

    const itemData = {
      title,
      category,
      price: Number(price),
      available: available !== false
    };

    if (isDbConnected()) {
      const newItem = await MenuItem.create(itemData);
      return res.status(201).json({ message: "Menu item created.", item: newItem });
    }

    const newItem = {
      _id: `mock-menu-${Date.now()}`,
      ...itemData
    };
    inMemoryMenuItems.push(newItem);

    return res.status(201).json({ message: "Menu item created in demo mode.", item: newItem });
  } catch (error) {
    return next(error);
  }
});

// Update menu item (Admin only)
router.put("/:id", authAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, price, available } = req.body;

    if (!title || !category || price === undefined) {
      return res.status(400).json({ message: "Title, category, and price are required." });
    }

    const itemData = {
      title,
      category,
      price: Number(price),
      available: available !== false
    };

    if (isDbConnected()) {
      const updated = await MenuItem.findByIdAndUpdate(id, itemData, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Menu item not found." });
      }
      return res.json({ message: "Menu item updated.", item: updated });
    }

    const index = inMemoryMenuItems.findIndex((item) => item._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    inMemoryMenuItems[index] = {
      ...inMemoryMenuItems[index],
      ...itemData
    };

    return res.json({ message: "Menu item updated in demo mode.", item: inMemoryMenuItems[index] });
  } catch (error) {
    return next(error);
  }
});

// Delete menu item (Admin only)
router.delete("/:id", authAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await MenuItem.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Menu item not found." });
      }
      return res.json({ message: "Menu item deleted successfully." });
    }

    const index = inMemoryMenuItems.findIndex((item) => item._id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    inMemoryMenuItems.splice(index, 1);
    return res.json({ message: "Menu item deleted in demo mode." });
  } catch (error) {
    return next(error);
  }
});

export default router;
