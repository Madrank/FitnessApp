import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useTheme } from '../context/ThemeContext';
import { Target, Calendar, Plus, Edit, Trash2 } from 'lucide-react';

export function Objectifs() {
  const { theme } = useTheme();
  const { objectifs, mettreAJourProgresObjectif } = useWorkout();
  const [nouvelObjectif, setNouvelObjectif] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const getJoursRestants = (dateFin: Date) => {
    const aujourdHui = new Date();
    const fin = new Date(dateFin);
    const diffTemps = fin.getTime() - aujourdHui.getTime();
    const diffJours = Math.ceil(diffTemps / (1000 * 3600 * 24));
    
    return diffJours > 0 ? diffJours : 0;
  };
  
  const handleUpdateProgress = (id: string, newProgress: number) => {
    // Nous nous assurons que la valeur est entre 0 et 100
    const progress = Math.max(0, Math.min(100, newProgress));
    mettreAJourProgresObjectif(id, progress);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mes Objectifs</h1>
        <button 
          className={`px-4 py-2 rounded-lg ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white flex items-center gap-2 transition-colors`}
          onClick={() => setNouvelObjectif(true)}
        >
          <Plus size={16} />
          Nouvel objectif
        </button>
      </div>
      
      {/* Introduction aux objectifs */}
      <div className={`p-6 rounded-lg ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30' 
          : 'bg-gradient-to-br from-blue-50 to-purple-50'
      } shadow-md mb-8`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target className="text-blue-600 dark:text-blue-400" size={24} />
              Définissez vos objectifs pour rester motivé
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Fixer des objectifs clairs est la première étape vers le succès de votre parcours fitness. 
              Qu'il s'agisse de perdre du poids, de gagner en force ou d'améliorer votre endurance, 
              suivez vos progrès et restez motivé.
            </p>
          </div>
          <div className="md:w-1/3 hidden md:block">
            <img 
              src="https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Objectifs de fitness" 
              className="w-full h-44 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      
      {/* Liste des objectifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {objectifs.map(objectif => (
          <div 
            key={objectif.id}
            className={`rounded-lg overflow-hidden shadow-md ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className={`h-2 ${
              objectif.type === 'poids' 
                ? 'bg-green-500'
                : objectif.type === 'force' 
                  ? 'bg-blue-500'
                  : objectif.type === 'endurance'
                    ? 'bg-yellow-500'
                    : 'bg-purple-500'
            }`}></div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    objectif.type === 'poids' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : objectif.type === 'force' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : objectif.type === 'endurance'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {objectif.type}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Edit size={16} className="text-gray-500" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Trash2 size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{objectif.titre}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {objectif.description}
              </p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Progression</span>
                  <span className="text-sm font-medium">{Math.round(objectif.progres)}%</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 mb-1">
                  <div 
                    className={`h-2.5 rounded-full ${
                      objectif.type === 'poids' 
                        ? 'bg-green-500'
                        : objectif.type === 'force' 
                          ? 'bg-blue-500'
                          : objectif.type === 'endurance'
                            ? 'bg-yellow-500'
                            : 'bg-purple-500'
                    }`}
                    style={{ width: `${objectif.progres}%` }}
                  ></div>
                </div>
                <div className="flex justify-end">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={objectif.progres} 
                    onChange={(e) => handleUpdateProgress(objectif.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {objectif.valeurCible && (
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <Target size={14} />
                  <span>Objectif: {objectif.valeurCible} {objectif.unité}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(objectif.dateDebut)} - {formatDate(objectif.dateFin)}</span>
                </div>
                <span>{getJoursRestants(objectif.dateFin)} jours restants</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carte pour ajouter un objectif */}
        <div 
          className={`rounded-lg border-2 border-dashed ${
            theme === 'dark' 
              ? 'border-gray-700 hover:border-blue-600' 
              : 'border-gray-300 hover:border-blue-500'
          } transition-colors cursor-pointer min-h-[15rem] flex items-center justify-center`}
          onClick={() => setNouvelObjectif(true)}
        >
          <div className="text-center p-6">
            <div className="flex justify-center mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-blue-900/20 text-blue-400' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                <Plus size={24} />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-1">Ajouter un objectif</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Définissez un nouvel objectif pour suivre votre progression
            </p>
          </div>
        </div>
      </div>
      
      {/* Modale pour ajouter un nouvel objectif */}
      {nouvelObjectif && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl max-w-md w-full ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Nouvel Objectif</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Perdre 5kg" 
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark' 
                        ? 'border-gray-700 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    placeholder="Décrivez votre objectif" 
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark' 
                        ? 'border-gray-700 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select 
                      className={`w-full px-3 py-2 rounded-lg border ${
                        theme === 'dark' 
                          ? 'border-gray-700 bg-gray-700 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="poids">Poids</option>
                      <option value="force">Force</option>
                      <option value="endurance">Endurance</option>
                      <option value="habitude">Habitude</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Valeur cible</label>
                    <div className="flex">
                      <input 
                        type="number" 
                        placeholder="Ex: 5" 
                        className={`w-2/3 px-3 py-2 rounded-l-lg border ${
                          theme === 'dark' 
                            ? 'border-gray-700 bg-gray-700 text-white' 
                            : 'border-gray-300 bg-white text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <select 
                        className={`w-1/3 px-2 py-2 rounded-r-lg border-t border-r border-b ${
                          theme === 'dark' 
                            ? 'border-gray-700 bg-gray-700 text-white' 
                            : 'border-gray-300 bg-white text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="kg">kg</option>
                        <option value="km">km</option>
                        <option value="min">min</option>
                        <option value="rep">rep</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date de début</label>
                    <input 
                      type="date" 
                      className={`w-full px-3 py-2 rounded-lg border ${
                        theme === 'dark' 
                          ? 'border-gray-700 bg-gray-700 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Date de fin</label>
                    <input 
                      type="date" 
                      className={`w-full px-3 py-2 rounded-lg border ${
                        theme === 'dark' 
                          ? 'border-gray-700 bg-gray-700 text-white' 
                          : 'border-gray-300 bg-white text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button"
                    className={`px-4 py-2 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    } transition-colors`}
                    onClick={() => setNouvelObjectif(false)}
                  >
                    Annuler
                  </button>
                  <button 
                    type="button"
                    className={`px-4 py-2 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}
                    onClick={() => setNouvelObjectif(false)}
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}