import axios from 'axios';

// Base URL pour l'API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ryd-backend2-production.up.railway.app';

/* -----------------------------
   TYPES
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
   GET — Liste des motos
------------------------------ */
export const getMotos = async () => {
  const res = await axios.get(`${BASE_URL}/motos`);
  return res.data;
};

/* -----------------------------
   POST — Créer une nouvelle moto
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
