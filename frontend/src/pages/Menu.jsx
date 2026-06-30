import { useState } from "react";
import { MenuMark } from "../components/Brand.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { fallbackMenu } from "../data/fallback.js";
import { useApiResource } from "../hooks/useApiResource.js";

const categoryOrder = [
  { key: "fridge", label: "Fridge" },
  { key: "hot drinks", label: "Hot Drinks" },
  { key: "snacks", label: "Snacks" },
  { key: "pastries", label: "Pastries" }
];

function MenuSection({ title, items }) {
  return (
    <section className="group">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-aura-cream/20 to-aura-cream/10 blur-sm" />
        <div className="relative rounded-lg border border-aura-cream/20 bg-aura-cream/[0.075] p-4 backdrop-blur-sm">
          <h2 className="text-center font-display text-xl tracking-wider text-aura-cream drop-shadow-sm lg:text-2xl">
            {title}
          </h2>
          <div className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-aura-cream/60 to-transparent" />
        </div>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={`${title}-${item.title}`} className="menu-row group/item relative overflow-hidden">
            <h3 className="text-left text-base font-medium text-aura-cream transition group-hover/item:text-white">
              {item.title}
            </h3>
            <div className="shrink-0">
              <p className="rounded-md bg-aura-cream/10 px-3 py-1 text-sm font-semibold text-aura-cream transition group-hover/item:bg-aura-cream/20">
                {item.price} L.E
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("fridge");
  const { data: menu } = useApiResource("/api/menu", fallbackMenu);
  const categories = menu.categories || fallbackMenu.categories;

  return (
    <main className="relative z-10 min-h-screen px-4 pb-16 pt-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <MenuMark className="mb-4 w-40 text-aura-cream" />
        <PageHeader title="Menu">
          Browse our selection of snacks, drinks, and pastries at Aura Space.
        </PageHeader>
      </div>

      <div className="pointer-events-none fixed bottom-8 left-6 z-0 hidden rotate-[-8deg] font-display text-5xl italic text-aura-cream/10 md:block">
        sip slowly
      </div>

      <section className="relative z-10 mx-auto max-w-7xl">
        {/* Mobile categories selector */}
        <div className="mb-6 md:hidden">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-aura-cream/10 bg-aura-cream/[0.045] p-1 backdrop-blur-sm">
            {categoryOrder.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={[
                  "aura-focus rounded-lg px-3 py-3 text-sm font-medium transition",
                  activeCategory === category.key
                    ? "border border-aura-cream/30 bg-aura-cream/20 text-aura-cream shadow-lg"
                    : "text-aura-cream/70 hover:bg-aura-cream/10 hover:text-aura-cream"
                ].join(" ")}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile View: Render active category */}
        <div className="md:hidden">
          {categoryOrder.map((category) =>
            activeCategory === category.key ? (
              <MenuSection
                key={category.key}
                title={category.label}
                items={categories[category.key] || []}
              />
            ) : null
          )}
        </div>

        {/* Desktop View: Render 4 columns side-by-side, aligning with auraspace.art */}
        <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
          {categoryOrder.map((category) => (
            <MenuSection
              key={category.key}
              title={category.label}
              items={categories[category.key] || []}
            />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-aura-cream/75">
          All items are subject to availability. Prices may change without prior notice.
        </p>
      </section>
    </main>
  );
}
