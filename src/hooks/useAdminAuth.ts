// src/hooks/useAdminAuth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login"); // 🚨 Pas connecté ? redirection
    }
  }, []);
}
