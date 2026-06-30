import { Link } from "react-router-dom";

const baseClasses =
  "aura-focus inline-flex min-h-10 min-w-44 items-center justify-center gap-2 rounded-md px-8 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition duration-300 md:text-sm";

const variants = {
  cream:
    "bg-aura-cream text-aura-olive hover:bg-aura-deep hover:text-aura-cream",
  clay: "bg-aura-clay text-aura-cream hover:bg-aura-blush hover:text-aura-deep",
  ghost:
    "border border-aura-cream/25 bg-aura-cream/5 text-aura-cream hover:bg-aura-cream/15"
};

export default function Button({
  children,
  to,
  href,
  icon: Icon,
  variant = "cream",
  className = "",
  ...props
}) {
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4" strokeWidth={1.8} /> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} {...props}>
      {content}
    </a>
  );
}
