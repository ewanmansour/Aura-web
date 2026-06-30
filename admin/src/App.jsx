import Admin from "./pages/admin/index.jsx";
import DecorativeCorners from "./components/DecorativeCorners.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-aura-olive text-aura-cream">
      <DecorativeCorners />
      <div className="relative z-10 px-4 py-8">
        <Admin />
      </div>
    </div>
  );
}
