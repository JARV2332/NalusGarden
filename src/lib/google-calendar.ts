import { google } from "googleapis";

const TIMEZONE = "America/Guatemala";

export type CalendarEventInput = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
};

export type CalendarEventResult = {
  eventId: string;
  htmlLink: string;
};

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID,
  );
}

function getCalendarClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!email || !key || !calendarId) {
    throw new Error("Google Calendar no está configurado.");
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return {
    calendar: google.calendar({ version: "v3", auth }),
    calendarId,
  };
}

function buildEventTimes(preferredDate: string, preferredTime: string) {
  const start = new Date(`${preferredDate}T${preferredTime}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  return { start, end };
}

export async function createVisitCalendarEvent(
  input: CalendarEventInput,
): Promise<CalendarEventResult> {
  const { calendar, calendarId } = getCalendarClient();
  const { start, end } = buildEventTimes(input.preferredDate, input.preferredTime);

  const description = [
    `Visita solicitada desde el sitio web de Nalu's Garden.`,
    "",
    `Nombre: ${input.name}`,
    `Correo: ${input.email}`,
    `Teléfono: ${input.phone}`,
    input.notes ? `Notas: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await calendar.events.insert({
    calendarId,
    sendUpdates: "all",
    requestBody: {
      summary: `Visita al jardín — ${input.name}`,
      description,
      start: {
        dateTime: start.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: TIMEZONE,
      },
      attendees: [{ email: input.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 60 },
        ],
      },
    },
  });

  return {
    eventId: response.data.id ?? "",
    htmlLink: response.data.htmlLink ?? "",
  };
}

export async function updateVisitCalendarEvent(
  eventId: string,
  input: CalendarEventInput,
) {
  const { calendar, calendarId } = getCalendarClient();
  const { start, end } = buildEventTimes(input.preferredDate, input.preferredTime);

  await calendar.events.patch({
    calendarId,
    eventId,
    sendUpdates: "all",
    requestBody: {
      summary: `Visita al jardín — ${input.name}`,
      start: {
        dateTime: start.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: TIMEZONE,
      },
    },
  });
}

export async function deleteVisitCalendarEvent(eventId: string) {
  const { calendar, calendarId } = getCalendarClient();
  await calendar.events.delete({
    calendarId,
    eventId,
    sendUpdates: "all",
  });
}

export async function listUpcomingCalendarEvents(limit = 8) {
  if (!isGoogleCalendarConfigured()) {
    return [];
  }

  const { calendar, calendarId } = getCalendarClient();
  const response = await calendar.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    maxResults: limit,
    singleEvents: true,
    orderBy: "startTime",
  });

  return (response.data.items ?? []).map((event) => ({
    id: event.id ?? "",
    title: event.summary ?? "Sin título",
    start: event.start?.dateTime ?? event.start?.date ?? "",
    end: event.end?.dateTime ?? event.end?.date ?? "",
    link: event.htmlLink ?? "",
  }));
}
