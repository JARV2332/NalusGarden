import { BRAND } from "@/lib/constants";

export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-label={`${BRAND.name} / ${BRAND.nameEn}`}>
      <svg viewBox="0 0 64 72" fill="none" className="h-full w-full">
        <path
          d="M32 2L58 14V38C58 54 46 66 32 70C18 66 6 54 6 38V14L32 2Z"
          fill="#2f2118"
          stroke="#c9a86c"
          strokeWidth="2"
        />
        <path
          d="M32 12L48 20V36C48 46 40 54 32 57C24 54 16 46 16 36V20L32 12Z"
          fill="#4a3728"
        />
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fill="#f5f0e8"
          fontSize="22"
          fontFamily="Georgia, serif"
          fontWeight="700"
        >
          N
        </text>
      </svg>
    </div>
  );
}
