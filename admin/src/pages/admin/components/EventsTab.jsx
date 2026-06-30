import { Calendar, Clock, Edit2, MapPin, Plus, Trash2 } from "lucide-react";

export default function EventsTab({ events, onAdd, onEdit, onDelete }) {
  if (events.length === 0) {
    return <p className="text-center py-12 text-aura-blush">No events listed.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">Events Schedule</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded bg-aura-cream px-3.5 py-1.5 text-xs font-semibold uppercase text-aura-olive hover:bg-white transition"
        >
          <Plus className="h-4 w-4" /> Add Event
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((eventItem) => (
          <div
            key={eventItem._id}
            className="border border-white/5 bg-white/5 rounded-lg p-5 flex flex-col justify-between hover:border-white/15 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-full bg-aura-clay/20 px-2.5 py-0.5 text-xs text-aura-blush">
                  {eventItem.category}
                </span>
                <span className="text-sm font-semibold text-aura-blush">{eventItem.price} L.E</span>
              </div>
              <h3 className="font-display text-xl text-white mb-2">{eventItem.title}</h3>
              <p className="text-xs text-aura-blush leading-relaxed mb-4">{eventItem.description}</p>

              <div className="space-y-1.5 text-xs text-aura-cream mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-aura-blush" /> {eventItem.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-aura-blush" /> {eventItem.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-aura-blush" /> {eventItem.location}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-white/5 pt-3">
              <button
                onClick={() => onEdit(eventItem)}
                className="flex items-center gap-1 rounded border border-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition"
              >
                <Edit2 className="h-3 w-3" /> Edit
              </button>
              <button
                onClick={() => onDelete(eventItem._id)}
                className="flex items-center gap-1 rounded bg-red-500/20 px-3 py-1.5 text-xs text-red-200 hover:bg-red-500/40 transition"
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
