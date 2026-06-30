import PageHeader from "../components/PageHeader.jsx";

export default function Legal({ title }) {
  return (
    <main className="relative z-10 min-h-screen px-4 pb-16 pt-28">
      <PageHeader title={title}>
        This demo page is included so the footer links behave like a complete site.
      </PageHeader>

      <section className="aura-card mx-auto max-w-3xl p-6 text-sm leading-7 text-aura-cream/85">
        <p>
          Aura Space uses submitted contact details only to respond to bookings and community
          requests. For a production launch, replace this placeholder with your final legal copy.
        </p>
      </section>
    </main>
  );
}
