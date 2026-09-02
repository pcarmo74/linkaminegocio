/** Inline SVG illustrations for the landing page — no external images needed. */

interface SvgProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Phone Mockup — shows a mini LinkFig profile inside a phone frame */
/* ------------------------------------------------------------------ */
export function PhoneMockup({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 320 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Phone body */}
      <rect x="10" y="10" width="300" height="560" rx="40" fill="#1E2330" />
      <rect x="18" y="18" width="284" height="544" rx="34" fill="#262D3D" />
      {/* Screen */}
      <rect x="24" y="50" width="272" height="490" rx="4" fill="#F8F7F4" />
      {/* Notch */}
      <rect x="110" y="22" width="100" height="24" rx="12" fill="#1E2330" />

      {/* --- Profile content inside screen --- */}
      {/* Avatar circle */}
      <circle cx="160" cy="120" r="36" fill="#D2E823" />
      <circle cx="148" cy="114" r="4" fill="#1E2330" />
      <circle cx="172" cy="114" r="4" fill="#1E2330" />
      <path
        d="M150 126 Q160 134 170 126"
        stroke="#1E2330"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Display name */}
      <rect x="112" y="168" width="96" height="10" rx="5" fill="#1E2330" />
      {/* Bio text lines */}
      <rect x="80" y="188" width="160" height="6" rx="3" fill="#1E2330" opacity="0.25" />
      <rect x="100" y="200" width="120" height="6" rx="3" fill="#1E2330" opacity="0.25" />

      {/* Link buttons */}
      <rect x="48" y="226" width="224" height="44" rx="12" fill="#D2E823" />
      <rect x="80" y="242" width="100" height="10" rx="5" fill="#1E2330" opacity="0.7" />
      <circle cx="252" cy="248" r="8" fill="#1E2330" opacity="0.15" />

      <rect x="48" y="282" width="224" height="44" rx="12" fill="#E9C0E9" />
      <rect x="80" y="298" width="120" height="10" rx="5" fill="#1E2330" opacity="0.7" />
      <circle cx="252" cy="304" r="8" fill="#1E2330" opacity="0.15" />

      <rect x="48" y="338" width="224" height="44" rx="12" fill="#FFD966" />
      <rect x="80" y="354" width="90" height="10" rx="5" fill="#1E2330" opacity="0.7" />
      <circle cx="252" cy="360" r="8" fill="#1E2330" opacity="0.15" />

      <rect x="48" y="394" width="224" height="44" rx="12" fill="white" stroke="#1E2330" strokeWidth="2" />
      <rect x="80" y="410" width="110" height="10" rx="5" fill="#1E2330" opacity="0.7" />
      <circle cx="252" cy="416" r="8" fill="#1E2330" opacity="0.15" />

      {/* Social icons row */}
      <circle cx="128" cy="470" r="10" fill="#1E2330" opacity="0.12" />
      <circle cx="160" cy="470" r="10" fill="#1E2330" opacity="0.12" />
      <circle cx="192" cy="470" r="10" fill="#1E2330" opacity="0.12" />

      {/* "LinkFig" branding at bottom */}
      <rect x="130" y="500" width="60" height="8" rx="4" fill="#1E2330" opacity="0.15" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Customize Illustration — theme palette / paintbrush concept       */
