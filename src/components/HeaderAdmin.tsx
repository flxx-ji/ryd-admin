'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HeaderAdmin() {
  const router = useRouter();
  const [nomAdmin, setNomAdmin] = useState<string>('');

  useEffect(() => {
    const nom = localStorage.getItem('adminNom');
    if (nom) setNomAdmin(nom);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminNom');
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide">
        Admin RYD
      </div>

      <nav className="flex gap-6">
        <button onClick={() => router.push('/motos')} className="hover:underline">
          Motos
        </button>
        <button onClick={() => router.push('/clients')} className="hover:underline">
          Clients
        </button>
        <button onClick={() => router.push('/reservations')} className="hover:underline">
          Réservations
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300 hidden md:inline">
          Bonjour, <strong>{nomAdmin || 'Admin'}</strong>
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
