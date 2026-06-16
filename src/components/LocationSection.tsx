"use client";

import { MapPin, Phone } from "lucide-react";
import { useBrand, useWhatsApp } from "./BrandProvider";

export function LocationSection() {
  const brand = useBrand();
  const whatsappHref = useWhatsApp("Hola, quisiera más información.");

  return (
    <section id="contacto" className="section-padding">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="card-soft p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Contacto</p>
          <h2 className="section-title">
            {brand.name} · {brand.nameEn}
          </h2>
          <p className="section-subtitle">
            Visítanos, escríbenos o cotiza en línea. Seguimos atendiendo con el
            mismo cariño de siempre, ahora con una presencia digital completa.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="font-semibold text-brown-dark">Ubicación</p>
                <a
                  href={brand.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brown-light underline-offset-4 hover:underline"
                >
                  {brand.location}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="font-semibold text-brown-dark">WhatsApp</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brown-light underline-offset-4 hover:underline"
                >
                  {brand.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={brand.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Facebook
            </a>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Instagram
            </a>
            <a href="/admin" className="btn-primary">
              Panel interno
            </a>
            <a href="/portal/demo-nalu" className="btn-secondary">
              Portal de clientes
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gold/20 shadow-lg">
          <iframe
            title={`Ubicación ${brand.nameEn}`}
            src={brand.mapsEmbedUrl}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
