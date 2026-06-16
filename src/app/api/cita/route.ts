import { NextResponse } from "next/server";
import { addVisit } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      preferredDate?: string;
      preferredTime?: string;
      notes?: string;
    };

    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.preferredDate ||
      !body.preferredTime
    ) {
      return NextResponse.json(
        { ok: false, message: "Completa todos los campos obligatorios." },
        { status: 400 },
      );
    }

    const entry = await addVisit({
      name: body.name,
      email: body.email,
      phone: body.phone,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      notes: body.notes,
    });

    console.info("[cita] nueva visita solicitada", entry);

    return NextResponse.json({
      ok: true,
      message: "Visita solicitada correctamente.",
      id: entry.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Error al guardar la visita." },
      { status: 500 },
    );
  }
}
