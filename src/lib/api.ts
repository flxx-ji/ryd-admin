import axios from 'axios';
import type { RawMoto } from '@/types';

/* 🌐 Base URL de l'API */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/* 📦 Format Moto utilisé dans le front */
export interface MotoData {
  nom: string;
  marque: string;
  image?: File | string;
  description: string;
  tarif_1jour: number;
  tarif_3jours: number;
  tarif_5jours: number;
  tarif_semaine: number;
}

/* 🔐 Récupération du token admin depuis le localStorage */
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

/* -----------------------------
   ✅ GET — Toutes les motos (publique)
------------------------------ */
export async function getMotos() {
  try {
    const res = await fetch(`${BASE_URL}/api/motos`);
    if (!res.ok) throw new Error("Échec de la récupération des motos");

    const motos: RawMoto[] = await res.json();

    return motos.map((m) => ({
      id: m._id,
      nom: m.nom,
      marque: m.marque,
      image: m.image ? `${BASE_URL}${m.image}` : '',
      description: m.description || '',
      tarif_1jour: m.tarifs?.unJour || 0,
      tarif_3jours: m.tarifs?.deuxTroisJours || 0,
      tarif_5jours: m.tarifs?.quatreCinqJours || 0,
      tarif_semaine: m.tarifs?.uneSemaine || 0,
    }));
  } catch (error) {
    console.error("❌ Erreur getMotos:", error);
    return [];
  }
}

/* -----------------------------
   ✅ GET — Moto par ID (publique)
------------------------------ */
export async function getMotoById(id: string): Promise<MotoData> {
  const res = await fetch(`${BASE_URL}/api/motos/${id}`);
  if (!res.ok) throw new Error('Moto introuvable');
  return res.json();
}

/* -----------------------------
   ✅ POST — Créer une moto (admin)
------------------------------ */
export const createMoto = async (formData: FormData) => {
  try {
    const token = getToken();
    const response = await axios.post(`${BASE_URL}/api/admin/motos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Erreur createMoto:', error);
    throw error;
  }
};

/* -----------------------------
   ✅ PUT — Modifier une moto (admin)
------------------------------ */
export const updateMoto = async (id: string, motoData: FormData) => {
  try {
    const token = getToken();
    const res = await axios.put(`${BASE_URL}/api/admin/motos/${id}`, motoData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Erreur updateMoto:', error);
    throw error;
  }
};

/* -----------------------------
   ✅ DELETE — Supprimer une moto (admin)
------------------------------ */
export const deleteMoto = async (id: string) => {
  try {
    const token = getToken();
    const res = await axios.delete(`${BASE_URL}/api/admin/motos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Erreur deleteMoto:', error);
    throw error;
  }
};
