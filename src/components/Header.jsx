import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.portfolio')}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
          </li>
        </ul>
        <div className="header-actions">
          <ThemeToggle />
          <div className="language-switcher">
            <button 
              onClick={() => changeLanguage('id')} 
              className={i18n.language === 'id' ? 'active' : ''}
            >
              ID
            </button>
            <button 
              onClick={() => changeLanguage('en')}
              className={i18n.language === 'en' ? 'active' : ''}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
