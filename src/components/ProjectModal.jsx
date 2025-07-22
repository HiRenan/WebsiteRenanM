import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Calendar, Users, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import OptimizedImage from './OptimizedImage'

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Dados expandidos do projeto (simulados - em um projeto real viriam da API)
  const expandedData = {
    duration: project.status === 'Concluído' ? '3 meses' : '2 meses (em andamento)',
    team: project.title.includes('E-commerce') ? '4 pessoas' : project.title.includes('Automação') ? '2 pessoas' : '3 pessoas',
    objective: project.title.includes('E-commerce') 
      ? 'Aumentar conversão e vendas através de recomendações personalizadas'
      : project.title.includes('Automação')
      ? 'Reduzir tempo de processamento manual e eliminar erros'
      : 'Melhorar tomada de decisões através de visualização de dados',
    challenges: project.title.includes('E-commerce')
      ? ['Integração com sistema legado', 'Processamento de grandes volumes de dados', 'Otimização de performance']
      : project.title.includes('Automação')
      ? ['Mapeamento de processos complexos', 'Tratamento de exceções', 'Treinamento da equipe']
      : ['Integração de múltiplas fontes de dados', 'Design responsivo', 'Performance em tempo real'],
    results: project.title.includes('E-commerce')
      ? ['25% aumento nas vendas', '40% melhoria na experiência do usuário', '15% redução no tempo de carregamento']
      : project.title.includes('Automação')
      ? ['60% redução no tempo de processamento', '95% redução de erros', '30% economia de custos operacionais']
      : ['40% melhoria na eficiência dos relatórios', '50% redução no tempo de análise', '100% automação do processo']
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h2>
                <Badge 
                  variant={project.status === 'Concluído' || project.status === 'Done' ? 'default' : 'secondary'}
                  className={project.status === 'Concluído' || project.status === 'Done' ? 'bg-green-600' : 'bg-yellow-600'}
                >
                  {project.status}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full p-2"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Project Image */}
              {project.image && (
                <div className="rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Descrição do Projeto
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.desc}
                </p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Duração</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{expandedData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Equipe</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{expandedData.team}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Objetivo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{expandedData.objective}</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Tecnologias Utilizadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Principais Desafios
                </h3>
                <ul className="space-y-2">
                  {expandedData.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Resultados Alcançados
                </h3>
                <ul className="space-y-2">
                  {expandedData.results.map((result, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {project.github && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      Ver Código
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button
                    asChild
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} />
                      Ver Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
