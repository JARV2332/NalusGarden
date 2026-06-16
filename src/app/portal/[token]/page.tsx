import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, Heart } from "lucide-react";
import { getEventByToken, seedDemoEvent } from "@/lib/storage";
import { BRAND, buildWhatsAppMessage } from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function PortalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (token === "demo-nalu") {
    await seedDemoEvent();
  }

  const event = await getEventByToken(token);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Portal del cliente
            </p>
            <h1 className="font-serif text-4xl text-brown-dark">{event.clientName}</h1>
            <p className="mt-2 text-brown-light">
              {event.eventType} · {new Date(event.eventDate).toLocaleDateString("es-GT")}
            </p>
          </div>
          <Link href="/" className="btn-secondary">
            Volver al sitio
          </Link>
        </div>

        <div className="grid gap-6">
          <section className="card-soft p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-gold" />
              <div>
                <h2 className="font-serif text-2xl text-brown-dark">Estado del evento</h2>
                <p className="text-sm capitalize text-brown-light">{event.status}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-brown-light">Paquete: {event.packageName}</p>
          </section>

          <section className="card-soft p-6">
            <h2 className="font-serif text-2xl text-brown-dark">Servicios contratados</h2>
            <ul className="mt-4 space-y-3">
              {event.services.map((service) => (
                <li key={service} className="flex items-start gap-3 text-sm text-brown-light">
                  <Heart className="mt-0.5 h-4 w-4 text-gold" />
                  {service}
                </li>
              ))}
            </ul>
          </section>

          {event.premontajeDate ? (
            <section className="card-soft p-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-gold" />
                <h2 className="font-serif text-2xl text-brown-dark">Premontaje</h2>
              </div>
              <p className="mt-4 text-sm text-brown-light">
                Fecha: {new Date(event.premontajeDate).toLocaleDateString("es-GT")}
              </p>
              <p className="text-sm text-brown-light">Hora: {event.premontajeTime}</p>
              <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm text-brown">
                Recibirás recordatorios automáticos 7 días y 1 día antes del premontaje.
              </p>
            </section>
          ) : null}

          <section className="card-soft p-6">
            <div className="flex items-center gap-3">
              <Clock3 className="h-6 w-6 text-gold" />
              <h2 className="font-serif text-2xl text-brown-dark">Cronograma del día</h2>
            </div>
            <div className="mt-6 space-y-4">
              {event.schedule.map((item) => (
                <div
                  key={`${item.time}-${item.activity}`}
                  className="grid gap-2 border-l-2 border-gold/40 pl-4 sm:grid-cols-[90px_1fr]"
                >
                  <p className="font-semibold text-brown-dark">{item.time}</p>
                  <p className="text-sm text-brown-light">{item.activity}</p>
                </div>
              ))}
            </div>
          </section>

          <a
            href={buildWhatsAppMessage(
              `Hola ${BRAND.name}, tengo una consulta sobre mi evento del ${event.eventDate}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
