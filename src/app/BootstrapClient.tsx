// 🧠 Ce commentaire dit à Next.js que ce composant s'exécute côté client (important pour useEffect)
'use client';

// 👉 On importe le hook React qui permet d'exécuter du code après le rendu (client only)
import { useEffect } from "react";

// 📦 Composant qui va injecter Bootstrap JS une fois monté dans le navigateur
export default function BootstrapClient() {
  useEffect(() => {
    // ⚠️ TypeScript ne trouve pas ce module, donc on ignore l'erreur
    // Cela permet de charger Bootstrap JS (tooltips, modals, etc.)
    // @ts-ignore
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []); // ← [] = on l’exécute une seule fois au montage

  // Pas besoin d'afficher quoi que ce soit, on retourne null
  return null;
}
