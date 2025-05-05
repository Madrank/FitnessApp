import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Calendar, Clock, Dumbbell, Target, CheckCircle, Play } from 'lucide-react';

type ProgrammeDetailProps = {
  id: string;
};

export function ProgrammeDetail({ id }: ProgrammeDetailProps) {
  const { theme } = useTheme();
  const { getProgramme, demarrerEntrainement } = useWorkout();
  
  const programme = getProgramme(id);
  
  if (!programme) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Programme non trouvé.</p>
        <button
          className="mt-4 text-blue-600 flex items-center gap-2 mx-auto"
          onClick={() => window.location.pathname = '/programmes'}
        >
          <ArrowLeft size={16} />
          Retourner à la liste des programmes
        </button>
      </div>
    );
  }
  
  const handleStartWorkout = (entrainementIndex: number) => {
    if (entrainementIndex < programme.entrainements.length) {
      const entrainement = programme.entrainements[entrainementIndex];
      demarrerEntrainement(entrainement);
      window.location.pathname = '/entrainement-actif';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Bouton retour */}
      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        onClick={() => window.location.pathname = '/programmes'}
      >
        <ArrowLeft size={16} />
        Retour aux programmes
      </button>
      
      {/* En-tête du programme */}
      <div className="relative">
        <img 
          src={programme.imageUrl}
          alt={programme.nom}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              programme.niveau === 'débutant'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : programme.niveau === 'intermédiaire'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {programme.niveau}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              theme === 'dark' 
                ? 'bg-blue-900/70 text-blue-200' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {programme.objectif}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">{programme.nom}</h1>
        </div>
      </div>
      
      {/* Informations du programme */}
      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-900/30 text-blue-400' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Durée</p>
              <p className="font-semibold">{programme.duree} semaines</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-purple-900/30 text-purple-400' 
                : 'bg-purple-100 text-purple-600'
            }`}>
              <Dumbbell size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fréquence</p>
              <p className="font-semibold">{programme.frequence} séances / semaine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-orange-900/30 text-orange-400' 
                : 'bg-orange-100 text-orange-600'
            }`}>
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Durée par séance</p>
              <p className="font-semibold">~45-60 minutes</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-gray-700 dark:text-gray-300">{programme.description}</p>
          
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'dark' 
              ? 'bg-blue-900/20 border border-blue-800/50' 
              : 'bg-blue-50 border border-blue-100'
          }`}>
            <div className="flex items-start gap-3">
              <Target className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" size={20} />
              <div>
                <h3 className="font-medium">Objectif principal</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{programme.objectif}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Entraînements du programme */}
      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h2 className="text-xl font-semibold mb-4">Entraînements du programme</h2>
        
        <div className="space-y-4">
          {programme.entrainements.map((entrainement, index) => (
            <div 
              key={entrainement.id}
              className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'border-gray-700 hover:bg-gray-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-blue-900/30 text-blue-400' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{entrainement.nom}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {entrainement.duree} min • {entrainement.exercices.length} exercices
                    </p>
                  </div>
                </div>
                
                <button
                  className={`px-3 py-1 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white flex items-center gap-1 transition-colors`}
                  onClick={() => handleStartWorkout(index)}
                >
                  <Play size={16} />
                  Démarrer
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {entrainement.exercices.map(exEntrainement => (
                  <div 
                    key={exEntrainement.id}
                    className={`flex items-center gap-2 p-2 rounded ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-gray-200' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm truncate">{exEntrainement.exercice.nom}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {exEntrainement.series.length} séries
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bouton pour démarrer le programme */}
      <div className="mt-8 flex justify-center">
        <button className={`px-6 py-3 rounded-lg ${
          theme === 'dark' 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-semibold transition-colors`}>
          Suivre ce programme
        </button>
      </div>
    </div>
  );
}