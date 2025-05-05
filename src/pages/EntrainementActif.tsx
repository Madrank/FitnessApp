import React, { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Play, Pause, Check, X, ChevronRight, Timer, ChevronUp, ChevronDown } from 'lucide-react';

export function EntrainementActif() {
  const { theme } = useTheme();
  const { entrainementActif, terminerEntrainement, enregistrerSerie } = useWorkout();
  
  const [exerciceActifIndex, setExerciceActifIndex] = useState(0);
  const [serieActive, setSerieActive] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [entreExercices, setEntreExercices] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(60); // 60 secondes entre les exercices
  
  // Si aucun entraînement actif, rediriger vers le tableau de bord
  useEffect(() => {
    if (!entrainementActif) {
      window.location.pathname = '/';
    }
  }, [entrainementActif]);
  
  // Timer principal
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);
  
  // Timer de pause entre les exercices
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (entreExercices && pauseTimer > 0) {
      interval = setInterval(() => {
        setPauseTimer(prev => prev - 1);
      }, 1000);
    } else if (entreExercices && pauseTimer === 0) {
      setEntreExercices(false);
      setPauseTimer(60);
      setIsTimerRunning(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [entreExercices, pauseTimer]);
  
  if (!entrainementActif) {
    return <div className="py-8 text-center">Chargement de l'entraînement...</div>;
  }
  
  const exerciceActif = entrainementActif.exercices[exerciceActifIndex];
  const serieActuelle = exerciceActif?.series[serieActive];
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleCompleterSerie = () => {
    if (!exerciceActif) return;
    
    // Marquer la série comme complétée
    enregistrerSerie(
      entrainementActif.id,
      exerciceActif.id,
      serieActive,
      { complete: true }
    );
    
    // Passer à la série suivante si disponible
    if (serieActive < exerciceActif.series.length - 1) {
      setSerieActive(prev => prev + 1);
    } else {
      // Toutes les séries de cet exercice sont terminées
      if (exerciceActifIndex < entrainementActif.exercices.length - 1) {
        // Passer à l'exercice suivant après une pause
        setIsTimerRunning(false);
        setEntreExercices(true);
        setExerciceActifIndex(prev => prev + 1);
        setSerieActive(0);
      } else {
        // L'entraînement est terminé
        terminerEntrainement(entrainementActif.id, Math.round(timer / 60));
        window.location.pathname = '/';
      }
    }
  };
  
  const handleSauterSerie = () => {
    if (!exerciceActif) return;
    
    // Passer à la série suivante si disponible
    if (serieActive < exerciceActif.series.length - 1) {
      setSerieActive(prev => prev + 1);
    } else {
      // Toutes les séries de cet exercice sont terminées
      if (exerciceActifIndex < entrainementActif.exercices.length - 1) {
        // Passer à l'exercice suivant
        setExerciceActifIndex(prev => prev + 1);
        setSerieActive(0);
      } else {
        // L'entraînement est terminé
        terminerEntrainement(entrainementActif.id, Math.round(timer / 60));
        window.location.pathname = '/';
      }
    }
  };
  
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  
  const handleTerminerEntrainement = () => {
    terminerEntrainement(entrainementActif.id, Math.round(timer / 60));
    window.location.pathname = '/';
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => handleTerminerEntrainement()}
        >
          <ArrowLeft size={16} />
          Quitter
        </button>
        <h1 className="text-2xl font-bold">{entrainementActif.nom}</h1>
        <button
          className={`p-2 rounded-lg ${
            isTimerRunning
              ? theme === 'dark' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-red-600 hover:bg-red-700'
              : theme === 'dark'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-green-600 hover:bg-green-700'
          } text-white transition-colors`}
          onClick={toggleTimer}
        >
          {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      
      {/* Timer */}
      <div className={`p-6 rounded-lg text-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-md mb-4`}>
        <div className="flex items-center justify-center gap-2">
          <Timer size={24} className="text-blue-600 dark:text-blue-400" />
          <span className="text-4xl font-bold font-mono">{formatTime(timer)}</span>
        </div>
      </div>
      
      {entreExercices ? (
        /* Pause entre les exercices */
        <div className={`p-8 rounded-lg text-center ${
          theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
        } border ${
          theme === 'dark' ? 'border-blue-800/50' : 'border-blue-100'
        }`}>
          <h2 className="text-2xl font-bold mb-2">Pause</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Préparez-vous pour le prochain exercice...
          </p>
          <div className="text-5xl font-bold font-mono mb-6">{pauseTimer}</div>
          <div className="flex justify-center gap-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
              onClick={() => {
                setEntreExercices(false);
                setPauseTimer(60);
                setIsTimerRunning(true);
              }}
            >
              Passer la pause
            </button>
          </div>
        </div>
      ) : (
        /* Exercice actif */
        <div className={`rounded-lg overflow-hidden shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          {exerciceActif && (
            <>
              <img 
                src={exerciceActif.exercice.imageUrl}
                alt={exerciceActif.exercice.nom}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{exerciceActif.exercice.nom}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {exerciceActif.exercice.description}
                </p>
                
                {/* Série active */}
                <div className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                } mb-6`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Série {serieActive + 1} / {exerciceActif.series.length}</h3>
                    <div className="flex gap-2">
                      <button
                        className={`p-2 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gray-600 hover:bg-gray-500' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        } transition-colors`}
                        onClick={() => serieActive > 0 && setSerieActive(prev => prev - 1)}
                        disabled={serieActive === 0}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        className={`p-2 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gray-600 hover:bg-gray-500' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        } transition-colors`}
                        onClick={() => 
                          serieActive < exerciceActif.series.length - 1 && 
                          setSerieActive(prev => prev + 1)
                        }
                        disabled={serieActive === exerciceActif.series.length - 1}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {serieActuelle.poids !== undefined && (
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400 block">Poids</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            value={serieActuelle.poids}
                            onChange={(e) => enregistrerSerie(
                              entrainementActif.id,
                              exerciceActif.id,
                              serieActive,
                              { poids: parseInt(e.target.value) }
                            )}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              theme === 'dark' 
                                ? 'border-gray-600 bg-gray-600 text-white' 
                                : 'border-gray-300 bg-white text-gray-900'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <span className="ml-2">kg</span>
                        </div>
                      </div>
                    )}
                    
                    {serieActuelle.repetitions !== undefined && (
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400 block">Répétitions</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            value={serieActuelle.repetitions}
                            onChange={(e) => enregistrerSerie(
                              entrainementActif.id,
                              exerciceActif.id,
                              serieActive,
                              { repetitions: parseInt(e.target.value) }
                            )}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              theme === 'dark' 
                                ? 'border-gray-600 bg-gray-600 text-white' 
                                : 'border-gray-300 bg-white text-gray-900'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <span className="ml-2">reps</span>
                        </div>
                      </div>
                    )}
                    
                    {serieActuelle.duree !== undefined && (
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400 block">Durée</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            value={Math.floor(serieActuelle.duree / 60)}
                            onChange={(e) => enregistrerSerie(
                              entrainementActif.id,
                              exerciceActif.id,
                              serieActive,
                              { duree: parseInt(e.target.value) * 60 }
                            )}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              theme === 'dark' 
                                ? 'border-gray-600 bg-gray-600 text-white' 
                                : 'border-gray-300 bg-white text-gray-900'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <span className="ml-2">min</span>
                        </div>
                      </div>
                    )}
                    
                    {serieActuelle.distance !== undefined && (
                      <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400 block">Distance</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            value={serieActuelle.distance}
                            onChange={(e) => enregistrerSerie(
                              entrainementActif.id,
                              exerciceActif.id,
                              serieActive,
                              { distance: parseInt(e.target.value) }
                            )}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              theme === 'dark' 
                                ? 'border-gray-600 bg-gray-600 text-white' 
                                : 'border-gray-300 bg-white text-gray-900'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <span className="ml-2">m</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                          : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                      } transition-colors flex items-center gap-2`}
                      onClick={handleSauterSerie}
                    >
                      <X size={16} />
                      Sauter
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        theme === 'dark' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-green-600 hover:bg-green-700'
                      } text-white transition-colors flex items-center gap-2`}
                      onClick={handleCompleterSerie}
                    >
                      <Check size={16} />
                      Compléter
                    </button>
                  </div>
                </div>
                
                {/* Instructions */}
                <div className={`mb-6 ${serieActuelle.complete ? 'opacity-50' : ''}`}>
                  <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    {exerciceActif.exercice.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300">{instruction}</li>
                    ))}
                  </ol>
                </div>
                
                {/* Suivi de progression */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Progression</h3>
                  <div className="flex gap-1">
                    {exerciceActif.series.map((serie, idx) => (
                      <div
                        key={idx}
                        className={`h-2 flex-1 rounded-full ${
                          serie.complete
                            ? 'bg-green-500'
                            : idx === serieActive
                              ? 'bg-blue-500 animate-pulse'
                              : theme === 'dark'
                                ? 'bg-gray-600'
                                : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Navigation entre exercices */}
      {!entreExercices && (
        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}>
          <h3 className="text-lg font-semibold mb-3">Exercices ({exerciceActifIndex + 1} / {entrainementActif.exercices.length})</h3>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {entrainementActif.exercices.map((ex, idx) => (
              <div 
                key={ex.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${
                  idx === exerciceActifIndex
                    ? theme === 'dark'
                      ? 'bg-blue-900/30 border border-blue-800/50'
                      : 'bg-blue-100 border border-blue-200'
                    : theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setExerciceActifIndex(idx);
                  setSerieActive(0);
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  ex.series.every(s => s.complete)
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : idx < exerciceActifIndex
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : idx === exerciceActifIndex
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-grow">
                  <h4 className={`font-medium ${
                    idx === exerciceActifIndex
                      ? 'text-blue-700 dark:text-blue-400'
                      : ''
                  }`}>{ex.exercice.nom}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{ex.series.length} séries</span>
                    <span>•</span>
                    <span>{ex.series.filter(s => s.complete).length} complétées</span>
                  </div>
                </div>
                {idx === exerciceActifIndex && (
                  <ChevronRight size={16} className="text-blue-600 dark:text-blue-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}