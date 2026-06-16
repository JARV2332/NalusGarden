"use client";

import { useMemo, useState } from "react";
import { Check, CreditCard, Receipt } from "lucide-react";
import { packages, paymentInfo, type EventPackage } from "@/data/packages";
import { ServiceIcon } from "./ServiceIcon";

function PackageCard({ pkg }: { pkg: EventPackage }) {
  const [guests, setGuests] = useState(pkg.minGuests);
  const total = useMemo(() => guests * pkg.pricePerPerson, [guests, pkg.pricePerPerson]);

  return (
    <article className="card-soft overflow-hidden">
      <div className="bg-brown px-5 py-6 text-cream sm:px-8 sm:py-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-light sm:text-sm">{pkg.subtitle}</p>
        <h3 className="mt-2 font-serif text-3xl sm:mt-3 sm:text-4xl">{pkg.name}</h3>
        {pkg.highlight ? (
          <p className="mt-3 text-sm leading-relaxed text-cream/85">{pkg.highlight}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-end gap-2 sm:mt-6">
          <span className="font-serif text-4xl text-gold-light sm:text-5xl">
            Q. {pkg.pricePerPerson.toFixed(pkg.pricePerPerson % 1 === 0 ? 0 : 2)}
          </span>
          <span className="pb-2 text-sm text-cream/75">por persona</span>
        </div>
        <p className="mt-2 text-sm text-cream/75">Mínimo {pkg.minGuests} personas</p>
      </div>

      <div className="p-5 sm:p-8">
        <label className="block text-sm font-semibold text-brown-dark">
          Calcula tu inversión estimada
        </label>
        <div className="mt-3 flex items-center gap-4">
          <input
            type="range"
            min={pkg.minGuests}
            max={300}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            className="w-full accent-brown"
          />
          <span className="min-w-16 text-right font-semibold text-brown">{guests}</span>
        </div>
        <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-sm text-brown">
          Total estimado:{" "}
          <strong className="font-serif text-xl text-brown-dark">
            Q. {total.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </strong>
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {pkg.features.map((feature) => (
            <li key={feature.label} className="flex items-start gap-3 text-sm text-brown-light">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-brown">
                <ServiceIcon name={feature.icon} className="h-4 w-4" />
              </span>
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Packages() {
  return (
    <section id="paquetes" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Paquetes</p>
          <h2 className="section-title">Todo incluido, como en tus flyers</h2>
          <p className="section-subtitle">
            Dos espacios increíbles con servicios completos para que solo te
            preocupes por disfrutar tu evento.
          </p>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-2">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="card-soft flex items-start gap-4 p-6">
            <Receipt className="mt-1 h-6 w-6 text-gold" />
            <div>
              <h3 className="font-semibold text-brown-dark">Servicio facturado</h3>
              <p className="mt-2 text-sm text-brown-light">
                {paymentInfo.invoiced ? "Emitimos factura para tu evento." : ""}
              </p>
            </div>
          </div>
          <div className="card-soft flex items-start gap-4 p-6">
            <CreditCard className="mt-1 h-6 w-6 text-gold" />
            <div>
              <h3 className="font-semibold text-brown-dark">Visa en cuotas</h3>
              <p className="mt-2 text-sm text-brown-light">
                3, 6, 10 o 12 cuotas extras sin recargo.
              </p>
            </div>
          </div>
          <div className="card-soft flex items-start gap-4 p-6">
            <Check className="mt-1 h-6 w-6 text-gold" />
            <div>
              <h3 className="font-semibold text-brown-dark">Descuentos en efectivo</h3>
              <p className="mt-2 text-sm text-brown-light">
                Pregunta por promociones al pagar en efectivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
