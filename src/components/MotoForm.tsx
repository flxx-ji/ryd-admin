import { useState, useEffect } from 'react';
import { createMoto, updateMoto } from '@/lib/api';
import toast from 'react-hot-toast';

export type Moto = {
  id?: string;
  nom: string;
  marque: string;
  image: File | string;
  description: string;
  tarif_1jour: number;
  tarif_3jours: number;
  tarif_5jours: number;
  tarif_semaine: number;
};

type Props = {
  motoToEdit: Moto | null;
  onUpdate: (moto: Moto) => void;
  onAdd: () => void;
};

export default function MotoForm({ motoToEdit, onUpdate, onAdd }: Props) {
  const [form, setForm] = useState<Moto>({
    nom: '',
    marque: '',
    image: '',
    description: '',
    tarif_1jour: 0,
    tarif_3jours: 0,
    tarif_5jours: 0,
    tarif_semaine: 0,
  });

  useEffect(() => {
    if (motoToEdit) {
      setForm(motoToEdit);
    }
  }, [motoToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nom', form.nom);
      formData.append('marque', form.marque);
      formData.append('description', form.description);
      formData.append('tarif_1jour', form.tarif_1jour.toString());
      formData.append('tarif_3jours', form.tarif_3jours.toString());
      formData.append('tarif_5jours', form.tarif_5jours.toString());
      formData.append('tarif_semaine', form.tarif_semaine.toString());

      if (form.image instanceof File) {
        formData.append('image', form.image);
      }

      if (motoToEdit) {
        await updateMoto(motoToEdit.id!, formData);
        toast.success('Moto mise à jour avec succès.');
        onUpdate(form);
      } else {
        await createMoto(formData);
        toast.success('Moto ajoutée avec succès.');
        onAdd();
      }

      setForm({
        nom: '',
        marque: '',
        image: '',
        description: '',
        tarif_1jour: 0,
        tarif_3jours: 0,
        tarif_5jours: 0,
        tarif_semaine: 0,
      });
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      toast.error('Erreur lors de la soumission.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">
        {motoToEdit ? 'Modifier une Moto' : 'Ajouter une Moto'}
      </h2>

      <input
        type="text"
        placeholder="Nom"
        className="form-control"
        value={form.nom}
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
      />
      <input
        type="text"
        placeholder="Marque"
        className="form-control"
        value={form.marque}
        onChange={(e) => setForm({ ...form, marque: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="form-control"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setForm({ ...form, image: e.target.files[0] });
          }
        }}
      />
      <input
        type="number"
        placeholder="Tarif 1 jour"
        className="form-control"
        value={form.tarif_1jour}
        onChange={(e) => setForm({ ...form, tarif_1jour: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Tarif 3 jours"
        className="form-control"
        value={form.tarif_3jours}
        onChange={(e) => setForm({ ...form, tarif_3jours: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Tarif 5 jours"
        className="form-control"
        value={form.tarif_5jours}
        onChange={(e) => setForm({ ...form, tarif_5jours: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Tarif 1 semaine"
        className="form-control"
        value={form.tarif_semaine}
        onChange={(e) => setForm({ ...form, tarif_semaine: Number(e.target.value) })}
      />

      <button type="submit" className="btn btn-success">
        💾 Enregistrer
      </button>
    </form>
  );
}
