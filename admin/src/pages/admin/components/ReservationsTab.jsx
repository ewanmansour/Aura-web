import { Trash2 } from "lucide-react";

export default function ReservationsTab({ reservations, onDelete }) {
  if (reservations.length === 0) {
    return <p className="text-center py-12 text-aura-blush">No reservation requests yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-aura-cream/15 text-aura-blush uppercase tracking-wider text-xs">
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Space</th>
            <th className="py-3 px-4 font-primary">Date & Time</th>
            <th className="py-3 px-4">Hours</th>
            <th className="py-3 px-4">Notes</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {reservations.map((reservationItem) => (
            <tr key={reservationItem._id} className="hover:bg-white/[0.02] transition">
              <td className="py-3.5 px-4 font-semibold text-white">
                {reservationItem.name}
                <div className="text-xs text-aura-blush font-normal">{reservationItem.phone}</div>
              </td>
              <td className="py-3.5 px-4">{reservationItem.space}</td>
              <td className="py-3.5 px-4 font-primary">
                {reservationItem.date}
                <div className="text-xs text-aura-blush">{reservationItem.time}</div>
              </td>
              <td className="py-3.5 px-4">{reservationItem.hours} hrs</td>
              <td className="py-3.5 px-4 max-w-xs truncate text-aura-blush text-xs" title={reservationItem.notes}>
                {reservationItem.notes || "-"}
              </td>
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={() => onDelete(reservationItem._id)}
                  className="p-1.5 text-red-300 hover:text-red-100 hover:bg-red-500/10 rounded transition inline-flex items-center justify-center"
                  title="Delete Reservation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
