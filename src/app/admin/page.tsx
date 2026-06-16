"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  FileText,
  LogOut,
  RefreshCw,
  Save,
  Settings2,
} from "lucide-react";
import type { SiteSettings } from "@/lib/site-settings";

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
  calendarEventId?: string;
  calendarEventLink?: string;
};

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  link: string;
};

type AdminData = {
  quotes: Quote[];
  visits: Visit[];
  calendar: {
    configured: boolean;
    events: CalendarEvent[];
  };
};

type Tab = "solicitudes" | "contenido" | "calendario";

const visitStatuses = ["pendiente", "confirmada", "completada", "cancelada"] as const;

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("solicitudes");
  const [data, setData] = useState<AdminData>({
    quotes: [],
    visits: [],
    calendar: { configured: false, events: [] },
  });
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);

    const [adminResponse, siteResponse] = await Promise.all([
      fetch("/api/admin"),
      fetch("/api/site"),
    ]);

    if (!adminResponse.ok) {
      setError("No se pudo cargar el panel.");
      setLoading(false);
      return;
    }

    const adminJson = (await adminResponse.json()) as AdminData;
    const siteJson = (await siteResponse.json()) as { settings: SiteSettings };
    setData(adminJson);
    setSettings(siteJson.settings);
    setLoading(false);
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function updateVisitStatus(visitId: string, status: Visit["status"]) {
    const response = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitId, status }),
    });

    if (!response.ok) {
      setError("No se pudo actualizar la visita.");
      return;
    }

    setMessage("Visita actualizada.");
    await loadData();
  }

  async function handleSaveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings) return;

    setSavingSettings(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "No se pudo guardar el contenido.");
      }

      setMessage("Contenido del sitio actualizado.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Error inesperado.");
    } finally {
      setSavingSettings(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-cream px-3 py-8 sm:px-4 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Panel admin</p>
            <h1 className="font-serif text-3xl text-brown-dark sm:text-4xl">Nalu&apos;s Garden</h1>
            <p className="mt-2 text-sm text-brown-light">
              Solicitudes, contenido del sitio y calendario de visitas.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={() => void loadData()} className="btn-secondary">
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </button>
            <button type="button" onClick={() => void handleLogout()} className="btn-secondary">
              <LogOut className="h-4 w-4" />
              Salir
            </button>
            <Link href="/" className="btn-primary">
              Ver sitio
            </Link>
          </div>
        </div>

        <div className="-mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1">
          {[
            { id: "solicitudes" as const, label: "Solicitudes", icon: FileText },
            { id: "contenido" as const, label: "Contenido", icon: Settings2 },
            { id: "calendario" as const, label: "Calendario", icon: CalendarDays },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                tab === id
                  ? "bg-brown-dark text-cream"
                  : "bg-white text-brown-light hover:bg-cream-dark"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {message ? <p className="mt-6 text-sm text-green-700">{message}</p> : null}
        {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}
        {loading ? <p className="mt-10 text-brown-light">Cargando...</p> : null}

        {!loading && tab === "solicitudes" ? (
          <>
            <section className="mt-10">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-gold" />
                <h2 className="font-serif text-2xl text-brown-dark">Cotizaciones</h2>
              </div>
              <div className="grid gap-4">
                {data.quotes.length === 0 ? (
                  <div className="card-soft p-6 text-sm text-brown-light">
                    Aún no hay cotizaciones.
                  </div>
                ) : (
                  data.quotes.map((quote) => (
                    <article key={quote.id} className="card-soft p-5 sm:p-6">
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
                    <article key={visit.id} className="card-soft p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-brown-dark">{visit.name}</h3>
                          <p className="text-sm text-brown-light">
                            {visit.preferredDate} · {visit.preferredTime}
                          </p>
                        </div>
                        <select
                          value={visit.status}
                          onChange={(event) =>
                            void updateVisitStatus(visit.id, event.target.value)
                          }
                          className="input-field w-auto py-2 text-sm"
                        >
                          {visitStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-4 grid gap-2 text-sm text-brown-light sm:grid-cols-2">
                        <p>Correo: {visit.email}</p>
                        <p>Teléfono: {visit.phone}</p>
                        <p>Recibida: {new Date(visit.createdAt).toLocaleString("es-GT")}</p>
                        {visit.calendarEventLink ? (
                          <p>
                            <a
                              href={visit.calendarEventLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              Ver en Google Calendar
                            </a>
                          </p>
                        ) : null}
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
          </>
        ) : null}

        {!loading && tab === "contenido" && settings ? (
          <form onSubmit={handleSaveSettings} className="card-soft mt-8 space-y-4 p-5 sm:mt-10 sm:p-8">
            <h2 className="font-serif text-2xl text-brown-dark">Editar contenido del sitio</h2>
            <p className="text-sm text-brown-light">
              Cambia textos de contacto y mensajes principales sin tocar código.
            </p>

            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Eslogan</label>
              <input
                className="input-field"
                value={settings.tagline}
                onChange={(event) =>
                  setSettings({ ...settings, tagline: event.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">
                Texto principal del inicio
              </label>
              <textarea
                className="input-field min-h-28"
                value={settings.heroDescription}
                onChange={(event) =>
                  setSettings({ ...settings, heroDescription: event.target.value })
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brown-dark">
                  WhatsApp (solo números)
                </label>
                <input
                  className="input-field"
                  value={settings.whatsapp}
                  onChange={(event) =>
                    setSettings({ ...settings, whatsapp: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-brown-dark">
                  WhatsApp visible
                </label>
                <input
                  className="input-field"
                  value={settings.whatsappDisplay}
                  onChange={(event) =>
                    setSettings({ ...settings, whatsappDisplay: event.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brown-dark">Correo</label>
                <input
                  type="email"
                  className="input-field"
                  value={settings.email}
                  onChange={(event) =>
                    setSettings({ ...settings, email: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-brown-dark">Ubicación</label>
                <input
                  className="input-field"
                  value={settings.location}
                  onChange={(event) =>
                    setSettings({ ...settings, location: event.target.value })
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={savingSettings}>
              {savingSettings ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {savingSettings ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>
        ) : null}

        {!loading && tab === "calendario" ? (
          <section className="mt-10">
            <div className="card-soft p-5 sm:p-8">
              <h2 className="font-serif text-2xl text-brown-dark">Google Calendar</h2>
              {data.calendar.configured ? (
                <>
                  <p className="mt-2 text-sm text-green-700">
                    Conectado. Las visitas nuevas se crean automáticamente en el calendario.
                  </p>
                  <div className="mt-6 space-y-3">
                    {data.calendar.events.length === 0 ? (
                      <p className="text-sm text-brown-light">No hay eventos próximos.</p>
                    ) : (
                      data.calendar.events.map((event) => (
                        <div
                          key={event.id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3"
                        >
                          <div>
                            <p className="font-semibold text-brown-dark">{event.title}</p>
                            <p className="text-sm text-brown-light">
                              {event.start
                                ? new Date(event.start).toLocaleString("es-GT")
                                : "Sin fecha"}
                            </p>
                          </div>
                          {event.link ? (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold text-brown underline"
                            >
                              Abrir
                            </a>
                          ) : null}
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-brown-light">
                  <p className="text-amber-800">
                    Google Calendar aún no está configurado en el servidor.
                  </p>
                  <p>Agrega estas variables en Vercel o en `.env.local`:</p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>GOOGLE_SERVICE_ACCOUNT_EMAIL</li>
                    <li>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</li>
                    <li>GOOGLE_CALENDAR_ID</li>
                  </ul>
                  <p>
                    Comparte el calendario del negocio con el correo de la cuenta de servicio
                    y dale permiso de editar eventos.
                  </p>
                </div>
              )}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
