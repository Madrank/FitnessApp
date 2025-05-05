export interface User {
  id: string;
  nom: string;
  email: string;
  photo?: string;
  poids?: number;
  taille?: number;
  age?: number;
  niveau: 'débutant' | 'intermédiaire' | 'avancé';
  objectifPrincipal?: string;
  dateInscription: Date;
}