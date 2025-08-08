import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { Brain, Code, Cog, Database, Cloud, BarChart3, Server } from 'lucide-react'

const TechStack = () => {
  const { t } = useTranslation()

  const techCategories = [
    {
      title: t('techstack.ai'),
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
      title: t('techstack.web'),
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
      title: t('techstack.automation'),
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
      title: t('techstack.database'),
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
      title: t('techstack.cloud'),
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
      title: t('techstack.visualization'),
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
    <section id="techstack" className="py-28 relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-900/20 dark:to-zinc-900/20">
      {/* TechStack Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-slate-400 to-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-zinc-400 to-slate-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-gray-400 to-zinc-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>

        {/* Tech Icons Floating */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 text-slate-400 opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '4s'}}>
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div className="absolute top-3/4 right-1/4 w-10 h-10 text-gray-400 opacity-20 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}>
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
        </div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 text-zinc-400 opacity-20 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>

        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M10 10h40M10 30h40M10 50h40M30 0v60" stroke="#64748b" strokeWidth="1" fill="none"/>
                <circle cx="30" cy="30" r="3" fill="#64748b"/>
                <circle cx="10" cy="10" r="2" fill="#64748b"/>
                <circle cx="50" cy="50" r="2" fill="#64748b"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full opacity-25"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 16}s`,
                animationDuration: `${16 + Math.random() * 16}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 title-gradient-animated">{t('techstack.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('techstack.desc')}</p>
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
