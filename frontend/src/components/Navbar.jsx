import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BrandMark } from "./Brand.jsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Reservations", to: "/reservations" },
  { label: "Menu", to: "/menu" }
];

function navLinkClass({ isActive }) {
  return [
    "rounded-xl px-4 py-2 text-sm font-medium transition duration-300",
    isActive
      ? "bg-white/15 text-white shadow-sm"
      : "text-white/70 hover:bg-white/10 hover:text-white"
  ].join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={[
          "mx-auto max-w-4xl rounded-2xl border px-6 py-3 transition duration-500",
          scrolled
            ? "border-aura-cream/15 bg-aura-deep/70 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-transparent"
        ].join(" ")}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            aria-label="Aura Space Home"
            className="aura-focus -ml-2 block rounded text-aura-cream transition hover:opacity-80"
          >
            <BrandMark className="text-2xl md:text-3xl" />
          </NavLink>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            className="aura-focus rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={[
          "mx-auto mt-2 max-w-4xl overflow-hidden rounded-2xl border transition-all duration-300 md:hidden",
          open
            ? "max-h-80 border-aura-cream/15 bg-aura-deep/80 p-4 opacity-100 backdrop-blur-xl"
            : "max-h-0 border-transparent p-0 opacity-0"
        ].join(" ")}
      >
        <div className="space-y-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={(state) => `${navLinkClass(state)} block`}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
