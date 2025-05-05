import { Objectif } from '../types/workout';

export const objectifsMock: Objectif[] = [
  {
    id: 'obj1',
    userId: 'user1',
    titre: 'Perdre 5kg',
    description: 'Perdre 5kg en 3 mois avec une combinaison d\'entraînement et d\'alimentation équilibrée',
    dateDebut: new Date(2025, 0, 1),
    dateFin: new Date(2025, 3, 1),
    type: 'poids',
    valeurCible: 5,
    unité: 'kg',
    progres: 40,
    complete: false
  },
  {
    id: 'obj2',
    userId: 'user1',
    titre: 'Courir 5km sans arrêt',
    description: 'Améliorer mon endurance pour pouvoir courir 5km sans m\'arrêter',
    dateDebut: new Date(2025, 1, 15),
    dateFin: new Date(2025, 4, 15),
    type: 'endurance',
    valeurCible: 5,
    unité: 'km',
    progres: 60,
    complete: false
  },
  {
    id: 'obj3',
    userId: 'user1',
    titre: 'S\'entraîner 3 fois par semaine',
    description: 'Créer une habitude d\'entraînement régulier',
    dateDebut: new Date(2025, 2, 1),
    dateFin: new Date(2025, 5, 1),
    type: 'habitude',
    progres: 75,
    complete: false
  },
  {
    id: 'obj4',
    userId: 'user1',
    titre: 'Développé couché 80kg',
    description: 'Augmenter ma force au développé couché pour atteindre 80kg pour 5 répétitions',
    dateDebut: new Date(2025, 0, 1),
    dateFin: new Date(2025, 6, 1),
    type: 'force',
    valeurCible: 80,
    unité: 'kg',
    progres: 65,
    complete: false
  }
];