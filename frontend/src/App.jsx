import { Route, Routes } from "react-router-dom";
import DecorativeCorners from "./components/DecorativeCorners.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Events from "./pages/Events.jsx";
import Home from "./pages/Home.jsx";
import Legal from "./pages/Legal.jsx";
import Menu from "./pages/Menu.jsx";
import Reservations from "./pages/Reservations.jsx";


export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-aura-olive text-aura-cream">
      <ScrollToTop />
      <DecorativeCorners />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/privacy-policy" element={<Legal title="Privacy Policy" />} />
        <Route path="/terms-of-service" element={<Legal title="Terms of Service" />} />
      </Routes>
      <Footer />
    </div>
  );
}
