import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useTheme } from '../context/ThemeContext';
import { Calendar, Dumbbell, Clock, ChevronRight } from 'lucide-react';

export function Programmes() {
  const { theme } = useTheme();
  const { programmes } = useWorkout();
  
  // Grouper les programmes par niveau
  const programmesByLevel: Record<string, typeof programmes> = {
    débutant: programmes.filter(p => p.niveau === 'débutant'),
    intermédiaire: programmes.filter(p => p.niveau === 'intermédiaire'),
    avancé: programmes.filter(p => p.niveau === 'avancé')
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Programmes d'Entraînement</h1>
      
      <div className={`p-6 rounded-lg ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40' 
          : 'bg-gradient-to-r from-blue-50 to-purple-50'
      } shadow-md mb-8`}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl font-bold">Trouvez le programme parfait pour atteindre vos objectifs</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Nos programmes sont conçus par des experts pour vous aider à progresser, quel que soit votre niveau. 
              Choisissez parmi une variété de programmes adaptés à vos objectifs spécifiques.
            </p>
            <div className="flex gap-2 pt-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                <Calendar size={14} /> Programmes structurés
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                <Dumbbell size={14} /> Exercices variés
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                <Clock size={14} /> Progression garantie
              </span>
            </div>
          </div>
          <div className="md:w-1/3 hidden md:block">
            <img 
              src="https://images.pexels.com/photos/4498547/pexels-photo-4498547.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Programme d'entraînement" 
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      
      {/* Programmes par niveau */}
      {Object.entries(programmesByLevel).map(([niveau, programmesNiveau]) => (
        programmesNiveau.length > 0 && (
          <div key={niveau} className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold capitalize">{niveau === 'débutant' ? 'Débutant' : niveau === 'intermédiaire' ? 'Intermédiaire' : 'Avancé'}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmesNiveau.map(programme => (
                <div
                  key={programme.id}
                  className={`rounded-lg overflow-hidden shadow-md transform transition hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                  onClick={() => window.location.pathname = `/programmes/${programme.id}`}
                >
                  <div className="relative">
                    <img 
                      src={programme.imageUrl}
                      alt={programme.nom}
                      className="w-full h-44 object-cover"
                    />
                    <div className={`absolute top-0 right-0 m-3 px-2 py-1 rounded text-xs font-semibold ${
                      programme.niveau === 'débutant'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : programme.niveau === 'intermédiaire'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {programme.niveau}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{programme.nom}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {programme.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{programme.duree} semaines</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell size={16} />
                        <span>{programme.frequence} séances/sem.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>~60 min/séance</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === 'dark' 
                          ? 'bg-blue-900/30 text-blue-200' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {programme.objectif}
                      </span>
                      <span className="text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1 text-sm">
                        Détails <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
      
      {/* Créer un programme personnalisé */}
      <div className={`p-6 rounded-lg border-2 border-dashed ${
        theme === 'dark' 
          ? 'border-gray-700 hover:border-blue-600' 
          : 'border-gray-300 hover:border-blue-500'
      } transition-colors cursor-pointer`}>
        <div className="flex flex-col items-center text-center py-8">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            theme === 'dark' 
              ? 'bg-blue-900/20 text-blue-400' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            <Dumbbell size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Créer un programme personnalisé</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            Vous ne trouvez pas ce qui vous convient ? Créez votre propre programme d'entraînement adapté à vos besoins spécifiques.
          </p>
        </div>
      </div>
    </div>
  );
}