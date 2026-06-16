import { NextResponse } from "next/server";
import { getAllSubmissions } from "@/lib/storage";

export async function GET() {
  const data = await getAllSubmissions();
  return NextResponse.json(data);
}
