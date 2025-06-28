import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Brain, Code, Cog } from 'lucide-react'
import './App.css'

// Import das imagens
import heroImage from './assets/hero_section_image.png'
import aiImage from './assets/ai_highlight_image.png'
import webdevImage from './assets/webdev_highlight_image.png'
import automationImage from './assets/automation_highlight_image.png'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const services = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      image: aiImage,
      title: "Inteligência Artificial",
      description: "Desenvolvimento de modelos de Machine Learning, Deep Learning, análise de dados e IA generativa para soluções inovadoras.",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "NLP"]
    },
    {
      icon: <Code className="w-12 h-12 text-blue-600" />,
      image: webdevImage,
      title: "Desenvolvimento Web",
      description: "Criação de websites e aplicações web modernas, responsivas e performáticas usando tecnologias atuais.",
      skills: ["React", "JavaScript", "HTML/CSS", "Node.js", "SQL", "Git"]
    },
    {
      icon: <Cog className="w-12 h-12 text-green-600" />,
      image: automationImage,
      title: "Automação de Processos",
      description: "Automatização de tarefas repetitivas e otimização de workflows para aumentar eficiência e reduzir erros.",
      skills: ["Python", "RPA", "APIs", "Integração de Sistemas", "DevOps", "Análise de Processos"]
    }
  ]

  const experiences = [
    {
      title: "Residente em Inteligência Artificial",
      company: "SENAI/SC",
      period: "Jun 2025 - presente",
      description: "Programa intensivo focado em desenvolvimento avançado em IA, incluindo Machine Learning, Deep Learning, Visão Computacional e IA Generativa.",
      skills: ["Python", "Machine Learning", "Deep Learning", "Computer Vision"]
    },
    {
      title: "Analista de Suporte N2",
      company: "Paradigma Business Solutions",
      period: "Jan 2024 - Jun 2025",
      description: "Desenvolvimento de soluções para diagnóstico e resolução de problemas, trabalho com integração de sistemas e melhoria contínua de processos.",
      skills: ["SQL", "T-SQL", "XML", "SOAP", "Resolução de Problemas"]
    },
    {
      title: "Analista de Suporte",
      company: "Paradigma Business Solutions",
      period: "Jul 2022 - Mar 2024",
      description: "Consultas a bancos de dados, correção de erros e desenvolvimento de melhorias no produto através de pull requests.",
      skills: ["SQL", "CSS", "Banco de Dados", "Debugging"]
    }
  ]

  const projects = [
    {
      title: "Sistema de Análise de Dados com IA",
      description: "Desenvolvimento de pipeline de análise de dados utilizando Machine Learning para insights de negócio.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      status: "Em desenvolvimento"
    },
    {
      title: "Automação de Relatórios",
      description: "Sistema automatizado para geração de relatórios empresariais com integração de múltiplas fontes de dados.",
      technologies: ["Python", "SQL", "APIs", "Excel"],
      status: "Concluído"
    },
    {
      title: "Website Responsivo",
      description: "Desenvolvimento de website corporativo moderno com design responsivo e otimização para SEO.",
      technologies: ["React", "JavaScript", "CSS", "HTML"],
      status: "Concluído"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-gray-900">Renan Mocelin</div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">Início</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">Sobre</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors">Serviços</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-blue-600 transition-colors">Portfólio</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contato</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transformando ideias em 
                <span className="text-blue-600"> soluções inteligentes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Especialista em Inteligência Artificial, Desenvolvimento Web e Automação de Processos. 
                Criando soluções inovadoras que impulsionam negócios e otimizam resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection('services')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  Ver Serviços
                </Button>
                <Button onClick={() => scrollToSection('portfolio')} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                  Portfólio
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
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre Mim</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profissional em transição para Inteligência Artificial, com sólida experiência em análise de sistemas e suporte técnico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Minha Trajetória</h3>
              <p className="text-gray-600 mb-4">
                Formado em Sistemas de Informação, atualmente cursando pós-graduação em Inteligência Artificial Aplicada no SENAI/SC. 
                Minha experiência como Analista de Sistemas e Suporte me proporcionou uma base sólida em resolução de problemas, 
                análise de dados e desenvolvimento de soluções técnicas.
              </p>
              <p className="text-gray-600 mb-6">
                Sou movido por desafios técnicos e pela oportunidade de aplicar tecnologia de forma estratégica, 
                especialmente em soluções baseadas em dados, Web3, mercado financeiro e sistemas distribuídos.
              </p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Formação Acadêmica</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Pós-graduação em Inteligência Artificial Aplicada</p>
                  <p className="text-gray-600">SENAI/SC • 2025-2026</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bacharelado em Tecnologia da Informação</p>
                  <p className="text-gray-600">Estácio • 2020-2024</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Experiência Profissional</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">{exp.company} • {exp.period}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
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
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Serviços</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofereço soluções completas nas áreas de maior demanda do mercado tecnológico atual.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <img src={service.image} alt={service.title} className="w-20 h-20 object-contain" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
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
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Portfólio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Alguns dos projetos que demonstram minha experiência e capacidade de entrega.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === 'Concluído' ? 'default' : 'secondary'} className="w-fit">
                    {project.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
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
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos Conversar?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pronto para transformar suas ideias em realidade. Entre em contato para discutir seu próximo projeto.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
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
                  <span>GitHub: (disponível mediante solicitação)</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Áreas de Interesse</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600 hover:bg-blue-700">Inteligência Artificial</Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700">Machine Learning</Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700">Desenvolvimento Web</Badge>
                  <Badge className="bg-green-600 hover:bg-green-700">Automação</Badge>
                  <Badge className="bg-green-600 hover:bg-green-700">Big Data</Badge>
                  <Badge className="bg-green-600 hover:bg-green-700">Web3</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Envie uma Mensagem</CardTitle>
                  <CardDescription className="text-gray-300">
                    Interessado em uma colaboração? Vamos conversar sobre seu projeto.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                    <input type="text" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input type="email" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
                    <textarea rows="4" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
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

