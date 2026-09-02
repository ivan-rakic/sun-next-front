import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "./lib/i18n/config";

export function proxy(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  const locale = locales.find(
    (candidate) =>
      pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`),
  );

  requestHeaders.set("x-sunradio-locale", locale ?? defaultLocale);

  if (!locale || locale === defaultLocale) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const url = request.nextUrl.clone();
  const canonicalPath = pathname.slice(locale.length + 1) || "/";
  url.pathname = canonicalPath;

  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
};
