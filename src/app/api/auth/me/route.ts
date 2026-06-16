import { NextResponse } from "next/server";
import { getAdminSessionFromCookies, isAdminConfigured } from "@/lib/auth";

export async function GET() {
  const authenticated = await getAdminSessionFromCookies();
  return NextResponse.json({
    ok: true,
    authenticated,
    configured: isAdminConfigured(),
  });
}
