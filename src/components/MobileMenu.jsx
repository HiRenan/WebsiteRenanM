import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
    { key: 'home', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'services', label: t('nav.services') },
    { key: 'portfolio', label: t('nav.portfolio') },
    { key: 'contact', label: t('nav.contact') }
  ]

  const handleMenuClick = (section) => {
    scrollToSection(section)
    setIsOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')
  }

  return (
    <>
      {/* Menu Button */}
      <div className={`md:hidden ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[100] p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
      </div>

      {/* Renderizar o menu via portal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                onClick={() => setIsOpen(false)}
              />

              {/* Mobile Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
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

                {/* Navigation */}
                <nav className="p-6">
                  <ul className="space-y-4">
                    {menuItems.map((item) => (
                      <li key={item.key}>
                        <button
                          onClick={() => handleMenuClick(item.key)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            activeSection === item.key
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Settings */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
                  <div className="space-y-4">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tema
                      </span>
                      <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                        aria-label="Alternar tema"
                      >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
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
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default MobileMenu
