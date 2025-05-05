import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Plus, ChevronRight, Clock, Dumbbell, Target } from 'lucide-react';

type ExerciceDetailProps = {
  id: string;
};

export function ExerciceDetail({ id }: ExerciceDetailProps) {
  const { theme } = useTheme();
  const { getExercice, categories } = useWorkout();
  
  const exercice = getExercice(id);
  const categorie = categories.find(c => c.id === exercice?.categorieId);
  
  if (!exercice) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Exercice non trouvé.</p>
        <button
          className="mt-4 text-blue-600 flex items-center gap-2 mx-auto"
          onClick={() => window.location.pathname = '/exercices'}
        >
          <ArrowLeft size={16} />
          Retourner à la liste des exercices
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Bouton retour */}
      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
        onClick={() => window.location.pathname = '/exercices'}
      >
        <ArrowLeft size={16} />
        Retour aux exercices
      </button>
      
      {/* En-tête de l'exercice */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img 
            src={exercice.imageUrl}
            alt={exercice.nom}
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>
        
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{exercice.nom}</h1>
          
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              exercice.difficulte === 'facile'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : exercice.difficulte === 'moyen'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {exercice.difficulte}
            </span>
            
            {categorie && (
              <span className={`px-3 py-1 rounded-full text-sm ${
                theme === 'dark' 
                  ? 'bg-blue-900 text-blue-200' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {categorie.nom}
              </span>
            )}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">
            {exercice.description}
          </p>
          
          <div className="pt-2">
            <h3 className="text-lg font-medium mb-2">Muscles travaillés</h3>
            <div className="flex flex-wrap gap-2">
              {exercice.muscles.map((muscle, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
          
          <div className="pt-2">
            <h3 className="text-lg font-medium mb-2">Équipement nécessaire</h3>
            <div className="flex flex-wrap gap-2">
              {exercice.equipement.map((equipment, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {equipment}
                </span>
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex flex-wrap gap-2">
            <button className={`px-4 py-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white flex items-center gap-2 transition-colors`}>
              <Plus size={16} />
              Ajouter à l'entraînement
            </button>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className={`mt-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ol className="space-y-4">
          {exercice.instructions.map((instruction, index) => (
            <li key={index} className="flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                theme === 'dark' 
                  ? 'bg-blue-900 text-blue-200' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">{instruction}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Vidéo éducative (si disponible) */}
      {exercice.videoUrl && (
        <div className={`mt-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <h2 className="text-2xl font-bold mb-4">Vidéo de démonstration</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src={exercice.videoUrl} 
              title={`Démonstration de ${exercice.nom}`}
              className="w-full rounded-lg"
              style={{ height: '400px' }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      
      {/* Exercices similaires */}
      <div className={`mt-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Exercices similaires</h2>
          <button 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
            onClick={() => window.location.pathname = '/exercices'}
          >
            Voir tous <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ici, nous devrions filtrer des exercices similaires, mais nous utilisons des exemples statiques */}
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'border-gray-700 hover:bg-gray-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors cursor-pointer`}
            >
              <h3 className="font-medium">Exercice similaire {index + 1}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Description courte de l'exercice similaire.
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Conseils d'expert */}
      <div className={`mt-8 p-6 rounded-lg ${
        theme === 'dark' 
          ? 'bg-blue-900/20 border border-blue-800' 
          : 'bg-blue-50 border border-blue-100'
      }`}>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Target size={20} className="text-blue-600 dark:text-blue-400" />
          Conseils d'expert
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Pour maximiser les bénéfices de cet exercice, concentrez-vous sur la connexion musculaire plutôt que sur le poids soulevé. Utilisez une technique stricte et contrôlez le mouvement tout au long de l'exercice.
        </p>
      </div>
    </div>
  );
}