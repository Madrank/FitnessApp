export interface Exercice {
  id: string;
  nom: string;
  description: string;
  muscles: string[];
  difficulte: 'facile' | 'moyen' | 'difficile';
  equipement: string[];
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string;
  categorieId: string;
}

export interface Categorie {
  id: string;
  nom: string;
  description: string;
  imageUrl?: string;
}

export interface Serie {
  id: string;
  poids?: number; // en kg
  repetitions?: number;
  duree?: number; // en secondes
  distance?: number; // en mètres
  complete: boolean;
}

export interface ExerciceEntrainement {
  id: string;
  exerciceId: string;
  exercice: Exercice;
  series: Serie[];
  notes?: string;
}

export interface Entrainement {
  id: string;
  userId: string;
  nom: string;
  description?: string;
  exercices: ExerciceEntrainement[];
  date: Date;
  duree: number; // en minutes
  complete: boolean;
  notes?: string;
}

export interface Programme {
  id: string;
  nom: string;
  description: string;
  niveau: 'débutant' | 'intermédiaire' | 'avancé';
  duree: number; // en semaines
  frequence: number; // nombre de séances par semaine
  objectif: string;
  entrainements: Entrainement[];
  imageUrl?: string;
}

export interface Objectif {
  id: string;
  userId: string;
  titre: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  type: 'poids' | 'force' | 'endurance' | 'habitude' | 'autre';
  valeurCible?: number;
  unité?: string;
  progres: number; // pourcentage de 0 à 100
  complete: boolean;
}