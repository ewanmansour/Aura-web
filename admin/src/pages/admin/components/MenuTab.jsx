import { Check, Edit2, Plus, Trash2, X } from "lucide-react";

export default function MenuTab({ menuItems, onAdd, onEdit, onDelete }) {
  if (menuItems.length === 0) {
    return <p className="text-center py-12 text-aura-blush">No menu items found.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">Menu Items</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded bg-aura-cream px-3.5 py-1.5 text-xs font-semibold uppercase text-aura-olive hover:bg-white transition"
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-aura-cream/15 text-aura-blush uppercase tracking-wider text-xs">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {menuItems.map((menuItem) => (
              <tr key={menuItem._id} className="hover:bg-white/[0.02] transition">
                <td className="py-3.5 px-4 font-semibold text-white">{menuItem.title}</td>
                <td className="py-3.5 px-4 capitalize">{menuItem.category}</td>
                <td className="py-3.5 px-4">{menuItem.price} L.E</td>
                <td className="py-3.5 px-4">
                  {menuItem.available !== false ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-300 font-semibold bg-green-500/10 px-2 py-0.5 rounded">
                      <Check className="h-3 w-3" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-red-300 font-semibold bg-red-500/10 px-2 py-0.5 rounded">
                      <X className="h-3 w-3" /> Out of stock
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(menuItem)}
                    className="p-1.5 text-aura-blush hover:text-white hover:bg-white/10 rounded transition inline-flex items-center justify-center"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(menuItem._id)}
                    className="p-1.5 text-red-300 hover:text-red-100 hover:bg-red-500/10 rounded transition inline-flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
