'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/auth';

export default function useRequireAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = isAdminLoggedIn();
    if (!isLoggedIn) {
      router.push('/login'); // 🚫 Redirige si pas connecté
    }
  }, []);
}
