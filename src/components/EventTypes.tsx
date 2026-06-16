import { eventTypes } from "@/data/events";
import { ServiceIcon } from "./ServiceIcon";

export function EventTypes() {
  return (
    <section id="eventos" className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Tipos de evento</p>
          <h2 className="section-title">Celebramos contigo todo tipo de momentos</h2>
          <p className="section-subtitle">
            Desde bodas íntimas hasta grandes celebraciones empresariales. Cada
            evento recibe la misma dedicación, calidez y atención al detalle.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {eventTypes.map((event) => (
            <article key={event.title} className="card-soft p-6 transition hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brown text-gold-light">
                <ServiceIcon name={event.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-brown-dark">{event.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brown-light">{event.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
