import Image from "next/image";
import { BRAND } from "@/lib/constants";

export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      aria-label={`${BRAND.name} / ${BRAND.nameEn}`}
    >
      <Image
        src="/logo.png"
        alt={`${BRAND.name} / ${BRAND.nameEn}`}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 44px, 48px"
        priority
      />
    </div>
  );
}
