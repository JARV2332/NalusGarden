import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminSession, ADMIN_COOKIE } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const protectedPage = pathname.startsWith("/admin");
  const protectedApi = pathname.startsWith("/api/admin");

  if (!protectedPage && !protectedApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authenticated = await verifyAdminSession(token);

  if (!authenticated) {
    if (protectedApi) {
      return NextResponse.json({ ok: false, message: "No autorizado." }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
