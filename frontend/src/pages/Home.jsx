import { Instagram, MapPin, Coffee, Volume2, Briefcase, Sparkles, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandWordmark } from "../components/Brand.jsx";
import Button from "../components/Button.jsx";

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 pt-24 pb-16 text-center md:px-8 animate-fadeUp">
        <p className="mb-2 font-display text-base text-aura-cream/80 md:text-lg">
          Welcome to Aura Space
        </p>

        <BrandWordmark className="mb-4" />

        <p className="mb-3 text-xs font-thin uppercase tracking-[0.25em] text-white/90 md:text-sm">
          Your spiritual space for creativity
        </p>
        <p className="mb-10 font-script text-sm text-aura-cream/80">
          9 street 251, Degla Maadi
        </p>

        <div className="flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="https://maps.app.goo.gl/M1T5Y4vC1yiwJrDC8"
            target="_blank"
            rel="noopener noreferrer"
            icon={MapPin}
            className="w-full sm:w-auto"
          >
            Google Maps
          </Button>
          <Button
            href="https://www.instagram.com/auraspace.art"
            target="_blank"
            rel="noopener noreferrer"
            icon={Instagram}
            className="w-full sm:w-auto"
          >
            @auraspace.art
          </Button>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="mx-auto grid max-w-6xl w-full grid-cols-1 gap-6 px-4 pb-24 md:grid-cols-3">
        
        {/* Card 1: Creative Workspace (Span 2) */}
        <div className="glass-panel group relative overflow-hidden rounded-2xl p-6 md:col-span-2 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-soft">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-aura-cream group-hover:opacity-10 transition duration-300 pointer-events-none">
            <Briefcase className="h-28 w-28" />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-aura-cream/10 px-3 py-1 text-xs text-aura-blush">
                <Briefcase className="h-3.5 w-3.5" /> Workspace
              </div>
              <h2 className="mb-3 font-display text-2xl text-white md:text-3xl">Creative Workspace</h2>
              <p className="mb-6 text-sm leading-relaxed text-aura-blush max-w-xl">
                A calm, distraction-free environment tailored for writers, designers, and students. Get work done with fast Wi-Fi, cozy study corners, and access to bookable meeting rooms.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {["High-speed Wi-Fi", "Quiet study zone", "Meeting rooms", "InstaPay deposit"].map((feature) => (
                  <span key={feature} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-aura-cream">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Link to="/reservations" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:text-aura-blush transition group/link">
                Reserve Workspace <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Earthy Cafe (Span 1) */}
        <div className="glass-panel group relative overflow-hidden rounded-2xl p-6 md:col-span-1 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-soft">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-aura-cream group-hover:opacity-10 transition duration-300 pointer-events-none">
            <Coffee className="h-28 w-28" />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-aura-cream/10 px-3 py-1 text-xs text-aura-blush">
                <Coffee className="h-3.5 w-3.5" /> Beverages
              </div>
              <h2 className="mb-3 font-display text-2xl text-white">Earthy Cafe</h2>
              <p className="mb-6 text-sm leading-relaxed text-aura-blush">
                Brewed to spark creativity. Indulge in our signature Turkish coffee, Americano, freshly baked cookies, and carrot cakes.
              </p>
            </div>
            <div>
              <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:text-aura-blush transition group/link">
                View Cafe Menu <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: Podcast & Sound Corner (Span 1) */}
        <div className="glass-panel group relative overflow-hidden rounded-2xl p-6 md:col-span-1 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-soft">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-aura-cream group-hover:opacity-10 transition duration-300 pointer-events-none">
            <Volume2 className="h-28 w-28" />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-aura-cream/10 px-3 py-1 text-xs text-aura-blush">
                <Volume2 className="h-3.5 w-3.5" /> Recording
              </div>
              <h2 className="mb-3 font-display text-2xl text-white">Podcast Studio</h2>
              <p className="mb-6 text-sm leading-relaxed text-aura-blush">
                Treated acoustics, professional microphones, and a cozy setup perfect for voiceovers, interviews, and solo recordings.
              </p>
            </div>
            <div>
              <Link to="/reservations" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:text-aura-blush transition group/link">
                Book Studio <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 4: Wellness & Community Workshops (Span 2) */}
        <div className="glass-panel group relative overflow-hidden rounded-2xl p-6 md:col-span-2 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-soft">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-aura-cream group-hover:opacity-10 transition duration-300 pointer-events-none">
            <Sparkles className="h-28 w-28" />
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-aura-cream/10 px-3 py-1 text-xs text-aura-blush">
                <Sparkles className="h-3.5 w-3.5" /> Workshops & Events
              </div>
              <h2 className="mb-3 font-display text-2xl text-white md:text-3xl">Wellness & Art Workshops</h2>
              <p className="mb-6 text-sm leading-relaxed text-aura-blush max-w-xl">
                Reconnect and create at our weekly sessions. Join us for relaxing Clay & Coffee workshops, candle-lit Sound Healing journeys, and Open Mic storytelling nights.
              </p>
              <div className="mb-6 flex items-center gap-4 text-xs text-aura-cream">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-aura-blush" /> Weekly schedule</span>
                <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-aura-blush" /> Intimate settings</span>
              </div>
            </div>
            <div>
              <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:text-aura-blush transition group/link">
                Upcoming Schedule <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
