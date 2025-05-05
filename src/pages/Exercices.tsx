import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter } from 'lucide-react';

export function Exercices() {
  const { theme } = useTheme();
  const { exercices, categories } = useWorkout();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Filtrer les exercices en fonction des critères
  const filteredExercices = exercices.filter(exercice => {
    const matchesSearch = exercice.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        exercice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? exercice.categorieId === selectedCategory : true;
    const matchesDifficulty = selectedDifficulty ? exercice.difficulte === selectedDifficulty : true;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Bibliothèque d'Exercices</h1>
      
      {/* Barre de recherche et filtres */}
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow mb-6`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Recherche */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-gray-700 text-white' 
                  : 'border-gray-300 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className={`pl-4 pr-8 py-2 rounded-lg border appearance-none ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.nom}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter size={16} className="text-gray-500" />
              </div>
            </div>
            
            <div className="relative">
              <select
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                className={`pl-4 pr-8 py-2 rounded-lg border appearance-none ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Tous les niveaux</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Catégories d'exercices */}
      {!selectedCategory && !searchTerm && !selectedDifficulty && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map(category => (
            <div
              key={category.id}
              className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer transform transition hover:scale-105`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <img 
                src={category.imageUrl} 
                alt={category.nom} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white">{category.nom}</h3>
                <p className="text-sm text-gray-200">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Liste des exercices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercices.length > 0 ? (
          filteredExercices.map(exercice => (
            <div
              key={exercice.id}
              className={`rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg cursor-pointer ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={() => window.location.pathname = `/exercices/${exercice.id}`}
            >
              <img 
                src={exercice.imageUrl}
                alt={exercice.nom}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{exercice.nom}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    exercice.difficulte === 'facile'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : exercice.difficulte === 'moyen'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {exercice.difficulte}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                  {exercice.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {exercice.muscles.slice(0, 3).map((muscle, index) => (
                    <span 
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {muscle}
                    </span>
                  ))}
                  {exercice.muscles.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
                      +{exercice.muscles.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500">
            <p>Aucun exercice ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}