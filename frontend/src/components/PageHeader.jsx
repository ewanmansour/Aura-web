export default function PageHeader({ title, children, eyebrow }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-aura-blush">{eyebrow}</p>
      ) : null}
      <h1 className="mb-4 font-display text-3xl text-white md:text-4xl">{title}</h1>
      {children ? (
        <p className="mx-auto max-w-2xl font-display text-sm leading-relaxed text-aura-blush md:text-base">
          {children}
        </p>
      ) : null}
    </div>
  );
}
