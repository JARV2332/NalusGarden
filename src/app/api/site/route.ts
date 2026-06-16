import { NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/auth";
import {
  defaultSiteSettings,
  getSiteSettings,
  saveSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function PUT(request: Request) {
  const authenticated = await getAdminSessionFromCookies();
  if (!authenticated) {
    return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<SiteSettings>;
    const settings: SiteSettings = {
      tagline: body.tagline?.trim() || defaultSiteSettings.tagline,
      heroDescription: body.heroDescription?.trim() || defaultSiteSettings.heroDescription,
      whatsapp: body.whatsapp?.replace(/\D/g, "") || defaultSiteSettings.whatsapp,
      whatsappDisplay: body.whatsappDisplay?.trim() || defaultSiteSettings.whatsappDisplay,
      email: body.email?.trim() || defaultSiteSettings.email,
      location: body.location?.trim() || defaultSiteSettings.location,
    };

    await saveSiteSettings(settings);
    return NextResponse.json({ ok: true, message: "Contenido actualizado.", settings });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "No se pudo guardar el contenido." },
      { status: 500 },
    );
  }
}
