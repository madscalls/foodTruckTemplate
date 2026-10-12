export default function Logo({ size = 44 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#A50104" />
      <path d="M11 21c0-6 6-10 13-10s13 4 13 10z" fill="#E8871E" />
      <rect x="10" y="23" width="28" height="4" rx="2" fill="#FBFF12" />
      <path d="M11 29h26c0 5-5 8-13 8s-13-3-13-8z" fill="#E8871E" />
    </svg>
  );
}
