import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} FitnessApp. Tous droits réservés.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:underline">Confidentialité</a>
            <a href="#" className="text-sm hover:underline">Conditions d'utilisation</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}