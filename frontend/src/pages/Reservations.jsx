import { CheckCircle2, Clock, MapPin, Phone, Users } from "lucide-react";
import { useMemo, useState, useRef } from "react";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { fallbackSpaces } from "../data/fallback.js";
import { useApiResource } from "../hooks/useApiResource.js";

const initialForm = {
  name: "",
  phone: "",
  space: fallbackSpaces[0].name,
  date: "",
  time: "",
  hours: "2",
  notes: ""
};

function SpaceVisual({ index }) {
  const positions = [
    "left-8 top-8 h-20 w-20",
    "right-8 top-12 h-24 w-24",
    "bottom-8 left-14 h-28 w-28"
  ];

  return (
    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-aura-deep via-aura-olive to-aura-clay/70">
      <div className={`absolute rounded-full border border-aura-cream/35 ${positions[index % positions.length]}`} />
      <div className="absolute bottom-8 right-8 h-16 w-28 rounded-full bg-aura-cream/15 blur-sm" />
      <div className="absolute inset-x-8 top-1/2 h-px bg-aura-cream/25" />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-aura-cream/75">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "aura-focus w-full rounded-md border border-aura-cream/15 bg-aura-cream/10 px-3 py-2.5 text-sm text-white placeholder:text-aura-cream/45";

export default function Reservations() {
  const { data: spaces } = useApiResource("/api/spaces", fallbackSpaces);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  
  const bookingFormRef = useRef(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSelectSpace(spaceName) {
    setForm((current) => ({ ...current, space: spaceName }));
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function submitReservation(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      let response;
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "";
        response = await fetch(`${baseUrl}/api/spaces/reservations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      } catch (netErr) {
        throw new Error("Cannot connect to server. Please check if backend is running.");
      }

      let payload = {};
      try {
        payload = await response.json();
      } catch (jsonErr) {
        throw new Error(`Server returned an error status ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(payload.message || "Could not submit reservation.");
      }

      setStatus({ type: "success", message: payload.message });
      setForm((current) => ({ ...initialForm, space: current.space }));
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative z-10 min-h-screen px-4 pb-16 pt-28">
      <PageHeader title="Reserve a Space">
        Meeting rooms, podcast studios, and event halls - reserve by the hour with an InstaPay
        deposit.
      </PageHeader>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-aura-cream">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <MapPin className="h-4 w-4 text-aura-blush" /> Maadi, Cairo
        </span>
        <a className="inline-flex items-center gap-1.5 transition hover:text-white font-medium" href="tel:01226568908">
          <Phone className="h-4 w-4 text-aura-blush" /> 01226568908
        </a>
      </div>

      {/* Spaces Listing */}
      <section className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((space, index) => (
          <article
            key={space.slug || space.name}
            className="overflow-hidden rounded-xl bg-aura-cream text-aura-deep shadow-soft flex flex-col justify-between"
          >
            <div>
              {space.imageUrl ? (
                <div className="relative h-48 overflow-hidden bg-aura-deep/5 border-b border-aura-deep/5">
                  <img
                    src={space.imageUrl}
                    alt={space.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <SpaceVisual index={index} />
              )}
              
              <div className="p-5">
                <h2 className="mb-2 font-display text-2xl font-bold text-aura-deep">{space.name}</h2>
                <p className="mb-4 text-sm leading-relaxed text-aura-deep/75">{space.description}</p>
                
                <div className="mb-5 space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <Users className="h-4.5 w-4.5 text-aura-clay" />
                    <span className="font-medium text-aura-deep/80">{space.capacity}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4.5 w-4.5 text-aura-clay" />
                    <span className="font-semibold text-aura-deep">{space.hourlyRate} L.E / hour</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-aura-clay" />
                    <span className="font-medium text-aura-deep/75">{space.deposit} L.E deposit</span>
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {space.features.map((feature) => (
                    <span key={feature} className="rounded-md bg-aura-deep/5 px-2.5 py-0.5 text-xxs font-semibold uppercase text-aura-deep/70 tracking-wide">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-5 pt-0">
              <button
                onClick={() => handleSelectSpace(space.name)}
                className="w-full bg-aura-deep text-white py-2.5 rounded-lg font-bold text-xs tracking-wider uppercase transition hover:bg-aura-clay shadow-sm"
              >
                Reserve {space.name}
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Booking Form and Custom Request Section */}
      <section
        ref={bookingFormRef}
        className="mx-auto mt-16 grid max-w-5xl gap-8 rounded-2xl border border-aura-cream/10 bg-aura-cream/[0.045] p-6 shadow-soft backdrop-blur-md md:grid-cols-[1fr_1.1fr] md:p-10 scroll-mt-24"
      >
        <div>
          <h2 className="mb-3 font-display text-3xl text-white">Need something custom?</h2>
          <p className="mb-8 text-sm leading-relaxed text-aura-blush/90">
            Send a booking request here or message us on WhatsApp and we will tailor the setup for
            your session.
          </p>
          <Button
            href="https://wa.me/201226568908"
            target="_blank"
            rel="noopener noreferrer"
            icon={Phone}
            className="w-full sm:w-fit"
          >
            Chat on WhatsApp
          </Button>
        </div>

        <form className="grid gap-4" onSubmit={submitReservation}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input className={inputClasses} name="name" value={form.name} onChange={updateField} placeholder="Your name" required />
            </Field>
            <Field label="Phone">
              <input className={inputClasses} name="phone" value={form.phone} onChange={updateField} placeholder="012..." required />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Space">
              <select className={`${inputClasses} text-aura-deep bg-white focus:text-white focus:bg-aura-cream/10`} name="space" value={form.space} onChange={updateField}>
                {spaces.map((space) => (
                  <option className="text-aura-deep" key={space.slug || space.name} value={space.name}>
                    {space.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Hours">
              <input className={inputClasses} min="1" name="hours" type="number" value={form.hours} onChange={updateField} required />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date">
              <input className={inputClasses} min={today} name="date" type="date" value={form.date} onChange={updateField} required />
            </Field>
            <Field label="Time">
              <input className={inputClasses} name="time" type="time" value={form.time} onChange={updateField} required />
            </Field>
          </div>

          <Field label="Notes">
            <textarea className={`${inputClasses} min-h-24 resize-y`} name="notes" value={form.notes} onChange={updateField} placeholder="Setup, equipment, or event details" />
          </Field>

          {status.message ? (
            <p
              className={`rounded-md px-3 py-2.5 text-sm font-semibold ${
                status.type === "success"
                  ? "bg-green-500/15 text-green-100"
                  : "bg-red-500/15 text-red-100"
              }`}
            >
              {status.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="aura-focus rounded-md bg-aura-cream px-8 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-aura-olive transition hover:bg-aura-deep hover:text-aura-cream disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
          >
            {submitting ? "Sending..." : "Submit Reservation Request"}
          </button>
        </form>
      </section>
    </main>
  );
}
