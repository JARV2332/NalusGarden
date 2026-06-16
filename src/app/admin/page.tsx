"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, FileText, RefreshCw } from "lucide-react";

type Quote = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  packageId: string;
  message?: string;
  status: string;
};

type Visit = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: string;
};

type AdminData = {
  quotes: Quote[];
  visits: Visit[];
};

export default function AdminPage() {
  const [data, setData] = useState<AdminData>({ quotes: [], visits: [] });
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const response = await fetch("/api/admin");
    const json = (await response.json()) as AdminData;
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <div className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Panel interno</p>
            <h1 className="font-serif text-4xl text-brown-dark">Solicitudes y citas</h1>
            <p className="mt-2 text-sm text-brown-light">
              Vista demo para que ella vea cotizaciones y visitas en un solo lugar.
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => void loadData()} className="btn-secondary">
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </button>
            <Link href="/" className="btn-primary">
              Volver al sitio
            </Link>
          </div>
        </div>

        {loading ? <p className="mt-10 text-brown-light">Cargando...</p> : null}

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-brown-dark">Cotizaciones</h2>
          </div>
          <div className="grid gap-4">
            {data.quotes.length === 0 ? (
              <div className="card-soft p-6 text-sm text-brown-light">
                Aún no hay cotizaciones. Prueba el formulario en la página principal.
              </div>
            ) : (
              data.quotes.map((quote) => (
                <article key={quote.id} className="card-soft p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-brown-dark">{quote.name}</h3>
                      <p className="text-sm text-brown-light">
                        {quote.eventType} · {quote.guests} invitados · {quote.packageId}
                      </p>
                    </div>
                    <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase text-brown">
                      {quote.status}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-brown-light sm:grid-cols-2">
                    <p>Correo: {quote.email}</p>
                    <p>Teléfono: {quote.phone}</p>
                    <p>Fecha tentativa: {quote.eventDate}</p>
                    <p>Recibida: {new Date(quote.createdAt).toLocaleString("es-GT")}</p>
                  </div>
                  {quote.message ? (
                    <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm text-brown">
                      {quote.message}
                    </p>
                  ) : null}
                </article>
              ))
            )}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-2xl text-brown-dark">Visitas solicitadas</h2>
          </div>
          <div className="grid gap-4">
            {data.visits.length === 0 ? (
              <div className="card-soft p-6 text-sm text-brown-light">
                Aún no hay visitas agendadas.
              </div>
            ) : (
              data.visits.map((visit) => (
                <article key={visit.id} className="card-soft p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-brown-dark">{visit.name}</h3>
                      <p className="text-sm text-brown-light">
                        {visit.preferredDate} · {visit.preferredTime}
                      </p>
                    </div>
                    <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase text-brown">
                      {visit.status}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-brown-light sm:grid-cols-2">
                    <p>Correo: {visit.email}</p>
                    <p>Teléfono: {visit.phone}</p>
                    <p>Recibida: {new Date(visit.createdAt).toLocaleString("es-GT")}</p>
                  </div>
                  {visit.notes ? (
                    <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm text-brown">
                      {visit.notes}
                    </p>
                  ) : null}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
