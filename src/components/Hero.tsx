import { ArrowRight, Sparkles } from "lucide-react";
import { BRAND, buildWhatsAppMessage } from "@/lib/constants";

export function Hero() {
  return (
    <section id="inicio" className="hero-gradient relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-24 h-40 w-40 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-20 right-10 h-56 w-56 rounded-full bg-gold-light blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/10 px-4 py-2 text-sm text-gold-light">
            <Sparkles className="h-4 w-4" />
            Amatitlán, Guatemala
          </div>

          <h1 className="font-serif text-5xl font-semibold leading-tight text-cream sm:text-6xl lg:text-7xl">
            {BRAND.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
            Bodas, quince años, bautizos, eventos empresariales y mucho más.
            Paquetes todo incluido con el cariño, la elegancia y el detalle que
            nos caracteriza.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#cotizar" className="btn-primary bg-gold text-brown-dark hover:bg-gold-light">
              Solicitar cotización
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={buildWhatsAppMessage("Hola, quisiera cotizar un evento en Jardín de Nalu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp {BRAND.whatsappDisplay}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              { value: "2", label: "Espacios únicos" },
              { value: "Todo incluido", label: "Paquetes completos" },
              { value: "40+", label: "Invitados mínimo" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-2xl font-semibold text-gold-light">{item.value}</p>
                <p className="mt-1 text-sm text-cream/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="gallery-pattern min-h-56 rounded-[2rem] border border-gold/20 p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-gold-light">
              {BRAND.name} · {BRAND.nameEn}
            </p>
            <p className="mt-4 font-serif text-3xl text-cream">Celebraciones con elegancia natural</p>
          </div>
          <div className="grid gap-4 sm:col-span-2 lg:col-span-1 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-gold/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="font-serif text-2xl text-gold-light">Q. 185</p>
              <p className="mt-2 text-sm text-cream/80">Por persona · mínimo 40 invitados</p>
            </div>
            <div className="rounded-[1.75rem] border border-gold/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="font-serif text-2xl text-gold-light">Q. 199.99</p>
              <p className="mt-2 text-sm text-cream/80">Nalu&apos;s Lake · mínimo 50 invitados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
