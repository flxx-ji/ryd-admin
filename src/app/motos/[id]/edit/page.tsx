'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMotos } from '@/lib/api';
import MotoForm from '@/components/MotoForm';
import toast from 'react-hot-toast';
import type { Moto } from '@/components/MotoForm';


export default function EditMotoPage() {
  const { id } = useParams();
  const router = useRouter();
 const [motoToEdit, setMotoToEdit] = useState<Moto | null>(null);


  useEffect(() => {
    const fetchMoto = async () => {
      try {
        const motos = await getMotos();
        const found: Moto |undefined =  motos.find((moto) => moto.id === id);
        if (!found) {
          toast.error("Moto introuvable.");
          router.push('/motos');
        } else {
          setMotoToEdit(found );
        }
      } catch (e) {
  console.error('Erreur lors du chargement de la moto :', e);
  toast.error("Erreur de chargement de la moto.");
}

    };

    if (id) fetchMoto();
  }, [id, router]);

  return (
    <div className="max-w-2xl mx-auto">
      <MotoForm
        motoToEdit={motoToEdit}
        onUpdate={() => router.push('/motos')}
        onAdd={() => {}}
      />
    </div>
  );
}
