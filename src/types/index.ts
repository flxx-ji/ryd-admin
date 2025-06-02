export type RawMoto = {
  _id: string;
  nom: string;
  marque: string;
  image: string;
  description?: string;
  tarifs: {
    unJour: number;
    deuxTroisJours: number;
    quatreCinqJours: number;
    uneSemaine: number;
  };
};
