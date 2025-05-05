import { Entrainement } from '../types/workout';
import { exercicesMock } from './exercicesMock';

export const entrainementsMock: Entrainement[] = [
  {
    id: 'ent1',
    userId: 'user1',
    nom: 'Full Body Débutant',
    description: 'Entraînement complet du corps pour débutants',
    exercices: [
      {
        id: 'ee1',
        exerciceId: 'ex1',
        exercice: exercicesMock[0],
        series: [
          { id: 's1', poids: 40, repetitions: 10, complete: false },
          { id: 's2', poids: 40, repetitions: 10, complete: false },
          { id: 's3', poids: 40, repetitions: 10, complete: false }
        ]
      },
      {
        id: 'ee2',
        exerciceId: 'ex3',
        exercice: exercicesMock[2],
        series: [
          { id: 's4', poids: 50, repetitions: 8, complete: false },
          { id: 's5', poids: 50, repetitions: 8, complete: false },
          { id: 's6', poids: 50, repetitions: 8, complete: false }
        ]
      },
      {
        id: 'ee3',
        exerciceId: 'ex6',
        exercice: exercicesMock[5],
        series: [
          { id: 's7', repetitions: 15, complete: false },
          { id: 's8', repetitions: 15, complete: false },
          { id: 's9', repetitions: 15, complete: false }
        ]
      }
    ],
    date: new Date(),
    duree: 60,
    complete: false
  },
  {
    id: 'ent2',
    userId: 'user1',
    nom: 'Haut du Corps',
    description: 'Entraînement ciblant le haut du corps',
    exercices: [
      {
        id: 'ee4',
        exerciceId: 'ex1',
        exercice: exercicesMock[0],
        series: [
          { id: 's10', poids: 45, repetitions: 8, complete: false },
          { id: 's11', poids: 45, repetitions: 8, complete: false },
          { id: 's12', poids: 45, repetitions: 8, complete: false }
        ]
      },
      {
        id: 'ee5',
        exerciceId: 'ex2',
        exercice: exercicesMock[1],
        series: [
          { id: 's13', repetitions: 8, complete: false },
          { id: 's14', repetitions: 8, complete: false },
          { id: 's15', repetitions: 8, complete: false }
        ]
      },
      {
        id: 'ee6',
        exerciceId: 'ex4',
        exercice: exercicesMock[3],
        series: [
          { id: 's16', poids: 15, repetitions: 10, complete: false },
          { id: 's17', poids: 15, repetitions: 10, complete: false },
          { id: 's18', poids: 15, repetitions: 10, complete: false }
        ]
      },
      {
        id: 'ee7',
        exerciceId: 'ex5',
        exercice: exercicesMock[4],
        series: [
          { id: 's19', poids: 10, repetitions: 12, complete: false },
          { id: 's20', poids: 10, repetitions: 12, complete: false },
          { id: 's21', poids: 10, repetitions: 12, complete: false }
        ]
      }
    ],
    date: new Date(),
    duree: 45,
    complete: false
  },
  {
    id: 'ent3',
    userId: 'user1',
    nom: 'Jambes Puissance',
    description: 'Entraînement intensif pour les jambes',
    exercices: [
      {
        id: 'ee8',
        exerciceId: 'ex3',
        exercice: exercicesMock[2],
        series: [
          { id: 's22', poids: 60, repetitions: 6, complete: false },
          { id: 's23', poids: 70, repetitions: 6, complete: false },
          { id: 's24', poids: 80, repetitions: 6, complete: false },
          { id: 's25', poids: 90, repetitions: 4, complete: false }
        ]
      }
    ],
    date: new Date(),
    duree: 30,
    complete: false
  },
  {
    id: 'ent4',
    userId: 'user1',
    nom: 'Cardio & Core',
    description: 'Entraînement combinant cardio et renforcement du centre',
    exercices: [
      {
        id: 'ee9',
        exerciceId: 'ex7',
        exercice: exercicesMock[6],
        series: [
          { id: 's26', duree: 600, distance: 2000, complete: false }
        ]
      },
      {
        id: 'ee10',
        exerciceId: 'ex6',
        exercice: exercicesMock[5],
        series: [
          { id: 's27', repetitions: 20, complete: false },
          { id: 's28', repetitions: 20, complete: false },
          { id: 's29', repetitions: 20, complete: false }
        ]
      }
    ],
    date: new Date(),
    duree: 45,
    complete: false
  }
];