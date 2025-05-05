import React, { createContext, useContext, useState, useEffect } from 'react';
import { Entrainement, Exercice, Programme, Objectif, Categorie } from '../types/workout';

// Données mockées pour démonstration
import { exercicesMock } from '../data/exercicesMock';
import { categoriesMock } from '../data/categoriesMock';
import { programmesMock } from '../data/programmesMock';
import { entrainementsMock } from '../data/entrainementsMock';
import { objectifsMock } from '../data/objectifsMock';

type WorkoutContextType = {
  exercices: Exercice[];
  categories: Categorie[];
  programmes: Programme[];
  entrainements: Entrainement[];
  objectifs: Objectif[];
  entrainementActif: Entrainement | null;
  
  // Gestion des exercices
  getExercice: (id: string) => Exercice | undefined;
  getExercicesByCategorie: (categorieId: string) => Exercice[];
  ajouterExercice: (exercice: Exercice) => void;
  
  // Gestion des entraînements
  demarrerEntrainement: (entrainement: Entrainement) => void;
  terminerEntrainement: (entrainementId: string, duree: number) => void;
  enregistrerSerie: (entrainementId: string, exerciceId: string, serieIndex: number, serie: Partial<Serie>) => void;
  ajouterEntrainement: (entrainement: Entrainement) => void;
  
  // Gestion des programmes
  getProgramme: (id: string) => Programme | undefined;
  ajouterProgramme: (programme: Programme) => void;
  
  // Gestion des objectifs
  getObjectif: (id: string) => Objectif | undefined;
  mettreAJourProgresObjectif: (id: string, progres: number) => void;
  ajouterObjectif: (objectif: Objectif) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [exercices, setExercices] = useState<Exercice[]>(exercicesMock);
  const [categories, setCategories] = useState<Categorie[]>(categoriesMock);
  const [programmes, setProgrammes] = useState<Programme[]>(programmesMock);
  const [entrainements, setEntrainements] = useState<Entrainement[]>(entrainementsMock);
  const [objectifs, setObjectifs] = useState<Objectif[]>(objectifsMock);
  const [entrainementActif, setEntrainementActif] = useState<Entrainement | null>(null);

  useEffect(() => {
    // Dans une application réelle, nous chargerions les données depuis une API ou base de données
    console.log('Données de workout chargées');
  }, []);

  // Fonctions de gestion des exercices
  const getExercice = (id: string) => exercices.find(ex => ex.id === id);
  
  const getExercicesByCategorie = (categorieId: string) => 
    exercices.filter(ex => ex.categorieId === categorieId);
  
  const ajouterExercice = (exercice: Exercice) => {
    setExercices(prev => [...prev, exercice]);
  };

  // Fonctions de gestion des entraînements
  const demarrerEntrainement = (entrainement: Entrainement) => {
    setEntrainementActif(entrainement);
  };

  const terminerEntrainement = (entrainementId: string, duree: number) => {
    setEntrainements(prev => prev.map(e => 
      e.id === entrainementId 
        ? { ...e, complete: true, duree } 
        : e
    ));
    setEntrainementActif(null);
  };

  const enregistrerSerie = (entrainementId: string, exerciceId: string, serieIndex: number, serieUpdate: Partial<Serie>) => {
    setEntrainements(prev => prev.map(entrainement => {
      if (entrainement.id !== entrainementId) return entrainement;
      
      return {
        ...entrainement,
        exercices: entrainement.exercices.map(ex => {
          if (ex.id !== exerciceId) return ex;
          
          return {
            ...ex,
            series: ex.series.map((serie, index) => 
              index === serieIndex ? { ...serie, ...serieUpdate } : serie
            )
          };
        })
      };
    }));

    // Mettre également à jour l'entrainement actif si nécessaire
    if (entrainementActif && entrainementActif.id === entrainementId) {
      setEntrainementActif(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          exercices: prev.exercices.map(ex => {
            if (ex.id !== exerciceId) return ex;
            
            return {
              ...ex,
              series: ex.series.map((serie, index) => 
                index === serieIndex ? { ...serie, ...serieUpdate } : serie
              )
            };
          })
        };
      });
    }
  };

  const ajouterEntrainement = (entrainement: Entrainement) => {
    setEntrainements(prev => [...prev, entrainement]);
  };

  // Fonctions de gestion des programmes
  const getProgramme = (id: string) => programmes.find(p => p.id === id);
  
  const ajouterProgramme = (programme: Programme) => {
    setProgrammes(prev => [...prev, programme]);
  };
  
  // Fonctions de gestion des objectifs
  const getObjectif = (id: string) => objectifs.find(o => o.id === id);
  
  const mettreAJourProgresObjectif = (id: string, progres: number) => {
    setObjectifs(prev => prev.map(o => 
      o.id === id 
        ? { 
            ...o, 
            progres, 
            complete: progres >= 100 
          } 
        : o
    ));
  };
  
  const ajouterObjectif = (objectif: Objectif) => {
    setObjectifs(prev => [...prev, objectif]);
  };

  return (
    <WorkoutContext.Provider value={{
      exercices,
      categories,
      programmes,
      entrainements,
      objectifs,
      entrainementActif,
      getExercice,
      getExercicesByCategorie,
      ajouterExercice,
      demarrerEntrainement,
      terminerEntrainement,
      enregistrerSerie,
      ajouterEntrainement,
      getProgramme,
      ajouterProgramme,
      getObjectif,
      mettreAJourProgresObjectif,
      ajouterObjectif
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout doit être utilisé à l\'intérieur d\'un WorkoutProvider');
  }
  return context;
}

interface Serie {
  id: string;
  poids?: number;
  repetitions?: number;
  duree?: number;
  distance?: number;
  complete: boolean;
}