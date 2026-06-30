function CornerShape({ className = "", flip = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 260 260"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={flip ? "translate(260 260) rotate(180)" : undefined}>
        <path
          d="M0 0h258C191 21 155 65 139 112c-20 59-74 100-139 111V0Z"
          fill="#efe6dc"
          opacity="0.34"
        />
        <path
          d="M0 0h177c-53 31-78 73-86 126C84 174 43 208 0 220V0Z"
          fill="#ddc7ba"
          opacity="0.42"
        />
        <path
          d="M0 0h92C68 32 58 66 58 101c0 33-23 71-58 92V0Z"
          fill="#aa7258"
          opacity="0.5"
        />
        <circle cx="102" cy="78" r="8" fill="#efe6dc" opacity="0.65" />
      </g>
    </svg>
  );
}

export default function DecorativeCorners() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden [transform:translate3d(0,0,0)] [will-change:transform]">
      <CornerShape className="absolute left-0 top-0 h-24 w-24 md:h-64 md:w-64" />
      <CornerShape
        flip
        className="absolute bottom-0 right-0 h-36 w-36 md:h-64 md:w-64"
      />
      <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full border border-aura-cream/5 opacity-40" />
    </div>
  );
}
