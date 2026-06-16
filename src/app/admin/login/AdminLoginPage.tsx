"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function AdminLoginPage() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/admin";
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "No se pudo iniciar sesión.");
      }

      window.location.href = nextPath;
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <div className="card-soft w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brown-dark text-gold">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Panel admin</p>
          <h1 className="mt-2 font-serif text-3xl text-brown-dark">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-brown-light">
            Acceso para administrar solicitudes, contenido y calendario.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-brown-dark">Usuario</label>
            <input
              className="input-field"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brown-dark">Contraseña</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Entrando..." : "Entrar al panel"}
          </button>
        </form>

        <Link href="/" className="mt-6 block text-center text-sm text-brown-light hover:text-brown">
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}
