import Link from "next/link";
import { Sparkles } from "lucide-react";

export function ProposalBanner() {
  return (
    <div className="relative z-[60] bg-gold px-4 py-3 text-center text-sm text-brown-dark">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 sm:flex-row">
        <Sparkles className="hidden h-4 w-4 sm:block" />
        <p>
          <strong>Propuesta para presentar y aprobar</strong> — versión demo lista
          para mostrar a Jardín de Nalu antes de publicar.
        </p>
        <Link href="/presentacion" className="font-semibold underline underline-offset-4">
          Ver resumen ejecutivo
        </Link>
      </div>
    </div>
  );
}
