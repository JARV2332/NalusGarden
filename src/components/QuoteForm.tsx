"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, LoaderCircle, Send } from "lucide-react";
import { packages } from "@/data/packages";
import { eventTypes } from "@/data/events";
import { useBrand } from "./BrandProvider";
import { buildWhatsAppUrl } from "@/lib/brand";

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: string;
  packageId: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  eventType: eventTypes[0]?.title ?? "Bodas",
  eventDate: "",
  guests: "50",
  packageId: packages[0]?.id ?? "jardin-de-nalu",
  message: "",
};

export function QuoteForm() {
  const brand = useBrand();
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guests: Number(form.guests),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "No se pudo enviar la cotización.");
      }

      const selectedPackage = packages.find((item) => item.id === form.packageId);
      const whatsappMessage = [
        "Hola Jardín de Nalu, quisiera cotizar un evento.",
        `Nombre: ${form.name}`,
        `Evento: ${form.eventType}`,
        `Fecha tentativa: ${form.eventDate}`,
        `Invitados: ${form.guests}`,
        `Paquete: ${selectedPackage?.name ?? form.packageId}`,
      ].join("\n");

      setSuccess("¡Listo! Recibimos tu solicitud. También puedes continuar por WhatsApp.");
      setForm(initialState);
      window.open(buildWhatsAppUrl(brand.whatsapp, whatsappMessage), "_blank");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="cotizar" className="section-padding">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Cotizar</p>
          <h2 className="section-title">Cuéntanos sobre tu evento</h2>
          <p className="section-subtitle">
            Envía tu solicitud y recibe confirmación automática. Nos pondremos en
            contacto contigo para afinar detalles, visita y degustación.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Confirmación automática al enviar el formulario",
              "Integración directa con WhatsApp",
              "Seguimiento de solicitudes desde el panel interno",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-brown-light">
                <CalendarDays className="h-5 w-5 text-gold" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-soft p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Nombre completo</label>
              <input
                className="input-field"
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Correo</label>
              <input
                type="email"
                className="input-field"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Teléfono</label>
              <input
                className="input-field"
                required
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Tipo de evento</label>
              <select
                className="input-field"
                value={form.eventType}
                onChange={(event) => setForm({ ...form, eventType: event.target.value })}
              >
                {eventTypes.map((event) => (
                  <option key={event.title} value={event.title}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Fecha tentativa</label>
              <input
                type="date"
                className="input-field"
                required
                value={form.eventDate}
                onChange={(event) => setForm({ ...form, eventDate: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Invitados</label>
              <input
                type="number"
                min={40}
                className="input-field"
                required
                value={form.guests}
                onChange={(event) => setForm({ ...form, guests: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Paquete</label>
              <select
                className="input-field"
                value={form.packageId}
                onChange={(event) => setForm({ ...form, packageId: event.target.value })}
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Mensaje adicional</label>
              <textarea
                className="input-field min-h-28"
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                placeholder="Cuéntanos si necesitas algo especial..."
              />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
          {success ? <p className="mt-4 text-sm text-green-700">{success}</p> : null}

          <button type="submit" className="btn-primary mt-6 w-full" disabled={loading}>
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {loading ? "Enviando..." : "Enviar cotización"}
          </button>
        </form>
      </div>
    </section>
  );
}
