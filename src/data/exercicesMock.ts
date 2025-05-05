import { Exercice } from '../types/workout';

export const exercicesMock: Exercice[] = [
  {
    id: 'ex1',
    nom: 'Développé couché',
    description: 'Exercice de base pour la poitrine qui travaille également les triceps et les épaules',
    muscles: ['Pectoraux', 'Triceps', 'Épaules'],
    difficulte: 'moyen',
    equipement: ['Banc de musculation', 'Barre', 'Poids'],
    instructions: [
      'Allongez-vous sur le banc, les pieds à plat sur le sol',
      'Saisissez la barre avec une prise légèrement plus large que les épaules',
      'Descendez la barre jusqu\'à ce qu\'elle touche votre poitrine',
      'Poussez la barre vers le haut jusqu\'à l\'extension complète des bras'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164766/pexels-photo-4164766.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat1'
  },
  {
    id: 'ex2',
    nom: 'Traction',
    description: 'Exercice polyarticulaire pour le dos qui renforce également les biceps',
    muscles: ['Dos', 'Biceps', 'Avant-bras'],
    difficulte: 'difficile',
    equipement: ['Barre de traction'],
    instructions: [
      'Saisissez la barre avec une prise plus large que les épaules',
      'Gardez les épaules en arrière et la poitrine bombée',
      'Tirez votre corps vers le haut jusqu\'à ce que votre menton dépasse la barre',
      'Descendez lentement jusqu\'à l\'extension complète des bras'
    ],
    imageUrl: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat2'
  },
  {
    id: 'ex3',
    nom: 'Squat',
    description: 'Exercice fondamental pour le bas du corps',
    muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers'],
    difficulte: 'moyen',
    equipement: ['Rack à squat', 'Barre', 'Poids'],
    instructions: [
      'Placez la barre sur vos trapèzes, pas sur votre cou',
      'Écartez les pieds à la largeur des épaules',
      'Descendez en pliant les genoux comme si vous alliez vous asseoir',
      'Gardez le dos droit et la poitrine bombée',
      'Remontez en poussant à travers les talons'
    ],
    imageUrl: 'https://images.pexels.com/photos/6550851/pexels-photo-6550851.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat3'
  },
  {
    id: 'ex4',
    nom: 'Développé militaire',
    description: 'Exercice polyarticulaire pour les épaules',
    muscles: ['Deltoïdes', 'Triceps', 'Trapèzes'],
    difficulte: 'moyen',
    equipement: ['Banc', 'Haltères ou barre'],
    instructions: [
      'Asseyez-vous sur un banc avec un dossier vertical',
      'Saisissez les poids avec une prise légèrement plus large que les épaules',
      'Poussez les poids vers le haut jusqu\'à l\'extension complète des bras',
      'Abaissez les poids jusqu\'à ce que vos bras forment un angle de 90 degrés'
    ],
    imageUrl: 'https://images.pexels.com/photos/4162579/pexels-photo-4162579.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat4'
  },
  {
    id: 'ex5',
    nom: 'Curl biceps',
    description: 'Exercice d\'isolation pour les biceps',
    muscles: ['Biceps'],
    difficulte: 'facile',
    equipement: ['Haltères'],
    instructions: [
      'Tenez-vous debout avec un haltère dans chaque main',
      'Gardez les coudes près du corps',
      'Fléchissez les coudes pour amener les haltères vers vos épaules',
      'Abaissez lentement les haltères à la position de départ'
    ],
    imageUrl: 'https://images.pexels.com/photos/4164772/pexels-photo-4164772.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat5'
  },
  {
    id: 'ex6',
    nom: 'Crunch',
    description: 'Exercice d\'isolation pour les abdominaux',
    muscles: ['Abdominaux'],
    difficulte: 'facile',
    equipement: ['Tapis'],
    instructions: [
      'Allongez-vous sur le dos, les genoux pliés et les pieds à plat sur le sol',
      'Placez vos mains derrière la tête ou croisées sur la poitrine',
      'Contractez vos abdominaux pour soulever vos épaules du sol',
      'Abaissez lentement votre dos au sol'
    ],
    imageUrl: 'https://images.pexels.com/photos/4498282/pexels-photo-4498282.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat6'
  },
  {
    id: 'ex7',
    nom: 'Course à pied',
    description: 'Exercice cardiovasculaire de base',
    muscles: ['Jambes', 'Cœur'],
    difficulte: 'moyen',
    equipement: ['Chaussures de course'],
    instructions: [
      'Adoptez une position debout détendue',
      'Commencez à courir à un rythme confortable',
      'Maintenez une respiration régulière',
      'Gardez le regard droit devant vous'
    ],
    imageUrl: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat7'
  },
  {
    id: 'ex8',
    nom: 'Étirement des ischio-jambiers',
    description: 'Étirement pour améliorer la souplesse des ischio-jambiers',
    muscles: ['Ischio-jambiers'],
    difficulte: 'facile',
    equipement: ['Tapis'],
    instructions: [
      'Asseyez-vous sur le sol avec les jambes tendues devant vous',
      'Penchez-vous vers l\'avant à partir des hanches',
      'Essayez d\'atteindre vos orteils avec vos mains',
      'Maintenez la position pendant 20-30 secondes'
    ],
    imageUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=600',
    categorieId: 'cat8'
  }
];