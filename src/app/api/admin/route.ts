import { NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/auth";
import {
  deleteVisitCalendarEvent,
  isGoogleCalendarConfigured,
  listUpcomingCalendarEvents,
} from "@/lib/google-calendar";
import { getAllSubmissions, updateVisitStatus, type VisitSubmission } from "@/lib/storage";

export async function GET() {
  const authenticated = await getAdminSessionFromCookies();
  if (!authenticated) {
    return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
  }

  const data = await getAllSubmissions();
  const calendarEvents = isGoogleCalendarConfigured()
    ? await listUpcomingCalendarEvents()
    : [];

  return NextResponse.json({
    ...data,
    calendar: {
      configured: isGoogleCalendarConfigured(),
      events: calendarEvents,
    },
  });
}

export async function PATCH(request: Request) {
  const authenticated = await getAdminSessionFromCookies();
  if (!authenticated) {
    return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      visitId?: string;
      status?: VisitSubmission["status"];
    };

    if (!body.visitId || !body.status) {
      return NextResponse.json(
        { ok: false, message: "Datos incompletos." },
        { status: 400 },
      );
    }

    const data = await getAllSubmissions();
    const visit = data.visits.find((entry) => entry.id === body.visitId);
    if (!visit) {
      return NextResponse.json({ ok: false, message: "Visita no encontrada." }, { status: 404 });
    }

    if (body.status === "cancelada" && visit.calendarEventId && isGoogleCalendarConfigured()) {
      try {
        await deleteVisitCalendarEvent(visit.calendarEventId);
      } catch (error) {
        console.error("[admin] error al cancelar evento en Google Calendar", error);
      }
    }

    const updated = await updateVisitStatus(body.visitId, body.status);
    return NextResponse.json({ ok: true, visit: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "No se pudo actualizar la visita." },
      { status: 500 },
    );
  }
}
