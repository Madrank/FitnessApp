import { Programme } from '../types/workout';
import { entrainementsMock } from './entrainementsMock';

export const programmesMock: Programme[] = [
  {
    id: 'prog1',
    nom: 'Débutant Total Body',
    description: 'Programme idéal pour les débutants souhaitant développer une base solide de force et d\'endurance',
    niveau: 'débutant',
    duree: 4, // 4 semaines
    frequence: 3, // 3 séances par semaine
    objectif: 'Renforcement général',
    entrainements: [entrainementsMock[0], entrainementsMock[1]],
    imageUrl: 'https://images.pexels.com/photos/4498603/pexels-photo-4498603.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'prog2',
    nom: 'Force et Puissance',
    description: 'Programme intermédiaire axé sur le développement de la force et de la puissance musculaire',
    niveau: 'intermédiaire',
    duree: 8, // 8 semaines
    frequence: 4, // 4 séances par semaine
    objectif: 'Développement de la force',
    entrainements: [entrainementsMock[2]],
    imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'prog3',
    nom: 'Perte de Poids',
    description: 'Programme combinant cardio et musculation pour maximiser la perte de graisse',
    niveau: 'débutant',
    duree: 6, // 6 semaines
    frequence: 5, // 5 séances par semaine
    objectif: 'Perte de poids',
    entrainements: [entrainementsMock[3]],
    imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'prog4',
    nom: 'Hypertrophie Avancée',
    description: 'Programme pour sportifs avancés cherchant à maximiser le développement musculaire',
    niveau: 'avancé',
    duree: 12, // 12 semaines
    frequence: 5, // 5 séances par semaine
    objectif: 'Développement musculaire',
    entrainements: [entrainementsMock[2], entrainementsMock[0]],
    imageUrl: 'https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
  }
];