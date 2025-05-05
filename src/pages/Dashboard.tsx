import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useTheme } from '../context/ThemeContext';
import { Activity, Target, Dumbbell, Calendar } from 'lucide-react';

export function Dashboard() {
  const { theme } = useTheme();
  const { entrainements, objectifs, programmes } = useWorkout();
  
  // Calcul des statistiques pour le tableau de bord
  const entrainementsCompletes = entrainements.filter(e => e.complete).length;
  const objectifsEnCours = objectifs.filter(o => !o.complete).length;
  const progresObjectifs = objectifs.reduce((acc, obj) => acc + obj.progres, 0) / (objectifs.length || 1);
  
  // Derniers entraînements (3 maximum)
  const derniersEntrainements = [...entrainements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord</h1>
      
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Activity size={24} />} 
          title="Entraînements" 
          value={entrainementsCompletes.toString()} 
          subtitle="Séances complétées" 
          color="blue"
        />
        <StatCard 
          icon={<Target size={24} />} 
          title="Objectifs" 
          value={`${Math.round(progresObjectifs)}%`} 
          subtitle={`${objectifsEnCours} en cours`} 
          color="green"
        />
        <StatCard 
          icon={<Dumbbell size={24} />} 
          title="Programmes" 
          value={programmes.length.toString()} 
          subtitle="Disponibles" 
          color="purple"
        />
        <StatCard 
          icon={<Calendar size={24} />} 
          title="Streak" 
          value="5" 
          subtitle="jours consécutifs" 
          color="orange"
        />
      </div>
      
      {/* Derniers entraînements */}
      <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h2 className="text-xl font-semibold mb-4">Derniers Entraînements</h2>
        <div className="space-y-4">
          {derniersEntrainements.length > 0 ? (
            derniersEntrainements.map(entrainement => (
              <div 
                key={entrainement.id}
                className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                } transition-colors cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{entrainement.nom}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(entrainement.date).toLocaleDateString('fr-FR')} • {entrainement.duree} min
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    entrainement.complete
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {entrainement.complete ? 'Terminé' : 'En cours'}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {entrainement.exercices.length} exercices
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Aucun entraînement récent.</p>
          )}
        </div>
        <div className="mt-4">
          <button 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            onClick={() => window.location.pathname = '/entrainements'}
          >
            Voir tous les entraînements
          </button>
        </div>
      </div>
      
      {/* Suivi des objectifs */}
      <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h2 className="text-xl font-semibold mb-4">Mes Objectifs</h2>
        <div className="space-y-4">
          {objectifs.slice(0, 3).map(objectif => (
            <div key={objectif.id} className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{objectif.titre}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(objectif.progres)}%
                </span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${objectif.progres}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {objectif.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            onClick={() => window.location.pathname = '/objectifs'}
          >
            Gérer mes objectifs
          </button>
        </div>
      </div>
      
      {/* Programmes suggérés */}
      <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h2 className="text-xl font-semibold mb-4">Programmes Suggérés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programmes.slice(0, 2).map(programme => (
            <div 
              key={programme.id}
              className={`p-4 rounded-lg cursor-pointer border ${
                theme === 'dark' 
                  ? 'border-gray-700 hover:bg-gray-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors`}
              onClick={() => window.location.pathname = `/programmes/${programme.id}`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <img 
                    src={programme.imageUrl} 
                    alt={programme.nom} 
                    className="w-full h-28 object-cover rounded-md"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-medium mb-1">{programme.nom}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      programme.niveau === 'débutant'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : programme.niveau === 'intermédiaire'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {programme.niveau}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {programme.duree} semaines
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {programme.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            onClick={() => window.location.pathname = '/programmes'}
          >
            Voir tous les programmes
          </button>
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
};

function StatCard({ icon, title, value, subtitle, color }: StatCardProps) {
  const { theme } = useTheme();
  
  const getColorClasses = () => {
    const baseClass = theme === 'dark' ? 'bg-opacity-20 text-opacity-90' : 'bg-opacity-15 text-opacity-90';
    
    switch (color) {
      case 'blue':
        return `${baseClass} bg-blue-500 text-blue-600 dark:text-blue-400`;
      case 'green':
        return `${baseClass} bg-green-500 text-green-600 dark:text-green-400`;
      case 'purple':
        return `${baseClass} bg-purple-500 text-purple-600 dark:text-purple-400`;
      case 'orange':
        return `${baseClass} bg-orange-500 text-orange-600 dark:text-orange-400`;
      default:
        return `${baseClass} bg-blue-500 text-blue-600 dark:text-blue-400`;
    }
  };
  
  return (
    <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded ${getColorClasses()}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">{title}</h3>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</span>
      </div>
    </div>
  );
}