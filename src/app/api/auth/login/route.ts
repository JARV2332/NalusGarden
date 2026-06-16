import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSession,
  isAdminConfigured,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Configura ADMIN_PASSWORD en las variables de entorno.",
      },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    if (!body.username || !body.password) {
      return NextResponse.json(
        { ok: false, message: "Usuario y contraseña requeridos." },
        { status: 400 },
      );
    }

    if (!verifyAdminCredentials(body.username, body.password)) {
      return NextResponse.json(
        { ok: false, message: "Credenciales incorrectas." },
        { status: 401 },
      );
    }

    const token = await createAdminSession();
    const response = NextResponse.json({ ok: true, message: "Sesión iniciada." });
    response.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "No se pudo iniciar sesión." },
      { status: 500 },
    );
  }
}
