import { NextRequest, NextResponse } from "next/server";

import { getUserProfile } from "./api/handlers/users/profile";

export async function proxy(req: NextRequest) {
  const userProfileResponse = await getUserProfile().catch(() => null);

  if (userProfileResponse?.data.user) return NextResponse.next();

  const redirectUrl = new URL("/login", req.url);
  redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/profile", "/history"],
};
