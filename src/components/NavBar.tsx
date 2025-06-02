// src/components/NavBar.tsx

// On active le mode "client" car la Navbar utilise des interactions côté client (ex: collapse Bootstrap)
'use client';

// Import du composant Link natif de Next.js
// Ce composant remplace les <a href=""> traditionnels pour éviter les rechargements de page complets.
import Link from 'next/link';

export default function NavBar() {
  return (
    // Composant Navbar Bootstrap
    <nav className="navbar navbar-expand-lg bg-light mb-4">
      <div className="container">
        {/* Titre/logo de ta navbar, qui ramène à l'accueil */}
        <Link className="navbar-brand" href="/">
          Admin RYD
        </Link>

        {/* Conteneur des liens de navigation */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {/* Onglet vers la page des motos */}
            <li className="nav-item">
              <Link className="nav-link" href="/motos">
                Motos
              </Link>
            </li>

            {/* Onglet vers la page des clients */}
            <li className="nav-item">
              <Link className="nav-link" href="/clients">
                Clients
              </Link>
            </li>

            {/* Onglet vers la page des réservations */}
            <li className="nav-item">
              <Link className="nav-link" href="/reservations">
                Réservations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