/* ------------------------------------------------------------------ */
export function CustomizeIllustration({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Browser window frame */}
      <rect x="20" y="20" width="360" height="280" rx="16" fill="white" />
      <rect x="20" y="20" width="360" height="40" rx="16" fill="#1E2330" />
      <rect x="20" y="44" width="360" height="16" fill="#1E2330" />
      {/* Window dots */}
      <circle cx="42" cy="40" r="6" fill="#FF5F57" />
      <circle cx="62" cy="40" r="6" fill="#FFBD2E" />
      <circle cx="82" cy="40" r="6" fill="#28C840" />

      {/* Left panel — theme picker */}
      <rect x="32" y="68" width="140" height="220" rx="8" fill="#F4F4F5" />
      <rect x="44" y="80" width="60" height="8" rx="4" fill="#1E2330" opacity="0.6" />
      {/* Theme swatches */}
      <rect x="44" y="100" width="52" height="52" rx="10" fill="#D2E823" stroke="#1E2330" strokeWidth="2" />
      <rect x="104" y="100" width="52" height="52" rx="10" fill="#E9C0E9" />
      <rect x="44" y="160" width="52" height="52" rx="10" fill="#1E2330" />
      <rect x="104" y="160" width="52" height="52" rx="10" fill="#FFD966" />
      {/* Checkmark on selected */}
      <path d="M62 126 L68 132 L80 118" stroke="#1E2330" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Right panel — mini profile preview */}
      <rect x="184" y="68" width="184" height="220" rx="8" fill="#D2E823" />
      {/* Mini avatar */}
      <circle cx="276" cy="112" r="22" fill="white" />
      <circle cx="269" cy="108" r="3" fill="#1E2330" />
      <circle cx="283" cy="108" r="3" fill="#1E2330" />
      <path d="M271 118 Q276 124 281 118" stroke="#1E2330" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Name placeholder */}
      <rect x="244" y="142" width="64" height="8" rx="4" fill="#1E2330" opacity="0.5" />
      {/* Mini link buttons */}
      <rect x="216" y="164" width="120" height="28" rx="8" fill="white" />
      <rect x="230" y="174" width="60" height="6" rx="3" fill="#1E2330" opacity="0.4" />
      <rect x="216" y="200" width="120" height="28" rx="8" fill="white" />
      <rect x="230" y="210" width="50" height="6" rx="3" fill="#1E2330" opacity="0.4" />
      <rect x="216" y="236" width="120" height="28" rx="8" fill="white" />
      <rect x="230" y="246" width="70" height="6" rx="3" fill="#1E2330" opacity="0.4" />

      {/* Floating color picker cursor */}
      <g transform="translate(156, 228) rotate(-20)">
        <rect width="12" height="36" rx="3" fill="#1E2330" />
        <rect y="30" width="12" height="10" rx="2" fill="#D2E823" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Share Illustration — QR code + social sharing concept             */
/* ------------------------------------------------------------------ */
export function ShareIllustration({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central QR code card */}
      <rect x="120" y="40" width="160" height="200" rx="20" fill="white" />
      {/* QR code blocks */}
      <g transform="translate(148, 60)">
        {/* Top-left finder */}
        <rect width="28" height="28" rx="2" fill="#1E2330" />
        <rect x="4" y="4" width="20" height="20" rx="1" fill="white" />
        <rect x="8" y="8" width="12" height="12" rx="1" fill="#1E2330" />
        {/* Top-right finder */}
        <rect x="76" width="28" height="28" rx="2" fill="#1E2330" />
        <rect x="80" y="4" width="20" height="20" rx="1" fill="white" />
        <rect x="84" y="8" width="12" height="12" rx="1" fill="#1E2330" />
        {/* Bottom-left finder */}
        <rect y="76" width="28" height="28" rx="2" fill="#1E2330" />
        <rect x="4" y="80" width="20" height="20" rx="1" fill="white" />
        <rect x="8" y="84" width="12" height="12" rx="1" fill="#1E2330" />
        {/* Data dots */}
        <rect x="36" y="4" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="52" y="4" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="36" y="20" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="52" y="36" width="8" height="8" rx="1" fill="#D2E823" />
        <rect x="36" y="52" width="8" height="8" rx="1" fill="#D2E823" />
        <rect x="68" y="36" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="84" y="36" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="36" y="36" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="52" y="52" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="68" y="52" width="8" height="8" rx="1" fill="#D2E823" />
        <rect x="84" y="52" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="52" y="68" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="68" y="68" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="36" y="76" width="8" height="8" rx="1" fill="#D2E823" />
        <rect x="52" y="84" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="68" y="84" width="8" height="8" rx="1" fill="#D2E823" />
        <rect x="84" y="76" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="84" y="92" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="20" y="36" width="8" height="8" rx="1" fill="#1E2330" />
        <rect x="4" y="52" width="8" height="8" rx="1" fill="#D2E823" />
      </g>
      {/* URL below QR */}
      <rect x="152" y="180" width="96" height="8" rx="4" fill="#1E2330" opacity="0.3" />
      <rect x="162" y="196" width="76" height="8" rx="4" fill="#D2E823" />

      {/* Floating social bubbles */}
      {/* Instagram */}
      <circle cx="56" cy="80" r="28" fill="#E9C0E9" />
      <rect x="42" y="66" width="28" height="28" rx="7" stroke="#1E2330" strokeWidth="2.5" fill="none" />
      <circle cx="56" cy="80" r="7" stroke="#1E2330" strokeWidth="2.5" fill="none" />
      <circle cx="67" cy="69" r="2" fill="#1E2330" />

      {/* TikTok */}
      <circle cx="344" cy="80" r="28" fill="#1E2330" />
      <path d="M338 92 V72 Q338 66 344 66 Q350 66 350 72" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M350 68 Q356 68 358 64" stroke="#D2E823" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Twitter/X */}
      <circle cx="56" cy="220" r="28" fill="#D2E823" />
      <path d="M44 230 L56 218 L68 230 M48 210 L56 218 L64 210" stroke="#1E2330" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* YouTube */}
      <circle cx="344" cy="220" r="28" fill="#FF5F57" />
      <rect x="330" y="210" width="28" height="20" rx="6" fill="white" />
      <path d="M340 216 L352 220 L340 224 Z" fill="#FF5F57" />

      {/* Connection lines */}
      <line x1="84" y1="80" x2="120" y2="120" stroke="#1E2330" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="316" y1="80" x2="280" y2="120" stroke="#1E2330" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="84" y1="220" x2="120" y2="180" stroke="#1E2330" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="316" y1="220" x2="280" y2="180" stroke="#1E2330" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />

      {/* Bottom arrow burst */}
      <path d="M200 260 L200 300" stroke="#1E2330" strokeWidth="2" strokeLinecap="round" />
      <path d="M200 300 L194 290 M200 300 L206 290" stroke="#1E2330" strokeWidth="2" strokeLinecap="round" />
      <path d="M170 268 L154 296" stroke="#1E2330" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M230 268 L246 296" stroke="#1E2330" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Analytics Illustration — dashboard chart concept                  */
