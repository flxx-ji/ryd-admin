'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur('');
    try {
      const token = await loginAdmin(email, motDePasse);
      if (token) {
        localStorage.setItem('adminToken', token);
        router.push('/admin/dashboard'); // redirige après login
      }
    } catch (err) {
  if (err instanceof Error) {
    setErreur(err.message);
  } else {
    setErreur("Erreur inconnue");
  }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Connexion Admin</h1>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Mot de passe</label>
        <input
          type="password"
          value={motDePasse}
          onChange={e => setMotDePasse(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />

        {erreur && <p className="text-red-500 mb-4">{erreur}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
