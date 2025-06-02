import axios from 'axios';
import type { RawMoto } from '@/types';

/* -----------------------------
   Base URL de l'API (Railway en prod, .env en dev)
------------------------------ */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ryd-backend2-production.up.railway.app';

/* -----------------------------
   Interface Moto utilisée dans les formulaires
------------------------------ */
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

/* -----------------------------
   GET — Récupérer toutes les motos
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
      image: m.image,
      description: m.description || '',
      tarif_1jour: m.tarifs?.unJour || 0,
      tarif_3jours: m.tarifs?.deuxTroisJours || 0,
      tarif_5jours: m.tarifs?.quatreCinqJours || 0,
      tarif_semaine: m.tarifs?.uneSemaine || 0,
    }));
  } catch (error) {
    console.error("Erreur getMotos:", error);
    return [];
  }
}

/* -----------------------------
   POST — Créer une moto
------------------------------ */
export const createMoto = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/motos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Erreur createMoto:', error);
    throw error;
  }
};

/* -----------------------------
   PUT — Modifier une moto
------------------------------ */
export const updateMoto = async (id: string, motoData: FormData) => {
  try {
    const res = await axios.put(`${BASE_URL}/admin/motos/${id}`, motoData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Erreur updateMoto:', error);
    throw error;
  }
};

/* -----------------------------
   DELETE — Supprimer une moto
------------------------------ */
export const deleteMoto = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/admin/motos/${id}`);
    return res.data;
  } catch (error) {
    console.error('❌ Erreur deleteMoto:', error);
    throw error;
  }
};
