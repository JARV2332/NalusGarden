import { NextResponse } from "next/server";
import {
  createVisitCalendarEvent,
  isGoogleCalendarConfigured,
} from "@/lib/google-calendar";
import { addVisit, updateVisitCalendarMeta } from "@/lib/storage";

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

    let calendarLinked = false;
    let calendarLink = "";

    if (isGoogleCalendarConfigured()) {
      try {
        const calendarEvent = await createVisitCalendarEvent({
          name: body.name,
          email: body.email,
          phone: body.phone,
          preferredDate: body.preferredDate,
          preferredTime: body.preferredTime,
          notes: body.notes,
        });

        await updateVisitCalendarMeta(entry.id, calendarEvent.eventId, calendarEvent.htmlLink);
        calendarLinked = true;
        calendarLink = calendarEvent.htmlLink;
      } catch (calendarError) {
        console.error("[cita] error al crear evento en Google Calendar", calendarError);
      }
    }

    console.info("[cita] nueva visita solicitada", entry);

    return NextResponse.json({
      ok: true,
      message: calendarLinked
        ? "Visita agendada. Te enviamos la invitación a tu correo y la añadimos al calendario del jardín."
        : "Visita solicitada correctamente. Te contactaremos pronto para confirmar.",
      id: entry.id,
      calendarLinked,
      calendarLink: calendarLink || undefined,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Error al guardar la visita." },
      { status: 500 },
    );
  }
}
