import { Check, Clock, Edit2, Plus, Trash2, Users } from "lucide-react";

export default function SpacesTab({ spaces, onAdd, onEdit, onDelete }) {
  if (spaces.length === 0) {
    return <p className="text-center py-12 text-aura-blush">No booking spaces found.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">Booking Spaces</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded bg-aura-cream px-3.5 py-1.5 text-xs font-semibold uppercase text-aura-olive hover:bg-white transition"
        >
          <Plus className="h-4 w-4" /> Add Space
        </button>
      </div>

      <div className="space-y-4">
        {spaces.map((spaceItem) => (
          <div
            key={spaceItem._id}
            className="border border-white/5 bg-white/5 rounded-lg p-5 flex flex-col md:flex-row justify-between gap-4 hover:border-white/15 transition"
          >
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-white">{spaceItem.name}</h3>
              <p className="text-sm text-aura-blush">{spaceItem.description}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-aura-blush" /> {spaceItem.capacity}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-aura-blush" /> {spaceItem.hourlyRate} L.E/hr
                </span>
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-aura-blush" /> Deposit: {spaceItem.deposit} L.E
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(Array.isArray(spaceItem.features) ? spaceItem.features : []).map((feat) => (
                  <span key={feat} className="rounded bg-aura-cream/10 px-2 py-0.5 text-xxs text-aura-blush">
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4 min-w-[100px]">
              <button
                onClick={() => onEdit(spaceItem)}
                className="flex items-center justify-center gap-1 rounded border border-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition"
              >
                <Edit2 className="h-3 w-3" /> Edit
              </button>
              <button
                onClick={() => onDelete(spaceItem._id)}
                className="flex items-center justify-center gap-1 rounded bg-red-500/20 px-3 py-1.5 text-xs text-red-200 hover:bg-red-500/40 transition"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
