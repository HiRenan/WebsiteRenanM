import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Brain, Code, Cog } from 'lucide-react'
import { Switch } from '@/components/ui/switch.jsx'
import { Moon, Sun } from 'lucide-react'
import './App.css'
import './lib/i18n.js'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import BackToTop from './components/BackToTop.jsx'
import { Trans } from 'react-i18next'
import { Typewriter } from 'react-simple-typewriter'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'

// Import das imagens
import heroImage from './assets/hero_section_image.png'
import aiImage from './assets/ai_highlight_image.png'
import webdevImage from './assets/webdev_highlight_image.png'
import automationImage from './assets/automation_highlight_image.png'
import minhaFoto from './assets/minha-foto.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [formStatus, setFormStatus] = useState(null)
  const [theme, setTheme] = useState('light')
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
      const sections = ['home', 'about', 'services', 'portfolio', 'contact']
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
      element.scrollIntoView({ behavior: 'smooth' })
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
  const projects = t('portfolio_cards', { returnObjects: true })
  const portfolioStatus = t('portfolio_status', { returnObjects: true })

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
    const form = e.target
    const data = new FormData(form)
    const errors = validateForm(data)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
    try {
      const response = await fetch('https://formspree.io/f/mblyqevg', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        setFormStatus('success')
        form.reset()
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm shadow-sm z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 transition-colors cursor-pointer">Renan Mocelin</div>
              <div className="hidden md:flex space-x-8">
                <button
                  onClick={() => scrollToSection('home')}
                  className={`text-gray-700 hover:text-blue-600 transition-all duration-300 relative group ${activeSection === 'home' ? 'text-blue-600' : ''}`}
                >
                  {t('nav.home')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`text-gray-700 hover:text-blue-600 transition-all duration-300 relative group ${activeSection === 'about' ? 'text-blue-600' : ''}`}
                >
                  {t('nav.about')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className={`text-gray-700 hover:text-blue-600 transition-all duration-300 relative group ${activeSection === 'services' ? 'text-blue-600' : ''}`}
                >
                  {t('nav.services')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'services' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className={`text-gray-700 hover:text-blue-600 transition-all duration-300 relative group ${activeSection === 'portfolio' ? 'text-blue-600' : ''}`}
                >
                  {t('nav.portfolio')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'portfolio' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`text-gray-700 hover:text-blue-600 transition-all duration-300 relative group ${activeSection === 'contact' ? 'text-blue-600' : ''}`}
                >
                  {t('nav.contact')}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              </div>
              {/* Toggle Dark Mode e Idioma */}
              <div className="flex items-center space-x-2 ml-4">
                <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-yellow-400' : 'text-gray-400'}`} />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
                  aria-label="Alternar modo escuro"
                />
                <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
                <button
                  onClick={() => i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')}
                  className="ml-4 px-2 py-1 rounded text-xs font-semibold border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  aria-label="Trocar idioma"
                >
                  {i18n.language === 'pt' ? 'EN' : 'PT'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className={`pt-24 min-h-screen flex items-center ${theme === 'dark' ? 'hero-gradient-dark' : 'hero-gradient'}`} style={{ position: 'relative', overflow: 'visible' }}>
          <Parallax speed={-40}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '320px', height: '320px', opacity: 0.2, zIndex: 0 }} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="200" fill="#2563eb" />
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 title-gradient font-title">
                  <Typewriter
                    words={["Transformando desafios de negócios em soluções inteligentes com IA e Automação.", "Desenvolvimento Web de Alto Impacto.", "Automação para o seu negócio."]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={60}
                    deleteSpeed={40}
                    delaySpeed={2000}
                  />
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  {t('hero.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => scrollToSection('services')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg dark:bg-blue-500 dark:hover:bg-blue-600">
                    {t('hero.cta_services')}
                  </Button>
                  <Button onClick={() => scrollToSection('portfolio')} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg dark:border-blue-400 dark:text-blue-300 dark:hover:bg-gray-800">
                    {t('hero.cta_portfolio')}
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Parallax speed={30}>
                  <img src={heroImage} alt="AI, Web Development and Automation" className="max-w-full h-auto rounded-lg shadow-lg" />
                </Parallax>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className={`py-28 ${theme === 'dark' ? 'about-gradient-dark' : 'about-gradient'}`}
          style={{ position: 'relative', overflow: 'visible' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Parallax speed={25}>
            <svg style={{ position: 'absolute', top: '-64px', right: 0, width: '288px', height: '288px', opacity: 0.1, zIndex: 0 }} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="300" height="300" rx="80" fill="#06b6d4" />
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 title-gradient">{t('about.title')}</h2>
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
                <img
                  src={minhaFoto}
                  alt="Foto de Renan Mocelin"
                  className="w-48 h-48 object-cover rounded-full shadow-lg mb-8 border-4 border-blue-100 dark:border-blue-900"
                />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('about.trajetoria_title', i18n.language === 'pt' ? 'Minha Trajetória' : 'My Journey')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('about.trajetoria')}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('about.motivacao')}</p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('about.formacao', i18n.language === 'pt' ? 'Formação Acadêmica' : 'Academic Background')}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('about.pg_title', i18n.language === 'pt' ? 'Pós-graduação em Inteligência Artificial Aplicada' : 'Postgraduate in Applied Artificial Intelligence')}</p>
                    <p className="text-gray-600 dark:text-gray-300">SENAI/SC • 2025-2026</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('about.bacharel_title', i18n.language === 'pt' ? 'Bacharelado em Tecnologia da Informação' : 'Bachelor in Information Technology')}</p>
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
        <section id="services" className={`py-28 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`} style={{ position: 'relative', overflow: 'visible' }}>
          <Parallax speed={-30}>
            <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '256px', height: '256px', opacity: 0.1, zIndex: 0 }} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="128" cy="128" rx="128" ry="64" fill="#f59e42" />
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('services.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('services.desc')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group rounded-2xl shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[320px] cursor-pointer"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.18)' }}
                >
                  <CardHeader className="pb-2 flex flex-col items-center">
                    <div className="mb-4 flex flex-col items-center">
                      <img src={service.image} alt={service.title} className="w-20 h-20 object-contain rounded-lg shadow" />
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
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-28 bg-white dark:bg-gray-900" style={{ position: 'relative', overflow: 'visible' }}>
          <Parallax speed={-20}>
            <svg style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '320px', height: '120px', opacity: 0.08, zIndex: 0 }} viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="160" cy="60" rx="160" ry="60" fill="#2563eb" />
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('portfolio.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('portfolio.desc')}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="group rounded-2xl shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[320px] cursor-pointer"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.18)' }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 min-h-[48px]">{project.title}</CardTitle>
                    <Badge variant={portfolioStatus[project.status === 'Concluído' || project.status === 'Done' ? 'done' : 'in_progress']} className="w-fit group-hover:scale-105 transition-transform duration-300 dark:bg-gray-700 dark:text-gray-100 dark:group-hover:bg-green-900 dark:group-hover:text-green-200 mt-2 mb-2">
                      {project.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-600 dark:text-gray-200 mb-4 text-sm leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 px-2 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section id="contact" className={`py-28 ${theme === 'dark' ? 'text-white contact-gradient-dark' : 'text-gray-900 contact-gradient'}`} style={{ position: 'relative', overflow: 'visible' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Parallax speed={35}>
            <svg style={{ position: 'absolute', bottom: '-48px', right: 0, width: '240px', height: '120px', opacity: 0.10, zIndex: 0 }} viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="240" height="120" rx="60" fill="#06b6d4" />
            </svg>
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 title-gradient">{t('contact.title')}</h2>
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
                    <a href="https://www.linkedin.com/in/renan-mocelin-br/" target="_blank" rel="noopener noreferrer" 
                       className="hover:text-blue-400 transition-colors text-gray-800 dark:text-gray-200">
                      LinkedIn: renan-mocelin-br
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 icon-accent" />
                    <a href="https://github.com/HiRenan" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-gray-800 dark:text-gray-200">
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
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">{t('contact.areas')}</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer">{t('badges.ai', 'Inteligência Artificial')}</Badge>
                    <Badge className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer">{t('badges.ml', 'Machine Learning')}</Badge>
                    <Badge className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer">{t('badges.web', 'Desenvolvimento Web')}</Badge>
                    <Badge className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 cursor-pointer">{t('badges.automation', 'Automação')}</Badge>
                    <Badge className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 cursor-pointer">{t('badges.bigdata', 'Big Data')}</Badge>
                    <Badge className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 cursor-pointer">{t('badges.web3', 'Web3')}</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="font-title">{t('contact.form_title')}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 font-body">{t('contact.form_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleContactSubmit} className="space-y-4">
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
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">{t('contact.send')}</Button>
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
      </div>
    </ParallaxProvider>
  )
}

export default App

