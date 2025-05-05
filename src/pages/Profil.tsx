import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { User, Settings, LogOut, Edit2, Camera, Award } from 'lucide-react';

export function Profil() {
  const { theme } = useTheme();
  const { user, login, logout, updateUserProfile } = useUser();
  const [editing, setEditing] = useState(false);
  
  // Pour la démonstration, on crée un utilisateur fictif si aucun n'est connecté
  React.useEffect(() => {
    if (!user) {
      login({
        id: 'user1',
        nom: 'Thomas Dubois',
        email: 'thomas.dubois@example.com',
        niveau: 'intermédiaire',
        poids: 78,
        taille: 180,
        age: 32,
        objectifPrincipal: 'Prise de masse musculaire',
        dateInscription: new Date(2023, 9, 15),
        photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
      });
    }
  }, [user, login]);
  
  if (!user) {
    return <div className="py-8 text-center">Chargement du profil...</div>;
  }
  
  // Calcul de l'IMC
  const calculateIMC = () => {
    if (user.poids && user.taille) {
      const tailleEnMetres = user.taille / 100;
      return (user.poids / (tailleEnMetres * tailleEnMetres)).toFixed(1);
    }
    return null;
  };
  
  // Classification de l'IMC
  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: 'Sous-poids', color: 'text-yellow-500' };
    if (imc < 25) return { label: 'Normal', color: 'text-green-500' };
    if (imc < 30) return { label: 'Surpoids', color: 'text-orange-500' };
    return { label: 'Obésité', color: 'text-red-500' };
  };
  
  const imc = calculateIMC();
  const imcCategory = imc ? getIMCCategory(parseFloat(imc)) : null;
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
      
      {/* En-tête du profil */}
      <div className={`rounded-lg shadow-md overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`h-40 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} relative`}>
          <div className="absolute -bottom-20 left-8">
            <div className="relative">
              <img 
                src={user.photo || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                alt={user.nom} 
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
              />
              <button className={`absolute bottom-0 right-0 p-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'bg-white text-blue-600'
              } shadow-md`}>
                <Camera size={16} />
              </button>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className={`p-2 rounded-full ${
              theme === 'dark' 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-md transition-colors`}>
              <Settings size={18} />
            </button>
            <button 
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-md transition-colors`}
              onClick={() => logout()}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
        
        <div className="pt-24 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{user.nom}</h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <button 
              className={`p-2 rounded-lg flex items-center gap-2 ${
                editing
                  ? theme === 'dark' 
                    ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' 
                    : 'bg-gray-200 text-blue-600 hover:bg-gray-300'
                  : theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors`}
              onClick={() => setEditing(!editing)}
            >
              {editing ? 'Sauvegarder' : <><Edit2 size={16} /> Modifier</>}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Niveau</h3>
              <div className={`flex items-center gap-2 ${
                user.niveau === 'débutant'
                  ? 'text-green-500'
                  : user.niveau === 'intermédiaire'
                    ? 'text-yellow-500'
                    : 'text-red-500'
              }`}>
                <Award size={16} />
                <span className="capitalize font-medium">{user.niveau}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Membre depuis</h3>
              <p className="font-medium">{new Date(user.dateInscription).toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Objectif principal</h3>
              <p className="font-medium">{user.objectifPrincipal || 'Non défini'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Informations personnelles */}
      <div className={`rounded-lg shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
        
        {editing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input 
                type="text" 
                value={user.nom}
                onChange={(e) => updateUserProfile({ nom: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                value={user.email}
                onChange={(e) => updateUserProfile({ email: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Âge</label>
              <input 
                type="number" 
                value={user.age || ''}
                onChange={(e) => updateUserProfile({ age: parseInt(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Niveau</label>
              <select 
                value={user.niveau}
                onChange={(e) => updateUserProfile({ niveau: e.target.value as any })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="débutant">Débutant</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="avancé">Avancé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Poids (kg)</label>
              <input 
                type="number" 
                value={user.poids || ''}
                onChange={(e) => updateUserProfile({ poids: parseInt(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Taille (cm)</label>
              <input 
                type="number" 
                value={user.taille || ''}
                onChange={(e) => updateUserProfile({ taille: parseInt(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Objectif principal</label>
              <select 
                value={user.objectifPrincipal || ''}
                onChange={(e) => updateUserProfile({ objectifPrincipal: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'border-gray-700 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Sélectionnez un objectif</option>
                <option value="Perte de poids">Perte de poids</option>
                <option value="Prise de masse musculaire">Prise de masse musculaire</option>
                <option value="Amélioration de l'endurance">Amélioration de l'endurance</option>
                <option value="Maintien de la forme">Maintien de la forme</option>
                <option value="Réhabilitation">Réhabilitation</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Âge</h3>
              <p className="font-medium">{user.age || 'Non renseigné'} ans</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Poids</h3>
              <p className="font-medium">{user.poids || 'Non renseigné'} kg</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Taille</h3>
              <p className="font-medium">{user.taille || 'Non renseigné'} cm</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">IMC</h3>
              {imc ? (
                <p className="font-medium flex items-center gap-2">
                  {imc} 
                  <span className={`text-sm ${imcCategory?.color}`}>
                    ({imcCategory?.label})
                  </span>
                </p>
              ) : (
                <p className="text-gray-500">Complétez votre poids et votre taille</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Récompenses et badges */}
      <div className={`rounded-lg shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Mes récompenses</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Badges d'exemple */}
          {['Premier entraînement', '5 entraînements', '10 entraînements', 'Premier objectif'].map((badge, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
              }`}>
                <Award size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-center font-medium">{badge}</p>
            </div>
          ))}
          
          {/* Badges verrouillés */}
          {['25 entraînements', '50 entraînements', 'Premier programme', '5 objectifs atteints'].map((badge, index) => (
            <div key={index} className="flex flex-col items-center opacity-50">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700' 
                  : 'bg-gray-200'
              }`}>
                <Award size={32} className="text-gray-500" />
              </div>
              <p className="text-sm text-center font-medium">{badge}</p>
              <p className="text-xs text-gray-500">Verrouillé</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Préférences */}
      <div className={`rounded-lg shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-4">Préférences</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir des rappels d'entraînement</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Mode sombre</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Changer l'apparence de l'application</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={theme === 'dark'}
                onChange={() => {}} // Le changement est géré par le ThemeProvider
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Unités métriques</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Utiliser kg, cm au lieu de lb, inch</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}