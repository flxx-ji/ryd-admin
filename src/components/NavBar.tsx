'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, []);

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
      alert('Erreur lors de la déconnexion');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light px-4 py-3 shadow-sm">
      <div className="container-fluid d-flex justify-between items-center">
        <Link className="navbar-brand font-bold" href="/">
          Admin RYD
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link className="nav-link" href="/motos">Motos</Link>
          <Link className="nav-link" href="/clients">Clients</Link>
          <Link className="nav-link" href="/reservations">Réservations</Link>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm ms-3"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
