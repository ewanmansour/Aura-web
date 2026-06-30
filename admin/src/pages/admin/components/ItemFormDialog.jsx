import { X } from "lucide-react";

export default function ItemFormDialog({
  editingItem,
  newItemType,
  formData,
  onFieldChange,
  onClose,
  onSave
}) {
  const isEdit = !!editingItem;
  const currentFormType = isEdit ? editingItem.type : newItemType;

  if (!currentFormType) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between border-b border-aura-cream/10 pb-4">
        <h2 className="font-display text-2xl text-white">
          {isEdit ? `Edit ${editingItem.type}` : `Add New ${newItemType}`}
        </h2>
        <button onClick={onClose} className="rounded-full p-1 transition hover:bg-aura-cream/10">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-4">
        {currentFormType === "menu" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">TITLE</label>
                <input
                  type="text"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.title || ""}
                  onChange={(e) => onFieldChange("title", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">CATEGORY</label>
                <select
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.category || "hot drinks"}
                  onChange={(e) => onFieldChange("category", e.target.value)}
                >
                  <option value="hot drinks">Hot Drinks</option>
                  <option value="fridge">Fridge / Cold Drinks</option>
                  <option value="snacks">Snacks</option>
                  <option value="pastries">Pastries</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">PRICE (L.E)</label>
                <input
                  type="number"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.price || 0}
                  onChange={(e) => onFieldChange("price", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">AVAILABILITY</label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available !== false}
                    onChange={(e) => onFieldChange("available", e.target.checked)}
                    className="h-4 w-4 rounded border-aura-cream/15 bg-aura-cream/10 text-aura-olive focus:ring-aura-cream/60"
                  />
                  <label htmlFor="available" className="text-sm text-white">Available</label>
                </div>
              </div>
            </div>
          </>
        )}

        {currentFormType === "event" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">TITLE</label>
                <input
                  type="text"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.title || ""}
                  onChange={(e) => onFieldChange("title", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">CATEGORY</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Workshop, Wellness"
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.category || ""}
                  onChange={(e) => onFieldChange("category", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">DATE</label>
                <input
                  type="date"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.date || ""}
                  onChange={(e) => onFieldChange("date", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">TIME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7:00 PM"
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.time || ""}
                  onChange={(e) => onFieldChange("time", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">PRICE (L.E)</label>
                <input
                  type="number"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.price || 0}
                  onChange={(e) => onFieldChange("price", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">LOCATION</label>
                <input
                  type="text"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.location || ""}
                  onChange={(e) => onFieldChange("location", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">IMAGE TONE</label>
                <select
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.imageTone || "sage"}
                  onChange={(e) => onFieldChange("imageTone", e.target.value)}
                >
                  <option value="sage">Sage (Green)</option>
                  <option value="clay">Clay (Orange/Brown)</option>
                  <option value="rose">Rose (Pink/Red)</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">IMAGE URL (BANNER)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.imageUrl || ""}
                  onChange={(e) => onFieldChange("imageUrl", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">BOOKING LINK (INSTAGRAM/WHATSAPP)</label>
                <input
                  type="text"
                  placeholder="https://instagram.com/... or https://wa.me/..."
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.bookingLink || ""}
                  onChange={(e) => onFieldChange("bookingLink", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-aura-cream/75">DESCRIPTION</label>
              <textarea
                required
                rows="3"
                className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                value={formData.description || ""}
                onChange={(e) => onFieldChange("description", e.target.value)}
              />
            </div>
          </>
        )}

        {currentFormType === "space" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">SPACE NAME</label>
                <input
                  type="text"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.name || ""}
                  onChange={(e) => onFieldChange("name", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">SLUG</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. meeting-room"
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.slug || ""}
                  onChange={(e) => onFieldChange("slug", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">CAPACITY</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2-8 people"
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.capacity || ""}
                  onChange={(e) => onFieldChange("capacity", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">HOURLY RATE (L.E)</label>
                <input
                  type="number"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.hourlyRate || 0}
                  onChange={(e) => onFieldChange("hourlyRate", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-aura-cream/75">DEPOSIT (L.E)</label>
                <input
                  type="number"
                  required
                  className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                  value={formData.deposit || 0}
                  onChange={(e) => onFieldChange("deposit", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-aura-cream/75">FEATURES (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. Fast Wi-Fi, Whiteboard, Coffee service"
                className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                value={
                  Array.isArray(formData.features)
                    ? formData.features.join(", ")
                    : formData.features || ""
                }
                onChange={(e) =>
                  onFieldChange(
                    "features",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-aura-cream/75">IMAGE URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                value={formData.imageUrl || ""}
                onChange={(e) => onFieldChange("imageUrl", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-aura-cream/75">DESCRIPTION</label>
              <textarea
                required
                rows="3"
                className="aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white"
                value={formData.description || ""}
                onChange={(e) => onFieldChange("description", e.target.value)}
              />
            </div>
          </>
        )}

        <div className="flex gap-3 pt-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-aura-cream/15 px-6 py-2.5 text-sm text-aura-cream hover:bg-white/5 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-aura-cream px-8 py-2.5 text-sm font-semibold uppercase text-aura-olive hover:bg-white hover:text-aura-olive transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
