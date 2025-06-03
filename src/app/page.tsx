'use client';

import { useRouter } from 'next/navigation';
import useRequireAdminAuth from '@/hooks/requireAuth'; // ✅ ajout

export default function Dashboard() {
  useRequireAdminAuth(); // 🔒 redirige vers /login si pas connecté

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (res.ok) {
        localStorage.removeItem('adminToken');
        router.push('/login');
      } else {
        alert('Erreur lors de la déconnexion');
      }
    } catch (err) {
      console.error('Erreur logout', err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-3xl font-bold mb-4">
        Bienvenue sur le Dashboard Admin
      </h1>

      <div className="flex gap-4">
        <button className="btn btn-success">Test bouton</button>
        <button onClick={handleLogout} className="btn btn-error">
          Déconnexion
        </button>
      </div>
    </div>
  );
}
