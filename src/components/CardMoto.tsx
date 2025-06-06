'use client';

import { deleteMoto } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type MotoProps = {
  id: string;
  nom: string;
  marque: string;
  image: string;
  description: string;
};

export default function CardMoto({ id, nom, marque, image, description }: MotoProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm(`🛑 Supprimer la moto "${nom}" ?`);
    if (!confirm) return;

    try {
      await deleteMoto(id);
      toast.success('Moto supprimée 🗑️');
      router.refresh(); // recharge la page
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la suppression ❌');
    }
  };

  const handleEdit = () => {
    router.push(`/motos/${id}/edit`);
  };

  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt={nom} />
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-between">
          <div className="card-body">
            <h5 className="card-title">{nom}</h5>
            <p className="card-text"><strong>Marque :</strong> {marque}</p>
            <p className="card-text">{description}</p>
          </div>
          <div className="d-flex gap-2 m-3">
            <button className="btn btn-warning btn-sm" onClick={handleEdit}>
              ✏️ Modifier
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              🗑️ Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 