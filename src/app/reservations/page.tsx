'use client';

import { useEffect, useState } from 'react';

type ReservationWithPopulate = {
  _id: string;
  vehicule: {
    modele: string;
    marque: string;
    nom: string;
  };
  client: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
  };
  dateDebut: string;
  dateFin: string;
  prixEstime: number;
  statut: string;
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<ReservationWithPopulate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/reservations')
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error("❌ Erreur fetch reservations :", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Confirmer une réservation
  function confirmerReservation(id: string) {
    fetch(`http://localhost:5000/api/admin/reservations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut: 'confirmée' })
    })
      .then(res => res.json())
      .then((updated) => {
        console.log("✅ Réservation confirmée :", updated);
        setReservations(prev =>
          prev.map(r => r._id === id ? { ...r, statut: 'confirmée' } : r)
        );
      })
      .catch((err) => console.error('❌ Erreur confirmation :', err));
  }

  if (loading) return <p>Chargement des réservations...</p>;

  const filtered = reservations.filter((r) =>
    `${r.client?.nom} ${r.client?.prenom} ${r.vehicule?.nom} ${r.vehicule?.modele}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des réservations</h1>

      {/* 🔍 Recherche */}
      <input
        type="text"
        placeholder="Rechercher par client ou moto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
      />

      <p className="text-sm text-gray-500 mb-2">
        Réservations trouvées : {filtered.length}
      </p>

      <ul className="space-y-4">
        {filtered.map((r) => (
          <li key={r._id} className="p-4 border rounded bg-white shadow">
            <p><strong>Moto :</strong> {r.vehicule?.modele} ({r.vehicule?.marque})</p>
            <p><strong>Client :</strong> {r.client?.prenom} {r.client?.nom}</p>
            <p><strong>Email :</strong> {r.client?.email}</p>
            <p><strong>Téléphone :</strong> {r.client?.telephone}</p>
            <p><strong>Du :</strong> {r.dateDebut?.slice(0, 10)} <strong>au</strong> {r.dateFin?.slice(0, 10)}</p>
            <p><strong>Statut :</strong> {r.statut}</p>
            <p><strong>Prix :</strong> {r.prixEstime} €</p>

            {/* ✅ Bouton "Confirmer" seulement si pas encore confirmé */}
            {r.statut !== 'confirmée' && (
              <button
                onClick={() => confirmerReservation(r._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded mt-2"
              >
                Confirmer
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
