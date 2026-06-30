import { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Search,
  Plus,
  History,
  ArrowRight,
  X
} from "lucide-react";
import { fallbackEvents } from "../data/fallback.js";
import { useApiResource } from "../hooks/useApiResource.js";

const toneClasses = {
  clay: "from-aura-clay/80 via-aura-blush/60 to-aura-cream/20",
  sage: "from-aura-deep/80 via-aura-olive/70 to-aura-cream/20",
  rose: "from-[#8d6256] via-aura-clay/70 to-aura-blush/30"
};

function EventArt({ tone = "sage", title = "Event" }) {
  return (
    <div className={`relative h-full min-h-[250px] w-full overflow-hidden rounded-lg bg-gradient-to-br ${toneClasses[tone] || toneClasses.sage} flex items-center justify-center p-6`}>
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full border border-aura-cream/40" />
      <div className="absolute bottom-5 right-6 h-20 w-20 rounded-full bg-aura-cream/20 blur-sm" />
      <div className="absolute inset-x-8 bottom-8 h-1 rounded-full bg-aura-cream/35" />
      <div className="absolute right-12 top-12 h-16 w-16 rotate-45 rounded-md border border-aura-cream/30" />
      <span className="relative z-10 text-center font-display text-2xl font-bold text-aura-cream drop-shadow-md">
        {title}
      </span>
    </div>
  );
}

