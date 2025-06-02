// src/app/motos/new/page.tsx

'use client';

import MotoForm from '@/components/MotoForm';
import { useRouter } from 'next/navigation';

export default function NewMotoPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Ajouter une Moto</h2>
      <MotoForm
        motoToEdit={null}
        onAdd={() => router.push('/motos')}
        onUpdate={() => {}}
      />
    </div>
  );
}
