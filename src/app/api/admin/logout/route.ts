// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL));
  
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Token supprimé
  });

  return response;
}
