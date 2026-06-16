import { NextResponse } from "next/server";
import { addQuote } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      eventType?: string;
      eventDate?: string;
      guests?: number;
      packageId?: string;
      message?: string;
    };

    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.eventType ||
      !body.eventDate ||
      !body.guests ||
      !body.packageId
    ) {
      return NextResponse.json(
        { ok: false, message: "Completa todos los campos obligatorios." },
        { status: 400 },
      );
    }

    const entry = await addQuote({
      name: body.name,
      email: body.email,
      phone: body.phone,
      eventType: body.eventType,
      eventDate: body.eventDate,
      guests: body.guests,
      packageId: body.packageId,
      message: body.message,
    });

    // Punto de integración para correos automáticos (Resend/SendGrid)
    console.info("[cotizacion] nueva solicitud", entry);

    return NextResponse.json({
      ok: true,
      message: "Cotización recibida correctamente.",
      id: entry.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Error al guardar la cotización." },
      { status: 500 },
    );
  }
}
