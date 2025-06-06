'use client';

import { useEffect, useState } from 'react';

type Client = {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/clients')
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Erreur fetch clients', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des clients...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Liste des clients</h1>
      {clients.map((c) => (
        <div key={c._id} className="border p-4 mb-4 rounded shadow">
          <p><strong>Nom :</strong> {c.prenom} {c.nom}</p>
          <p><strong>Email :</strong> {c.email}</p>
          <p><strong>Téléphone :</strong> {c.telephone}</p>
        </div>
      ))}
    </div>
  );
}