/* ------------------------------------------------------------------ */
export function AnalyticsIllustration({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dashboard card */}
      <rect x="20" y="20" width="360" height="280" rx="20" fill="white" />

      {/* Header bar */}
      <rect x="36" y="36" width="80" height="10" rx="5" fill="#1E2330" opacity="0.6" />
      <rect x="300" y="36" width="64" height="24" rx="8" fill="#D2E823" />
      <rect x="310" y="44" width="44" height="8" rx="4" fill="#1E2330" opacity="0.5" />

      {/* Stats row */}
      <rect x="36" y="70" width="100" height="50" rx="10" fill="#F4F4F5" />
      <rect x="48" y="82" width="40" height="6" rx="3" fill="#1E2330" opacity="0.3" />
      <rect x="48" y="96" width="56" height="14" rx="4" fill="#1E2330" opacity="0.8" />

      <rect x="150" y="70" width="100" height="50" rx="10" fill="#F4F4F5" />
      <rect x="162" y="82" width="40" height="6" rx="3" fill="#1E2330" opacity="0.3" />
      <rect x="162" y="96" width="48" height="14" rx="4" fill="#D2E823" />

      <rect x="264" y="70" width="100" height="50" rx="10" fill="#F4F4F5" />
      <rect x="276" y="82" width="40" height="6" rx="3" fill="#1E2330" opacity="0.3" />
      <rect x="276" y="96" width="52" height="14" rx="4" fill="#E9C0E9" />

      {/* Line chart area */}
      <line x1="52" y1="265" x2="348" y2="265" stroke="#1E2330" strokeWidth="1" opacity="0.1" />
      <line x1="52" y1="240" x2="348" y2="240" stroke="#1E2330" strokeWidth="1" opacity="0.06" />
      <line x1="52" y1="215" x2="348" y2="215" stroke="#1E2330" strokeWidth="1" opacity="0.06" />
      <line x1="52" y1="190" x2="348" y2="190" stroke="#1E2330" strokeWidth="1" opacity="0.06" />
      <line x1="52" y1="165" x2="348" y2="165" stroke="#1E2330" strokeWidth="1" opacity="0.06" />
      <line x1="52" y1="140" x2="348" y2="140" stroke="#1E2330" strokeWidth="1" opacity="0.06" />

      {/* Area fill under curve */}
      <path
        d="M52 250 Q90 240 120 230 T200 190 T260 170 T320 145 L348 140 L348 265 L52 265 Z"
        fill="#D2E823"
        opacity="0.15"
      />

      {/* Main line */}
      <path
        d="M52 250 Q90 240 120 230 T200 190 T260 170 T320 145 L348 140"
        stroke="#D2E823"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Secondary line */}
      <path
        d="M52 255 Q100 252 140 248 T220 235 T280 225 T348 215"
        stroke="#E9C0E9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 4"
        fill="none"
      />

      {/* Data points on main line */}
      <circle cx="52" cy="250" r="4" fill="#D2E823" stroke="white" strokeWidth="2" />
      <circle cx="120" cy="230" r="4" fill="#D2E823" stroke="white" strokeWidth="2" />
      <circle cx="200" cy="190" r="4" fill="#D2E823" stroke="white" strokeWidth="2" />
      <circle cx="260" cy="170" r="4" fill="#D2E823" stroke="white" strokeWidth="2" />
      <circle cx="348" cy="140" r="4" fill="#D2E823" stroke="white" strokeWidth="2" />

      {/* Tooltip on highest point */}
      <rect x="310" y="116" width="56" height="22" rx="6" fill="#1E2330" />
      <rect x="320" y="124" width="36" height="6" rx="3" fill="white" opacity="0.8" />
      <path d="M335 138 L338 144 L341 138" fill="#1E2330" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Small card illustrations for the Stats/solution section           */
