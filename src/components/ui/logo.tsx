export function PraxisLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/*
        P — left bar + top bar + bowl right side + middle bar, drawn as one
        connected open path so the corners at (6,4) and (20,4) are sharp miters.
      */}
      <path
        d="M6 36 L6 4 L20 4 L20 20 L6 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        fill="none"
      />
      {/*
        Shared central vertical — right edge of P's bowl AND left spine of X.
        Drawn full-height so both letters anchor to the same stroke.
      */}
      <line
        x1="20" y1="4" x2="20" y2="36"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="butt"
      />
      {/* X arm — top of shared vertical to bottom-right */}
      <line
        x1="20" y1="4" x2="34" y2="36"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="butt"
      />
      {/* X arm — bottom of shared vertical to top-right */}
      <line
        x1="20" y1="36" x2="34" y2="4"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="butt"
      />
    </svg>
  );
}
