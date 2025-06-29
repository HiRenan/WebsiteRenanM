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

// Import das imagens
import heroImage from './assets/hero_section_image.png'
import aiImage from './assets/ai_highlight_image.png'
import webdevImage from './assets/webdev_highlight_image.png'
import automationImage from './assets/automation_highlight_image.png'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [formStatus, setFormStatus] = useState(null)
  const [theme, setTheme] = useState('light')
  const { t, i18n } = useTranslation()

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

  // Função para lidar com o submit do formulário
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormStatus(null)
    const form = e.target
    const data = new FormData(form)
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
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {t('hero.title')}
                <span className="text-blue-600 dark:text-blue-400"> {t('hero.highlight')}</span>
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
              <img src={heroImage} alt="AI, Web Development and Automation" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('about.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('about.desc')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('about.trajetoria_title', i18n.language === 'pt' ? 'Minha Trajetória' : 'My Journey')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('about.trajetoria')}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t('about.motivacao')}</p>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('about.formacao', i18n.language === 'pt' ? 'Formação Acadêmica' : 'Academic Background')}</h4>
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
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('about.exp')}</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-blue-600 hover:border-l-blue-500 cursor-pointer bg-white dark:bg-gray-800 dark:border-l-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300 dark:text-white dark:group-hover:text-blue-400">{exp.title}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium group-hover:text-blue-500 transition-colors duration-300 dark:text-blue-300">{exp.company} • {exp.period}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300 dark:text-gray-200 dark:group-hover:text-gray-100">{exp.desc}</p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('services.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('services.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      <img src={service.image} alt={service.title} className="w-20 h-20 object-contain" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors duration-300 dark:text-white dark:group-hover:text-blue-400">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300 dark:text-gray-200 dark:group-hover:text-gray-100">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs group-hover:bg-blue-100 group-hover:border-blue-300 group-hover:text-blue-700 transition-all duration-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:group-hover:bg-blue-900 dark:group-hover:border-blue-800 dark:group-hover:text-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('portfolio.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('portfolio.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-green-50 hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800 cursor-pointer border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-green-600 transition-colors duration-300 dark:text-white dark:group-hover:text-green-400">{project.title}</CardTitle>
                  <Badge variant={portfolioStatus[project.status === 'Concluído' || project.status === 'Done' ? 'done' : 'in_progress']} className="w-fit group-hover:scale-105 transition-transform duration-300 dark:bg-gray-700 dark:text-gray-100 dark:group-hover:bg-green-900 dark:group-hover:text-green-200">
                    {project.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300 dark:text-gray-200 dark:group-hover:text-gray-100">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs group-hover:bg-green-100 group-hover:border-green-300 group-hover:text-green-700 transition-all duration-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:group-hover:bg-green-900 dark:group-hover:border-green-800 dark:group-hover:text-green-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white dark:bg-gray-950 dark:text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('contact.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t('contact.info')}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Florianópolis, Santa Catarina, Brasil</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                  <a href="https://www.linkedin.com/in/renan-mocelin-br/" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-blue-400 transition-colors">
                    LinkedIn: renan-mocelin-br
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-blue-400" />
                  <a href="https://github.com/HiRenan" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    GitHub: HiRenan
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
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">{t('contact.form_title')}</CardTitle>
                  <CardDescription className="text-gray-300">{t('contact.form_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.name')}</label>
                      <input type="text" name="nome" required placeholder={t('form.name_placeholder')} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.email')}</label>
                      <input type="email" name="email" required placeholder={t('form.email_placeholder')} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.message')}</label>
                      <textarea rows="4" name="mensagem" required placeholder={t('form.message_placeholder')} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">{t('contact.send')}</Button>
                    {formStatus === 'success' && (
                      <div className="text-green-400 text-center font-medium mt-2">{t('contact.success')}</div>
                    )}
                    {formStatus === 'error' && (
                      <div className="text-red-400 text-center font-medium mt-2">{t('contact.error')}</div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2025 Renan Mocelin. Todos os direitos reservados.</p>
            <p className="mt-2 text-sm">Desenvolvido com React e Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

