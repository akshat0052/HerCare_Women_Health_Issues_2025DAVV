import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export default function Header() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  ];

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'ChatBot' },
    { to: '/disease', label: 'Disease' },
    { to: '/PeriodTracker', label: 'Period Tracker' },
    { to: '/login', label: 'Login' },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) setCurrentLang(lang.name);
    }
  }, []);

  const changeLanguage = (langCode, langName) => {
    if (currentLang === langName) {
      setIsLangOpen(false);
      return;
    }
    setCurrentLang(langName);
    setIsLangOpen(false);
    localStorage.setItem('selectedLang', langCode);
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;

    const waitForTranslate = setInterval(() => {
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        clearInterval(waitForTranslate);
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 100);

    setTimeout(() => {
      clearInterval(waitForTranslate);
      const selectElement = document.querySelector('.goog-te-combo');
      if (!selectElement) window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.language-dropdown')) setIsLangOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:py-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-full shadow-md border border-pink-200 px-4 md:px-6 py-2 md:py-3 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="../assets/Screenshot 1.0.png" 
              alt="HerCare Logo"
              className="h-8 md:h-10 w-auto mb-[10px] ml-[20px]" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-900 font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="hover:text-pink-600 transition text-sm xl:text-base"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - Language & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Language Dropdown */}
            <div className="language-dropdown relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm shadow-md transition-all"
              >
                <span className="hidden sm:inline">🌐</span>
                <span className="text-xs md:text-sm">{currentLang}</span>
                <svg className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute top-12 right-0 bg-white rounded-xl shadow-lg border overflow-hidden min-w-[120px] md:min-w-[140px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code, lang.name)}
                      className={`w-full px-3 md:px-4 py-2 text-left hover:bg-pink-50 flex items-center gap-2 text-sm ${
                        currentLang === lang.name ? 'bg-pink-100 text-pink-600' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-pink-600"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-2xl shadow-lg border border-pink-200 p-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 transition font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
