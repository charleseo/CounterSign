import { NextRequest, NextResponse } from "next/server";
import { dbRepository } from "@/lib/db/repository";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/account/login?error=missing_token", request.url)
    );
  }

  const res = dbRepository.verifyMagicLink(token);
  if (!res) {
    return NextResponse.redirect(
      new URL("/account/login?error=invalid_or_expired_token", request.url)
    );
  }

  const response = NextResponse.redirect(new URL("/account", request.url));
  response.cookies.set("tracebase_session", res.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 86400,
  });

  return response;
}
