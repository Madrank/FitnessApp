import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { NavLink } from './NavLink';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold text-blue-600">
              FitnessApp | sculptez votre corps
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/">Tableau de bord</NavLink>
            <NavLink to="/exercices">Exercices</NavLink>
            <NavLink to="/programmes">Programmes</NavLink>
            <NavLink to="/objectifs">Objectifs</NavLink>
            <NavLink to="/profil">Profil</NavLink>
          </nav>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              className="ml-2 md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            <NavLink to="/" className="block px-2 py-1" onClick={toggleMenu}>Tableau de bord</NavLink>
            <NavLink to="/exercices" className="block px-2 py-1" onClick={toggleMenu}>Exercices</NavLink>
            <NavLink to="/programmes" className="block px-2 py-1" onClick={toggleMenu}>Programmes</NavLink>
            <NavLink to="/objectifs" className="block px-2 py-1" onClick={toggleMenu}>Objectifs</NavLink>
            <NavLink to="/profil" className="block px-2 py-1" onClick={toggleMenu}>Profil</NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}