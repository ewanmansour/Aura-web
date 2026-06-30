import { Instagram, Music2, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-aura-olive px-4 py-8 text-center text-aura-cream">
      <div className="absolute inset-x-0 top-0 border-t border-dashed border-aura-cream/30" />
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 font-display text-xl font-bold tracking-wider text-white md:text-2xl">
          STAY CONNECTED
        </h2>

        <div className="mb-6 flex justify-center gap-4">
          <a
            href="https://www.instagram.com/auraspace.art/"
            target="_blank"
            rel="noopener noreferrer"
            className="aura-focus grid h-12 w-12 place-items-center rounded-full bg-aura-cream/10 text-aura-cream transition hover:scale-110 hover:bg-aura-cream/20"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.tiktok.com/@auraspace.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="aura-focus grid h-12 w-12 place-items-center rounded-full bg-aura-cream/10 text-aura-cream transition hover:scale-110 hover:bg-aura-cream/20"
            aria-label="TikTok"
          >
            <Music2 className="h-5 w-5" />
          </a>
        </div>

        <div className="mb-6">
          <a
            href="https://chat.whatsapp.com/H9m17qzUhHn8YTcH5lQfRx"
            target="_blank"
            rel="noopener noreferrer"
            className="aura-focus inline-flex items-center gap-2 rounded-full bg-aura-clay px-6 py-3 font-display text-base font-semibold text-aura-cream transition hover:bg-aura-blush hover:text-aura-deep"
          >
            Join our WhatsApp Community
            <Phone className="h-4 w-4" />
          </a>
        </div>

        <a
          href="https://maps.app.goo.gl/1hbnCtycJVHZv1Ng9"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 block font-script text-base text-aura-cream transition hover:text-white"
        >
          9 street 251, Degla Maadi, Cairo
        </a>
        <p className="mb-4 text-xs font-thin uppercase text-aura-deep">
          Your spiritual space for creativity!
        </p>

        <div className="mb-4 flex justify-center gap-4 text-xs">
          <Link className="text-aura-cream/80 transition hover:text-white" to="/privacy-policy">
            Privacy Policy
          </Link>
          <span className="text-aura-cream/50">|</span>
          <Link className="text-aura-cream/80 transition hover:text-white" to="/terms-of-service">
            Terms of Service
          </Link>
        </div>

        <p className="text-xs text-aura-cream">(c) 2026 Aura Space. All rights reserved.</p>
      </div>
    </footer>
  );
}