export default function Events() {
  const { data: events, loading } = useApiResource("/api/events", fallbackEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Helper date parsing/formatting functions
  function getEventDate(dateStr) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  function formatBadgeDate(dateStr) {
    const dateObj = getEventDate(dateStr);
    if (!dateObj) return dateStr;
    const day = dateObj.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[dateObj.getMonth()]}`;
  }

  function formatFullDate(dateStr) {
    const dateObj = getEventDate(dateStr);
    if (!dateObj) return dateStr;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function isUpcoming(dateStr) {
    const dateObj = getEventDate(dateStr);
    if (!dateObj) {
      return !/finish|complete|past/i.test(dateStr);
    }
    return dateObj >= today;
  }

  // Pre-calculate counts
  const upcomingCount = events.filter((e) => isUpcoming(e.date)).length;
  const pastCount = events.length - upcomingCount;

  // Filter logic
  const filteredEvents = events.filter((e) => {
    // 1. Filter by tab
    const eventIsUpcoming = isUpcoming(e.date);
    if (filterTab === "upcoming" && !eventIsUpcoming) return false;
    if (filterTab === "past" && eventIsUpcoming) return false;

    // 2. Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        e.title.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query) ||
        e.category.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <main className="relative z-10 min-h-screen px-4 pb-16 pt-28">
      {/* Branding Header aligned with auraspace.art */}
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
          Aura Space Events
        </h1>
        <p className="text-sm md:text-base text-aura-blush/90 max-w-2xl mx-auto leading-relaxed">
          Discover transformative experiences in our serene space.
        </p>
        <p className="text-sm md:text-base text-aura-blush/90 max-w-2xl mx-auto leading-relaxed mb-6">
          Join us for mindfulness, wellness, and community events.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-aura-cream/80">
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin className="h-4 w-4 text-aura-blush" /> Maadi, Cairo
          </span>
          <a href="tel:01226568908" className="flex items-center gap-1.5 font-medium hover:text-white transition">
            <Clock className="h-4 w-4 text-aura-blush" /> 01226568908
          </a>
        </div>
      </div>

      {/* Search & Filter Panel Card */}
      <div className="mx-auto max-w-4xl bg-aura-cream/10 border border-aura-cream/20 rounded-2xl p-6 shadow-soft backdrop-blur-md mb-12">
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-aura-cream/50" />
          <input
            type="text"
            placeholder="Search events by title, description, or category..."
            className="w-full bg-white text-aura-deep rounded-xl pl-12 pr-4 py-3 placeholder:text-aura-deep/45 shadow-inner border-0 focus:ring-2 focus:ring-aura-cream transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFilterTab("all")}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              filterTab === "all"
                ? "bg-aura-deep text-white shadow-md"
                : "bg-white text-aura-deep hover:bg-aura-cream/40"
            }`}
          >
            <CalendarDays className="h-4 w-4" /> All ({events.length})
          </button>
          <button
            onClick={() => setFilterTab("upcoming")}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              filterTab === "upcoming"
                ? "bg-aura-deep text-white shadow-md"
                : "bg-white text-aura-deep hover:bg-aura-cream/40"
            }`}
          >
            <Plus className="h-4 w-4" /> Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setFilterTab("past")}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
              filterTab === "past"
                ? "bg-aura-deep text-white shadow-md"
                : "bg-white text-aura-deep hover:bg-aura-cream/40"
            }`}
          >
            <History className="h-4 w-4" /> Past ({pastCount})
          </button>
        </div>

        <p className="text-center text-xs text-aura-cream/65 mt-4">
          Showing {filteredEvents.length} of {events.length} events
        </p>
      </div>

      {/* Events Grid/List matching the exact dynamic details */}
      <div className="mx-auto max-w-4xl space-y-6">
        {filteredEvents.map((eventItem) => {
          const bookingUrl = eventItem.bookingLink || "https://www.instagram.com/auraspace.art";
          const eventIsUpcoming = isUpcoming(eventItem.date);

          return (
            <article
              key={eventItem._id || eventItem.title}
              onClick={() => setSelectedEvent(eventItem)}
              className="bg-aura-cream rounded-xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300 group cursor-pointer border border-white/10"
            >
              <div className="flex flex-col md:flex-row">
                
                {/* Details Section (Left on desktop) */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
                  <div>
                    {/* Meta Info Row */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-aura-deep/70">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-aura-clay" />
                          {eventItem.location || "Aura Space, Maadi"}
                        </span>
                        <span className="bg-aura-deep/10 text-aura-deep px-2.5 py-0.5 rounded-md font-semibold tracking-wide uppercase text-[10px]">
                          {eventItem.category}
                        </span>
                      </div>

                      {/* Date & Time Badges */}
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-aura-deep text-sm md:text-base">
                          {formatBadgeDate(eventItem.date)}
                        </span>
                        {/* Organic css blob styling for time badge */}
                        <span
                          className="bg-aura-deep text-aura-cream text-xxs font-bold px-3 py-1 text-center whitespace-nowrap shadow-sm"
                          style={{ borderRadius: "60% 40% 60% 40% / 40% 60% 40% 60%" }}
                        >
                          {eventItem.time}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-aura-deep mb-3 group-hover:text-aura-clay transition">
                      {eventItem.title}
                    </h2>

                    <p className="text-sm leading-relaxed text-aura-deep/75 font-sans mb-6 line-clamp-3">
                      {eventItem.description}
                    </p>
                  </div>

                  {/* Card Footer row */}
                  <div className="flex items-center justify-between border-t border-aura-deep/5 pt-4">
                    <span className="text-xl font-bold text-aura-deep">
                      {eventItem.price} EGP
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-semibold text-aura-deep/60 hidden sm:block">
                        {eventIsUpcoming ? "Available for booking" : "Event completed"}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-aura-deep text-white group-hover:translate-x-1 transition-transform duration-200 shadow-sm">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banner Image Section (Right on desktop) */}
                <div className="w-full md:w-2/5 order-1 md:order-2 relative min-h-[220px] md:min-h-[300px]">
                  {eventItem.imageUrl ? (
                    <div className="h-full w-full relative overflow-hidden bg-aura-deep/5">
                      <img
                        src={eventItem.imageUrl}
                        alt={eventItem.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <EventArt tone={eventItem.imageTone} title={eventItem.title} />
                  )}

                  {/* Status Overlay Badge on Image */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white text-aura-deep px-4 py-2 rounded-lg font-bold text-xs shadow-lg uppercase tracking-wide">
                      {eventIsUpcoming ? "Book Now" : "Finished"}
                    </span>
                  </div>
                </div>

              </div>
            </article>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-aura-cream/5 rounded-2xl border border-aura-cream/10">
            <p className="text-aura-cream/60 text-lg">No events found matching your filter.</p>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-aura-deep p-6 text-aura-cream shadow-glow max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Event Art/Banner inside Modal */}
            <div className="mb-6 h-48 w-full overflow-hidden rounded-lg">
              {selectedEvent.imageUrl ? (
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full relative">
                  <EventArt tone={selectedEvent.imageTone} title={selectedEvent.title} />
                </div>
              )}
            </div>

            {/* Category and Location */}
            <div className="mb-2 flex items-center gap-3 text-xs text-aura-blush">
              <span className="bg-aura-cream/10 px-2.5 py-0.5 rounded-md font-semibold tracking-wide uppercase text-[10px]">
                {selectedEvent.category}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-aura-clay" />
                {selectedEvent.location || "Aura Space, Maadi"}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-3xl font-bold text-white mb-4">
              {selectedEvent.title}
            </h3>

            {/* Date, Time, Price Grid */}
            <div className="mb-6 grid grid-cols-3 gap-4 border-y border-white/10 py-4 text-xs md:text-sm">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-aura-blush/60 mb-1">Date</span>
                <span className="font-medium">{formatFullDate(selectedEvent.date)}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-aura-blush/60 mb-1">Time</span>
                <span className="font-medium">{selectedEvent.time}</span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-aura-blush/60 mb-1">Price</span>
                <span className="font-semibold text-white">{selectedEvent.price} EGP</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-aura-blush/60 mb-2">About Event</span>
              <p className="text-sm leading-relaxed text-aura-cream/80 font-sans">
                {selectedEvent.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
              >
                Back
              </button>
              <a
                href={selectedEvent.bookingLink || "https://www.instagram.com/auraspace.art"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-aura-cream py-3 text-center text-xs font-bold uppercase tracking-wider text-aura-olive transition hover:bg-white hover:shadow-soft"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
