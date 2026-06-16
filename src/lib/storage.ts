import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export type QuoteSubmission = {
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
  status: "nueva" | "contactada" | "confirmada";
};

export type VisitSubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "pendiente" | "confirmada" | "completada";
};

export type ClientEvent = {
  id: string;
  token: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  packageName: string;
  services: string[];
  premontajeDate?: string;
  premontajeTime?: string;
  schedule: { time: string; activity: string }[];
  status: "confirmado" | "premontaje" | "completado";
};

type Database = {
  quotes: QuoteSubmission[];
  visits: VisitSubmission[];
  events: ClientEvent[];
};

const defaultDb: Database = { quotes: [], visits: [], events: [] };

async function readDb(): Promise<Database> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, "submissions.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    return {
      quotes: parsed.quotes ?? [],
      visits: parsed.visits ?? [],
      events: parsed.events ?? [],
    };
  } catch {
    return structuredClone(defaultDb);
  }
}

async function writeDb(db: Database) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, "submissions.json");
  await fs.writeFile(filePath, JSON.stringify(db, null, 2), "utf-8");
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function addQuote(
  data: Omit<QuoteSubmission, "id" | "createdAt" | "status">,
) {
  const db = await readDb();
  const entry: QuoteSubmission = {
    ...data,
    id: createId(),
    createdAt: new Date().toISOString(),
    status: "nueva",
  };
  db.quotes.unshift(entry);
  await writeDb(db);
  return entry;
}

export async function addVisit(
  data: Omit<VisitSubmission, "id" | "createdAt" | "status">,
) {
  const db = await readDb();
  const entry: VisitSubmission = {
    ...data,
    id: createId(),
    createdAt: new Date().toISOString(),
    status: "pendiente",
  };
  db.visits.unshift(entry);
  await writeDb(db);
  return entry;
}

export async function getAllSubmissions() {
  return readDb();
}

export async function getEventByToken(token: string) {
  const db = await readDb();
  return db.events.find((event) => event.token === token) ?? null;
}

export async function seedDemoEvent() {
  const db = await readDb();
  if (db.events.length > 0) return db.events[0];

  const demo: ClientEvent = {
    id: createId(),
    token: "demo-nalu",
    clientName: "María y Carlos",
    eventType: "Boda",
    eventDate: "2026-09-20",
    packageName: "Jardín de Nalu — Todo incluido",
    services: [
      "Banquete con bebidas repuestas",
      "Maestro de ceremonias y Discomóvil",
      "Telas y luces vintage",
      "Pastel hermoso y delicioso",
      "Mesa de homenaje",
      "Reunión previa para montaje y degustación",
    ],
    premontajeDate: "2026-09-19",
    premontajeTime: "16:00",
    schedule: [
      { time: "14:00", activity: "Llegada del equipo de montaje" },
      { time: "16:00", activity: "Premontaje con los novios" },
      { time: "17:00", activity: "Ceremonia en el jardín" },
      { time: "18:30", activity: "Recepción y banquete" },
      { time: "21:00", activity: "Baile y brindis" },
    ],
    status: "confirmado",
  };

  db.events.push(demo);
  await writeDb(db);
  return demo;
}
