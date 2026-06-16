import Link from "next/link";
import { ArrowLeft, CheckCircle2, Layers3, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/constants";

const phases = [
  {
    title: "Fase 1 — Sitio público",
    status: "Lista en demo",
    items: [
      "Landing con eslogan oficial",
      "Paquetes Jardín de Nalu y Nalu's Lake",
      "Calculadora por persona",
      "Formulario de cotización",
      "WhatsApp integrado",
    ],
  },
  {
    title: "Fase 2 — Operación",
    status: "Base incluida",
    items: [
      "Agenda de visitas",
      "Panel interno de solicitudes",
      "Recordatorios por correo (conectar Resend)",
      "Calendario de fechas reservadas",
    ],
  },
  {
    title: "Fase 3 — Experiencia premium",
    status: "Demo incluida",
    items: [
      "Portal privado del cliente",
      "Servicios contratados visibles",
      "Premontaje y cronograma",
      "Recordatorios automáticos del evento",
    ],
  },
];

export default function PresentacionPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-brown-light hover:text-brown">
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio demo
        </Link>

        <div className="mt-8 card-soft p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Resumen para presentar
          </p>
          <h1 className="mt-3 font-serif text-5xl text-brown-dark">{BRAND.name}</h1>
          <p className="mt-4 text-2xl text-brown-light">{BRAND.tagline}</p>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brown-light">
            Propuesta digital para mostrar el negocio con la misma calidad y cariño
            de sus servicios, sin reemplazar WhatsApp sino organizando todo lo demás.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {phases.map((phase) => (
            <article key={phase.title} className="card-soft p-6">
              <div className="flex items-center gap-2 text-gold">
                <Layers3 className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  {phase.status}
                </span>
              </div>
              <h2 className="mt-4 font-serif text-2xl text-brown-dark">{phase.title}</h2>
              <ul className="mt-4 space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brown-light">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 card-soft p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-gold" />
            <h2 className="font-serif text-3xl text-brown-dark">Qué necesitamos de ti para publicar</h2>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Fotos reales del jardín y eventos",
              "Confirmación de servicios y precios",
              "Logo oficial si lo desean usar",
              "Correo del negocio para notificaciones",
              "Aprobación de textos y colores",
              "Dominio deseado (ej. jardindenalu.com)",
            ].map((item) => (
              <li key={item} className="rounded-2xl bg-cream px-4 py-3 text-sm text-brown">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
