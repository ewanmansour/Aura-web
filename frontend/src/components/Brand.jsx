export function BrandMark({ className = "" }) {
  return (
    <span className={`font-display text-3xl font-light italic tracking-wider lowercase text-aura-cream select-none ${className}`}>
      aura
    </span>
  );
}

export function BrandWordmark({ className = "" }) {
  return (
    <span className={`font-display text-8xl md:text-9xl font-light italic tracking-widest lowercase text-aura-cream select-none block ${className}`}>
      aura
    </span>
  );
}

export function MenuMark({ className = "" }) {
  return (
    <span className={`font-display text-5xl md:text-6xl font-light italic tracking-widest lowercase text-aura-cream select-none block ${className}`}>
      menu
    </span>
  );
}
