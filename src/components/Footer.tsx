import { Logo } from "./Logo";
import { BRAND, buildWhatsAppMessage } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-brown-dark px-4 py-12 text-cream sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-12 w-12" />
          <div>
            <p className="font-serif text-2xl">{BRAND.name}</p>
            <p className="text-sm text-gold-light">{BRAND.nameEn}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-cream/80">
          <a href="#paquetes" className="hover:text-gold-light">
            Paquetes
          </a>
          <a href="#cotizar" className="hover:text-gold-light">
            Cotizar
          </a>
          <a href="/admin" className="hover:text-gold-light">
            Panel
          </a>
          <a
            href={buildWhatsAppMessage("Hola, quisiera información.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-light"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-7xl text-sm text-cream/60">
        © {new Date().getFullYear()} {BRAND.name} · {BRAND.nameEn}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
