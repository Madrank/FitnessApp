import React from 'react';
import { Dashboard } from '../pages/Dashboard';
import { Exercices } from '../pages/Exercices';
import { ExerciceDetail } from '../pages/ExerciceDetail';
import { Programmes } from '../pages/Programmes';
import { ProgrammeDetail } from '../pages/ProgrammeDetail';
import { Objectifs } from '../pages/Objectifs';
import { Profil } from '../pages/Profil';
import { EntrainementActif } from '../pages/EntrainementActif';

export function AppRouter() {
  // Logique simplifiée de routage - dans une application réelle, utilisez React Router
  const path = window.location.pathname;
  
  // Extraire l'ID à partir de l'URL pour les pages de détail
  const getIdFromPath = (path: string, base: string) => {
    if (path.startsWith(base) && path.length > base.length) {
      return path.substring(base.length + 1); // +1 pour le slash
    }
    return null;
  };
  
  const exerciceId = getIdFromPath(path, '/exercices');
  const programmeId = getIdFromPath(path, '/programmes');
  
  // Logique de routage simplifiée
  if (path === '/' || path === '/dashboard') {
    return <Dashboard />;
  } else if (path === '/exercices') {
    return <Exercices />;
  } else if (path.startsWith('/exercices/') && exerciceId) {
    return <ExerciceDetail id={exerciceId} />;
  } else if (path === '/programmes') {
    return <Programmes />;
  } else if (path.startsWith('/programmes/') && programmeId) {
    return <ProgrammeDetail id={programmeId} />;
  } else if (path === '/objectifs') {
    return <Objectifs />;
  } else if (path === '/profil') {
    return <Profil />;
  } else if (path === '/entrainement-actif') {
    return <EntrainementActif />;
  } else {
    // Page 404 ou redirection vers Dashboard comme solution par défaut
    return <Dashboard />;
  }
}