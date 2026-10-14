import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "sfs_auth";

export function middleware(request: NextRequest) {
  const isUnlocked = request.cookies.get(COOKIE_NAME)?.value === "1";
  if (isUnlocked) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = "";
  url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!unlock|api/unlock|_next/static|_next/image|favicon.ico|images|videos|logo.png|logo-icon.svg).*)",
  ],
};
