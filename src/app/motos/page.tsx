'use client';
import HeaderAdmin from '@/components/HeaderAdmin';
import { useEffect, useState } from 'react';
import { getMotos, deleteMoto } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export type Moto = {
  id: string;
  nom: string;
  marque: string;
  image: string;
  description: string;
  tarif_1jour: number;
  tarif_3jours: number;
  tarif_5jours: number;
  tarif_semaine: number;
};

export default function MotosPage() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const data = await getMotos();
        setMotos(data);
      } catch (error) {
        console.error("Erreur lors du chargement des motos :", error);
        toast.error("Erreur lors du chargement des motos.");
      }
    };

    fetchMotos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Es-tu sûr de vouloir supprimer cette moto ?")) return;
    try {
      await deleteMoto(id);
      toast.success("Moto supprimée avec succès !");
      setMotos((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error("Erreur lors de la suppression :", e);
      toast.error("Erreur lors de la suppression.");
    }
  };

  return (
    <>
      <HeaderAdmin />

      <div className="p-6">
        {/* Header + Bouton Ajouter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Liste des Motos</h2>
          <button
            onClick={() => router.push('/motos/new')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ➕ Ajouter une moto
          </button>
        </div>

        {/* Liste */}
        {motos.length === 0 ? (
          <p>Aucune moto trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motos.map((moto) => (
              <div key={moto.id} className="border rounded p-4 shadow">
                <img
                  src={moto.image}
                  alt={moto.nom}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold">{moto.nom}</h3>
                <p className="text-sm text-gray-600">{moto.marque}</p>
                <p className="text-sm mt-2">{moto.description}</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>1 jour: {moto.tarif_1jour} €</li>
                  <li>2-3 jours: {moto.tarif_3jours} €</li>
                  <li>4-5 jours: {moto.tarif_5jours} €</li>
                  <li>1 semaine: {moto.tarif_semaine} €</li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                    onClick={() => router.push(`/motos/${moto.id}/edit`)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => handleDelete(moto.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
