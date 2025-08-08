import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Brain, Code, Cog } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'
import './App.css'
import './lib/i18n.js'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import BackToTop from './components/BackToTop.jsx'
import OptimizedImage from './components/OptimizedImage.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import MeshBackground from './components/MeshBackground.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import ProjectFilters from './components/ProjectFilters.jsx'
import TechStack from './components/TechStack.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import AIDemo from './components/AIDemo.jsx'
import { Trans } from 'react-i18next'
import { Typewriter } from 'react-simple-typewriter'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { FORM } from '@/lib/constants'

// Import das imagens
import heroImage from './assets/image-inicio.png'
import aiImage from './assets/ai_highlight_image.png'
import webdevImage from './assets/webdev_highlight_image.png'
import automationImage from './assets/automation_highlight_image.png'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [formStatus, setFormStatus] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [theme, setTheme] = useState('light')
  const [projectFilter, setProjectFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const [formErrors, setFormErrors] = useState({})

  // Detectar tema do sistema na primeira visita
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  // Atualizar classe do html e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'techstack', 'ai', 'portfolio', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  // Experiências
  const experiences = t('experience', { returnObjects: true })
  // Serviços traduzidos + imagens
  const servicesRaw = t('services_cards', { returnObjects: true })
  const services = servicesRaw.map((service, idx) => ({
    ...service,
    image: [aiImage, webdevImage, automationImage][idx],
  }))
  // Portfólio
  const allProjects = t('portfolio_cards', { returnObjects: true })
  const portfolioStatus = t('portfolio_status', { returnObjects: true })

  // Filtrar projetos baseado no filtro ativo
  const filterProjects = (filter) => {
    if (filter === 'all') return allProjects

    const techCategories = {
      'ai': ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
      'web': ['React', 'Next.js', 'Vue.js', 'Node.js', 'Express', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Flask', 'Django', 'FastAPI'],
      'automation': ['UiPath', 'Selenium', 'RPA', 'Power Automate']
    }

    return allProjects.filter(project =>
      project.technologies.some(tech =>
        techCategories[filter]?.includes(tech)
      )
    )
  }

  const projects = filterProjects(projectFilter)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const validateForm = (data) => {
    const errors = {}
    if (!data.get('nome') || data.get('nome').trim().length < 2) {
      errors.nome = t('form.error_name', 'Por favor, preencha seu nome.')
    }
    if (!data.get('email') || !/^\S+@\S+\.\S+$/.test(data.get('email'))) {
      errors.email = t('form.error_email', 'Digite um e-mail válido.')
    }
    if (!data.get('mensagem') || data.get('mensagem').trim().length < 5) {
      errors.mensagem = t('form.error_message', 'Digite uma mensagem mais detalhada.')
    }
    return errors
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormStatus(null)
    setFormLoading(true)
    const form = e.target
    const data = new FormData(form)

    // Honeypot anti-spam
    if (data.get('website')) {
      setFormLoading(false)
      return
    }
    const errors = validateForm(data)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      setFormLoading(false)
      return
    }

    try {
      const response = await fetch(FORM.endpoint, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        setFormStatus('success')
        form.reset()
        setFormErrors({})
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors relative">
        <MeshBackground theme={theme} />
        <ScrollProgress />
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm shadow-sm z-50" role="navigation" aria-label="Navegação principal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div
                className="font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => scrollToSection('home')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('home')}
                tabIndex="0"
                role="button"
                aria-label="Ir para o início"
              >
                Renan Mocelin
              </div>

              {/* Desktop Navigation and Controls */}
              <div className="hidden md:flex items-center space-x-8" role="menubar">
                <button
                  onClick={() => scrollToSection('home')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group ${activeSection === 'home' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === 'home' ? 'page' : undefined}
                  aria-label="Navegar para seção inicial"
                >
                  {t('nav.home')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group ${activeSection === 'about' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === 'about' ? 'page' : undefined}
                  aria-label="Navegar para seção sobre mim"
                >
                  {t('nav.about')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group ${activeSection === 'services' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === 'services' ? 'page' : undefined}
                  aria-label="Navegar para seção de serviços"
                >
                  {t('nav.services')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'services' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('techstack')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group ${activeSection === 'techstack' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === 'techstack' ? 'page' : undefined}
                  aria-label="Navegar para seção de tech stack"
                >
                   {t('nav.techstack')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'techstack' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('ai')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group ${activeSection === 'ai' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === 'ai' ? 'page' : undefined}
                  aria-label="Navegar para seção de IA"
                >
                  {t('nav.ai')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'ai' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group ${activeSection === 'portfolio' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === 'portfolio' ? 'page' : undefined}
                  aria-label="Navegar para seção de portfólio"
                >
                  {t('nav.portfolio')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'portfolio' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group ${activeSection === 'contact' ? 'text-blue-600 dark:text-blue-400' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === 'contact' ? 'page' : undefined}
                  aria-label="Navegar para seção de contato"
                >
                  {t('nav.contact')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>

                {/* Desktop Controls - Toggle Dark Mode e Idioma */}
                <div className="flex items-center space-x-2 ml-4">
                  <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-yellow-400' : 'text-yellow-300'}`} />
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
                    aria-label="Alternar modo escuro"
                  />
                  <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
                  <button
                    onClick={() => i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')}
                    className={`ml-4 px-2 py-1 rounded text-xs font-semibold border transition-colors
                      ${theme === 'dark'
                        ? 'border-primary bg-gray-800 text-primary-foreground hover:bg-primary/20'
                        : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-blue-100'}
                    `}
                    aria-label="Trocar idioma"
                  >
                    {i18n.language === 'pt' ? 'EN' : 'PT'}
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              <MobileMenu
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                theme={theme}
                setTheme={setTheme}
              />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-24 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>

            {/* Tech Icons Floating */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 text-blue-400 opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.21 2.08-.64 3-1.22 .92.58 1.91 1.01 3 1.22 5.16-1 9-5.45 9-11V7l-10-5z"/></svg>
            </div>
            <div className="absolute top-3/4 right-1/4 w-6 h-6 text-purple-400 opacity-20 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <div className="absolute top-1/3 right-1/3 w-7 h-7 text-indigo-400 opacity-20 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </div>

          <Parallax speed={-40}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '320px', height: '320px', opacity: 0.1, zIndex: 1 }} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="200" fill="url(#heroGradient)" />
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </Parallax>
          <div id="content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-6 title-gradient font-title min-h-[120px] md:min-h-[180px] flex items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                  <span className="leading-tight">
                    <Typewriter
                      key={i18n.language}
                      words={t('hero.typewriter', { returnObjects: true })}
                      loop={0}
                      cursor
                      cursorStyle="|"
                      typeSpeed={50}
                      deleteSpeed={40}
                      delaySpeed={3000}
                      cursorBlinking={false}
                    />
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                >
                  {t('hero.desc')}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      onClick={() => scrollToSection('services')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t('hero.cta_services')}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      onClick={() => scrollToSection('portfolio')}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg dark:border-blue-400 dark:text-blue-300 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t('hero.cta_portfolio')}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
              >
                <Parallax speed={30}>
                  <OptimizedImage
                    src={heroImage}
                    alt="AI, Web Development and Automation"
                    className="max-w-full h-auto rounded-lg shadow-lg float-animation"
                    priority={true}
                  />
                </Parallax>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-28 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* About Background Effects */}
          <div className="absolute inset-0">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>

            {/* Floating Code Elements */}
            <div className="absolute top-1/4 left-1/6 w-6 h-6 text-emerald-400 opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '4s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8zM6 7a1 1 0 0 0 0 2h12a1 1 0 1 0 0-2H6zM4 11a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2H4zM6 15a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H6zM8 19a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z"/></svg>
            </div>
            <div className="absolute top-3/4 right-1/6 w-8 h-8 text-teal-400 opacity-20 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3.5s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/></svg>
            </div>

            {/* Geometric Patterns */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 15}s`,
                    animationDuration: `${15 + Math.random() * 15}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          <Parallax speed={25}>
            <svg style={{ position: 'absolute', top: '-64px', right: 0, width: '288px', height: '288px', opacity: 0.1, zIndex: 1 }} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="300" height="300" rx="80" fill="url(#aboutGradient)" />
              <defs>
                <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 title-gradient-animated">{t('about.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('about.desc')}</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                className="flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <OptimizedImage
                      src="/minha-foto.jpg"
                      alt="Foto de Renan Mocelin"
                      className="w-48 h-48 object-cover rounded-full shadow-lg mb-8 border-4 border-blue-100 dark:border-blue-900 cursor-pointer transition-transform hover:scale-105"
                      priority={true}
                    />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center bg-transparent border-none shadow-none p-0">
                    <OptimizedImage
                      src="/minha-foto.jpg"
                      alt="Foto de Renan Mocelin"
                      className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl border-4 border-blue-200 dark:border-blue-800"
                      priority={true}
                    />
                  </DialogContent>
                </Dialog>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('about.trajetoria_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('about.trajetoria')}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('about.motivacao')}</p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('about.formacao')}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('about.pg_title')}</p>
                    <p className="text-gray-600 dark:text-gray-300">SENAI/SC • 2025-2026</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('about.bacharel_title')}</p>
                    <p className="text-gray-600 dark:text-gray-300">Estácio • 2020-2024</p>
                  </div>
                </div>

                {/* Depoimentos */}
                <motion.div className="mt-12"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('testimonials.title')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t('testimonials.list', { returnObjects: true }).map((testi, idx) => (
                      <motion.div
                        key={idx}
                        className="rounded-2xl shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.4 + idx * 0.1, ease: 'easeOut' }}
                      >
                        <p className="italic text-gray-700 dark:text-gray-200 mb-2">"{testi.text}"</p>
                        <span className="block text-sm text-gray-500 dark:text-gray-400 font-medium">{testi.author}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t('about.exp')}</h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <Card key={index} className="group rounded-2xl shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300 dark:text-white text-gray-900 dark:group-hover:text-blue-400">{exp.title}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium group-hover:text-blue-500 transition-colors duration-300 dark:text-blue-300">{exp.company} • {exp.period}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 group-hover:text-gray-700 transition-colors duration-300 text-gray-800 dark:text-white dark:group-hover:text-gray-100">{exp.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs group-hover:bg-blue-100 group-hover:text-blue-700 transition-all duration-300 dark:bg-gray-700 dark:text-gray-100 dark:group-hover:bg-blue-900 dark:group-hover:text-blue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <section id="services" className="py-28 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-amber-900/20">
          {/* Services Background Effects */}
          <div className="absolute inset-0">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>

            {/* Service Icons Floating */}
            <div className="absolute top-1/4 right-1/4 w-10 h-10 text-orange-400 opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className="absolute top-3/4 left-1/4 w-8 h-8 text-amber-400 opacity-20 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M9 11H7v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6zm0-6h4v2H9V5z"/></svg>
            </div>
            <div className="absolute top-1/3 left-1/3 w-6 h-6 text-red-400 opacity-20 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>

            {/* Hexagonal Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hexagons" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
                    <polygon points="25,2 45,15 45,35 25,48 5,35 5,15" fill="none" stroke="#f59e0b" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexagons)"/>
              </svg>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-25"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 12}s`,
                    animationDuration: `${12 + Math.random() * 12}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          <Parallax speed={-30}>
            <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '256px', height: '256px', opacity: 0.1, zIndex: 1 }} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="128" cy="128" rx="128" ry="64" fill="url(#servicesGradient)" />
              <defs>
                <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 title-gradient-animated">{t('services.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('services.desc')}</p>
            </div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, staggerChildren: 0.2 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group rounded-2xl shadow-lg border-0 card-hover-effect p-6 flex flex-col justify-between min-h-[320px] cursor-pointer"
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    scale: { duration: 0.6 }
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: '0 20px 40px 0 rgba(59,130,246,0.25)',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                >
                  <CardHeader className="pb-2 flex flex-col items-center">
                    <div className="mb-4 flex flex-col items-center">
                      <OptimizedImage
                        src={service.image}
                        alt={service.title}
                        className="w-20 h-20 object-contain rounded-lg shadow"
                      />
                      <span className="mt-2">
                        {index === 0 && <Brain className="w-7 h-7 text-blue-500" />}
                        {index === 1 && <Code className="w-7 h-7 text-green-500" />}
                        {index === 2 && <Cog className="w-7 h-7 text-yellow-500" />}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 min-h-[48px] text-center flex items-center gap-2">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-600 dark:text-gray-200 mb-4 text-sm leading-relaxed">{service.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 px-2 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <TechStack />

        {/* AI Demo Section */}
        <AIDemo />

        {/* Portfolio Section */}
        <section id="portfolio" className="py-28 relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-violet-900/20 dark:to-purple-900/20">
          {/* Portfolio Background Effects */}
          <div className="absolute inset-0">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-fuchsia-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>

            {/* Portfolio Icons Floating */}
            <div className="absolute top-1/4 left-1/5 w-8 h-8 text-violet-400 opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3.5s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className="absolute top-3/4 right-1/5 w-10 h-10 text-purple-400 opacity-20 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
            </div>
            <div className="absolute top-1/3 right-1/3 w-6 h-6 text-fuchsia-400 opacity-20 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>

            {/* Diamond Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <polygon points="20,5 35,20 20,35 5,20" fill="none" stroke="#8b5cf6" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diamonds)"/>
              </svg>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(18)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 18}s`,
                    animationDuration: `${18 + Math.random() * 18}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          <Parallax speed={-20}>
            <svg style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '320px', height: '120px', opacity: 0.1, zIndex: 1 }} viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="160" cy="60" rx="160" ry="60" fill="url(#portfolioGradient)" />
              <defs>
                <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 title-gradient-animated">{t('portfolio.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('portfolio.desc')}</p>
            </motion.div>

            {/* Project Filters */}
            <ProjectFilters
              projects={allProjects}
              onFilterChange={setProjectFilter}
              activeFilter={projectFilter}
            />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="group rounded-2xl shadow-lg border-0 card-hover-effect p-6 flex flex-col justify-between min-h-[320px] cursor-pointer"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                    boxShadow: '0 16px 32px 0 rgba(59,130,246,0.2)',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProjectClick(project)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 min-h-[48px]">{project.title}</CardTitle>
                    <Badge variant={portfolioStatus[project.status === 'Concluído' || project.status === 'Done' ? 'done' : 'in_progress']} className="w-fit group-hover:scale-105 transition-transform duration-300 dark:bg-gray-700 dark:text-gray-100 dark:group-hover:bg-green-900 dark:group-hover:text-green-200 mt-2 mb-2">
                      {project.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-600 dark:text-gray-200 mb-4 text-sm leading-relaxed">{project.desc}</p>

                    <div className="space-y-3 mt-auto">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 px-2 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Project Links */}
                      <div className="flex gap-2 pt-2">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github size={12} />
                            Código
                          </motion.a>
                        )}
                        {project.demo && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink size={12} />
                            Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section id="contact" className={`py-28 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Contact Background Effects */}
          <div className="absolute inset-0">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>

            {/* Contact Icons Floating */}
            <div className="absolute top-1/4 right-1/4 w-10 h-10 text-green-400 opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </div>
            <div className="absolute top-3/4 left-1/4 w-8 h-8 text-emerald-400 opacity-20 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </div>
            <div className="absolute top-1/3 left-1/3 w-6 h-6 text-teal-400 opacity-20 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>

            {/* Wave Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 10 Q25 0 50 10 T100 10" stroke="#10b981" strokeWidth="1" fill="none"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#waves)"/>
              </svg>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-25"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 14}s`,
                    animationDuration: `${14 + Math.random() * 14}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          <Parallax speed={35}>
            <svg style={{ position: 'absolute', bottom: '-48px', right: 0, width: '240px', height: '120px', opacity: 0.1, zIndex: 1 }} viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="240" height="120" rx="60" fill="url(#contactGradient)" />
              <defs>
                <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 title-gradient-animated">{t('contact.title')}</h2>
              <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">{t('contact.desc')}</p>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t('contact.info')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 icon-accent" />
                    <span className="text-gray-800 dark:text-gray-200">Florianópolis, Santa Catarina, Brasil</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 icon-accent" />
                    <a href="https://www.linkedin.com/in/renan-mocelin-br/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-gray-800 dark:text-gray-200">
                      LinkedIn: renan-mocelin-br
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 icon-accent" />
                    <a href="https://github.com/HiRenan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-gray-800 dark:text-gray-200">
                      GitHub: HiRenan
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 icon-accent" />
                    <a href="https://wa.me/5548984273397" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors text-gray-800 dark:text-gray-200">
                      WhatsApp: +55 (48) 98427-3397
                    </a>
                  </div>
                </div>
                
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="text-lg font-semibold mb-4">{t('contact.areas')}</h4>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, staggerChildren: 0.1 }}
                  >
                    {[
                      { key: 'ai', text: t('badges.ai'), color: 'blue' },
                      { key: 'ml', text: t('badges.ml'), color: 'blue' },
                      { key: 'web', text: t('badges.web'), color: 'blue' },
                      { key: 'automation', text: t('badges.automation'), color: 'green' },
                      { key: 'bigdata', text: t('badges.bigdata'), color: 'green' },
                      { key: 'web3', text: t('badges.web3'), color: 'green' }
                    ].map((badge, index) => (
                      <motion.div
                        key={badge.key}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge className={`${badge.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} transition-all duration-300 cursor-pointer`}>
                          {badge.text}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              
              <div>
                <Card className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="font-title">{t('contact.form_title')}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 font-body">{t('contact.form_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {/* Honeypot */}
              <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.name')}</label>
                        <input type="text" name="nome" required placeholder={t('form.name_placeholder')} className={"w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" + (formErrors.nome ? ' border-red-500' : '')} />
                        {formErrors.nome && <div className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.nome}</div>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.email')}</label>
                        <input type="email" name="email" required placeholder={t('form.email_placeholder')} className={"w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" + (formErrors.email ? ' border-red-500' : '')} />
                        {formErrors.email && <div className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.email}</div>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.message')}</label>
                        <textarea rows="4" name="mensagem" required placeholder={t('form.message_placeholder')} className={"w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" + (formErrors.mensagem ? ' border-red-500' : '')}></textarea>
                        {formErrors.mensagem && <div className="text-red-500 dark:text-red-400 text-xs mt-1">{formErrors.mensagem}</div>}
                      </div>
                      <Button
                        type="submit"
                        disabled={formLoading}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                      >
                        {formLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                         <span>{t('contact.sending')}</span>
                          </div>
                        ) : (
                          t('contact.send')
                        )}
                      </Button>
                      {formStatus === 'success' && (
                        <div className="text-green-600 dark:text-green-400 text-center font-medium mt-2">{t('contact.success')}</div>
                      )}
                      {formStatus === 'error' && (
                        <div className="text-red-600 dark:text-red-400 text-center font-medium mt-2">{t('contact.error')}</div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p>&copy; 2025 Renan Mocelin. {t('footer.rights')}</p>
              <p className="mt-2 text-sm">Desenvolvido com React e Tailwind CSS</p>
            </div>
          </div>
        </footer>

        <BackToTop />

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ParallaxProvider>
  )
}

export default App

