import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'

const ProjectFilters = ({ projects, onFilterChange, activeFilter }) => {
  const { t } = useTranslation()

  // Extrair todas as tecnologias únicas dos projetos
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))]
  
  // Categorizar tecnologias por área
  const techCategories = {
    'AI/ML': ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
    'Web': ['React', 'Next.js', 'Vue.js', 'Node.js', 'Express', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
    'Automação': ['UiPath', 'Selenium', 'RPA', 'Power Automate'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server', 'Redis'],
    'Cloud/DevOps': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Vercel', 'Netlify'],
    'Visualização': ['D3.js', 'Chart.js', 'Power BI', 'Tableau'],
    'Backend': ['Flask', 'Django', 'FastAPI', 'Spring Boot', 'Laravel']
  }

  // Função para categorizar uma tecnologia
  const categorizeTech = (tech) => {
    for (const [category, techs] of Object.entries(techCategories)) {
      if (techs.includes(tech)) return category
    }
    return 'Outros'
  }

  // Agrupar tecnologias por categoria
  const groupedTechs = allTechnologies.reduce((acc, tech) => {
    const category = categorizeTech(tech)
    if (!acc[category]) acc[category] = []
    acc[category].push(tech)
    return acc
  }, {})

  const filterOptions = [
    { key: 'all', label: t('filters.all', 'Todos'), count: projects.length },
    { key: 'ai', label: t('filters.ai', 'IA/ML'), count: projects.filter(p => p.technologies.some(tech => techCategories['AI/ML'].includes(tech))).length },
    { key: 'web', label: t('filters.web', 'Web Dev'), count: projects.filter(p => p.technologies.some(tech => techCategories['Web'].includes(tech))).length },
    { key: 'automation', label: t('filters.automation', 'Automação'), count: projects.filter(p => p.technologies.some(tech => techCategories['Automação'].includes(tech))).length }
  ]

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap gap-3 justify-center">
        {filterOptions.map((option, index) => (
          <motion.button
            key={option.key}
            onClick={() => onFilterChange(option.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === option.key
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              scale: activeFilter === option.key ? 1.05 : 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === option.key
                ? 'bg-white/20 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {option.count}
            </span>
          </motion.button>
        ))}
      </div>
      
      {/* Indicador visual do filtro ativo */}
      {activeFilter !== 'all' && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t('filters.showing', 'Mostrando projetos de')}: <strong>{filterOptions.find(f => f.key === activeFilter)?.label}</strong>
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProjectFilters
