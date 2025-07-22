import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const MobileMenu = ({ 
  activeSection, 
  scrollToSection, 
  theme, 
  setTheme, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation()

  // Fechar menu quando a seção muda
  useEffect(() => {
    setIsOpen(false)
  }, [activeSection])

  // Prevenir scroll do body quando menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuItems = [
    { key: 'home', label: t('nav.home'), section: 'home' },
    { key: 'about', label: t('nav.about'), section: 'about' },
    { key: 'services', label: t('nav.services'), section: 'services' },
    { key: 'portfolio', label: t('nav.portfolio'), section: 'portfolio' },
    { key: 'contact', label: t('nav.contact'), section: 'contact' }
  ]

  const handleMenuClick = (section) => {
    scrollToSection(section)
    setIsOpen(false)
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`md:hidden ${className}`}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Menu
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="py-6" role="navigation" aria-label="Menu de navegação mobile">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleMenuClick(item.section)}
                      className={`w-full text-left px-6 py-4 text-lg font-medium transition-all duration-300 relative group ${
                        activeSection === item.section
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      aria-current={activeSection === item.section ? 'page' : undefined}
                    >
                      {item.label}
                      {activeSection === item.section && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-400"
                          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Settings */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tema
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors"
                  aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
                >
                  {theme === 'dark' ? (
                    <Sun size={16} className="text-yellow-500" />
                  ) : (
                    <Moon size={16} className="text-blue-500" />
                  )}
                  <span className="text-sm">
                    {theme === 'dark' ? 'Claro' : 'Escuro'}
                  </span>
                </button>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Idioma
                </span>
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                  aria-label="Trocar idioma"
                >
                  {i18n.language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu
