// 📁 src/app/api/admin/logout/route.ts

import { NextResponse } from "next/server";

// ✅ Version simple : pas de cookies à gérer pour l'instant
export async function POST() {
  return NextResponse.json({ message: "Déconnecté" });
}
