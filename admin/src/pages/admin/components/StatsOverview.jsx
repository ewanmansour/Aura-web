export default function StatsOverview({ stats }) {
  return (
    <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-4">
      <div className="glass-panel rounded-lg p-4 text-center">
        <p className="text-xs uppercase tracking-[0.1em] text-aura-blush">Reservations</p>
        <p className="mt-1 font-display text-3xl text-white">{stats.reservations}</p>
      </div>
      <div className="glass-panel rounded-lg p-4 text-center">
        <p className="text-xs uppercase tracking-[0.1em] text-aura-blush">Menu Items</p>
        <p className="mt-1 font-display text-3xl text-white">{stats.menuItems}</p>
      </div>
      <div className="glass-panel rounded-lg p-4 text-center">
        <p className="text-xs uppercase tracking-[0.1em] text-aura-blush">Events</p>
        <p className="mt-1 font-display text-3xl text-white">{stats.events}</p>
      </div>
      <div className="glass-panel rounded-lg p-4 text-center">
        <p className="text-xs uppercase tracking-[0.1em] text-aura-blush">Spaces</p>
        <p className="mt-1 font-display text-3xl text-white">{stats.spaces}</p>
      </div>
    </div>
  );
}
