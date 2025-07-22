import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { Brain, Code, Cog, Database, Cloud, BarChart3, Server } from 'lucide-react'

const TechStack = () => {
  const { t } = useTranslation()

  const techCategories = [
    {
      title: t('techstack.ai', 'Inteligência Artificial & ML'),
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      technologies: [
        'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 
        'Pandas', 'NumPy', 'OpenAI API', 'Hugging Face'
      ]
    },
    {
      title: t('techstack.web', 'Desenvolvimento Web'),
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      technologies: [
        'React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript', 
        'JavaScript', 'Tailwind CSS', 'Vite'
      ]
    },
    {
      title: t('techstack.automation', 'Automação & RPA'),
      icon: <Cog className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      technologies: [
        'UiPath', 'Selenium', 'Power Automate', 'Zapier',
        'Python Scripts', 'RPA Framework'
      ]
    },
    {
      title: t('techstack.database', 'Banco de Dados'),
      icon: <Database className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      technologies: [
        'MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server',
        'Redis', 'Firebase'
      ]
    },
    {
      title: t('techstack.cloud', 'Cloud & DevOps'),
      icon: <Cloud className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      technologies: [
        'AWS', 'Azure', 'Vercel', 'Docker', 'Git',
        'GitHub Actions', 'Netlify'
      ]
    },
    {
      title: t('techstack.visualization', 'Visualização de Dados'),
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800',
      technologies: [
        'D3.js', 'Chart.js', 'Power BI', 'Tableau',
        'Plotly', 'Recharts'
      ]
    }
  ]

  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 title-gradient">
            {t('techstack.title', 'Tech Stack')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('techstack.desc', 'Tecnologias e ferramentas que domino para criar soluções inovadoras')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className={`p-6 rounded-2xl border-2 ${category.bgColor} ${category.borderColor} hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -4,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mr-3`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (techIndex * 0.05) }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-default"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