/* ------------------------------------------------------------------ */
export function ShareCardIllustration({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Mini phone */}
      <rect x="70" y="10" width="60" height="100" rx="10" fill="#1E2330" />
      <rect x="74" y="22" width="52" height="80" rx="2" fill="white" />
      {/* Mini links */}
      <rect x="80" y="36" width="40" height="8" rx="4" fill="#D2E823" />
      <rect x="80" y="50" width="40" height="8" rx="4" fill="#E9C0E9" />
      <rect x="80" y="64" width="40" height="8" rx="4" fill="#FFD966" />
      {/* Share arrows */}
      <path d="M50 50 L36 36 M36 36 L36 50 M36 36 L50 36" stroke="#1E2330" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M150 50 L164 36 M164 36 L164 50 M164 36 L150 36" stroke="#1E2330" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Dots */}
      <circle cx="30" cy="80" r="4" fill="#1E2330" opacity="0.15" />
      <circle cx="170" cy="80" r="4" fill="#1E2330" opacity="0.15" />
      <circle cx="20" cy="60" r="3" fill="#1E2330" opacity="0.1" />
      <circle cx="180" cy="60" r="3" fill="#1E2330" opacity="0.1" />
    </svg>
  );
}

export function MonetizeCardIllustration({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Email envelope */}
      <rect x="40" y="30" width="80" height="56" rx="8" fill="white" stroke="#1E2330" strokeWidth="2" />
      <path d="M42 32 L80 62 L118 32" stroke="#1E2330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Coins stack */}
      <ellipse cx="148" cy="90" rx="22" ry="8" fill="#D2E823" stroke="#1E2330" strokeWidth="1.5" />
      <rect x="126" y="78" width="44" height="12" fill="#D2E823" />
      <ellipse cx="148" cy="78" rx="22" ry="8" fill="#D2E823" stroke="#1E2330" strokeWidth="1.5" />
      <rect x="126" y="66" width="44" height="12" fill="#D2E823" />
      <ellipse cx="148" cy="66" rx="22" ry="8" fill="#D2E823" stroke="#1E2330" strokeWidth="1.5" />
      {/* Dollar sign */}
      <text x="144" y="72" fontSize="12" fontWeight="bold" fill="#1E2330" fontFamily="sans-serif">$</text>
      {/* Sparkles */}
      <path d="M54 24 L56 18 L58 24 L64 26 L58 28 L56 34 L54 28 L48 26 Z" fill="#FFD966" />
      <path d="M160 40 L161.5 36 L163 40 L167 41.5 L163 43 L161.5 47 L160 43 L156 41.5 Z" fill="#E9C0E9" />
    </svg>
  );
}

export function GrowCardIllustration({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bar chart */}
      <rect x="36" y="90" width="20" height="30" rx="4" fill="#1E2330" opacity="0.15" />
      <rect x="62" y="70" width="20" height="50" rx="4" fill="#1E2330" opacity="0.25" />
      <rect x="88" y="50" width="20" height="70" rx="4" fill="#E9C0E9" />
      <rect x="114" y="34" width="20" height="86" rx="4" fill="#D2E823" />
      <rect x="140" y="18" width="20" height="102" rx="4" fill="#1E2330" />
      {/* Growth arrow */}
      <path d="M40 84 Q80 65 120 38 L155 16" stroke="#FF5F57" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M148 14 L158 12 L154 22" stroke="#FF5F57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* People dots */}
      <circle cx="46" cy="128" r="4" fill="#1E2330" opacity="0.2" />
      <circle cx="58" cy="128" r="4" fill="#1E2330" opacity="0.3" />
      <circle cx="70" cy="128" r="4" fill="#1E2330" opacity="0.4" />
      <circle cx="82" cy="128" r="4" fill="#D2E823" />
      <circle cx="94" cy="128" r="4" fill="#D2E823" />
      <circle cx="106" cy="128" r="4" fill="#D2E823" />
      <circle cx="118" cy="128" r="4" fill="#D2E823" />
      <circle cx="130" cy="128" r="4" fill="#1E2330" />
      <circle cx="142" cy="128" r="4" fill="#1E2330" />
      <circle cx="154" cy="128" r="4" fill="#1E2330" />
    </svg>
  );
}
