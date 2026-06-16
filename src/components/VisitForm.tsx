"use client";

import { FormEvent, useState } from "react";
import { Clock3, LoaderCircle } from "lucide-react";

type VisitFormState = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
};

const initialState: VisitFormState = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  preferredTime: "10:00",
  notes: "",
};

export function VisitForm() {
  const [form, setForm] = useState<VisitFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        calendarLinked?: boolean;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "No se pudo agendar la visita.");
      }

      setSuccess(data.message ?? "Visita solicitada correctamente.");
      setForm(initialState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Agenda</p>
          <h2 className="section-title">Agenda una visita al jardín</h2>
          <p className="section-subtitle mx-auto">
            Conoce los espacios, planifica tu montaje y agenda la degustación
            previa incluida en el paquete Jardín de Nalu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-soft mx-auto mt-8 max-w-3xl p-5 sm:mt-10 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Nombre</label>
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
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Fecha preferida</label>
              <input
                type="date"
                className="input-field"
                required
                value={form.preferredDate}
                onChange={(event) => setForm({ ...form, preferredDate: event.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Hora preferida</label>
              <div className="relative">
                <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brown-light" />
                <input
                  type="time"
                  className="input-field pl-11"
                  required
                  value={form.preferredTime}
                  onChange={(event) => setForm({ ...form, preferredTime: event.target.value })}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-brown-dark">Notas</label>
              <textarea
                className="input-field min-h-24"
                value={form.notes}
                onChange={(event) => setForm({ ...form, notes: event.target.value })}
                placeholder="¿Qué tipo de evento estás planeando?"
              />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
          {success ? <p className="mt-4 text-sm text-green-700">{success}</p> : null}

          <button type="submit" className="btn-secondary mt-6 w-full border-brown/20" disabled={loading}>
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Agendando..." : "Solicitar visita"}
          </button>
        </form>
      </div>
    </section>
  );
}
