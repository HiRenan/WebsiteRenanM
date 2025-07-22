import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'
import { 
  Brain, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Zap,
  MessageSquare,
  Code,
  PenTool,
  Lightbulb
} from 'lucide-react'

const AIDemo = () => {
  const { t } = useTranslation()
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const promptTemplates = [
    {
      id: 'business',
      title: t('ai_demo.prompts.business.title', 'Estratégia de Negócios'),
      description: t('ai_demo.prompts.business.desc', 'Gere ideias para melhorar um negócio'),
      prompt: 'Como posso melhorar a experiência do cliente em um e-commerce de roupas usando tecnologia?',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'code',
      title: t('ai_demo.prompts.code.title', 'Solução de Código'),
      description: t('ai_demo.prompts.code.desc', 'Resolva problemas de programação'),
      prompt: 'Explique como implementar um sistema de cache em Redis para uma API REST em Node.js',
      icon: <Code className="w-5 h-5" />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'automation',
      title: t('ai_demo.prompts.automation.title', 'Automação de Processos'),
      description: t('ai_demo.prompts.automation.desc', 'Automatize tarefas repetitivas'),
      prompt: 'Como automatizar o processo de geração de relatórios mensais usando Python e RPA?',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'content',
      title: t('ai_demo.prompts.content.title', 'Criação de Conteúdo'),
      description: t('ai_demo.prompts.content.desc', 'Crie conteúdo profissional'),
      prompt: 'Escreva um post para LinkedIn sobre as tendências de IA em 2025',
      icon: <PenTool className="w-5 h-5" />,
      color: 'from-pink-500 to-rose-500'
    }
  ]

  // Simulação de resposta de IA (em produção, seria uma chamada real para API)
  const simulateAIResponse = (prompt) => {
    // Múltiplas respostas para cada categoria para variar o conteúdo
    const responses = {
      'business': [
        `Para melhorar a experiência do cliente em um e-commerce de roupas usando tecnologia, sugiro:

🎯 **Personalização com IA**
• Sistema de recomendação baseado em histórico de compras
• Chatbot inteligente para atendimento 24/7
• Personalização da homepage por perfil do usuário

📱 **Experiência Mobile**
• App nativo com realidade aumentada para "provar" roupas
• Checkout em um clique com biometria
• Notificações push personalizadas

🔍 **Busca Inteligente**
• Busca por imagem (foto de uma roupa para encontrar similar)
• Filtros avançados por ocasião, estilo, clima
• Sugestões automáticas de looks completos

📊 **Analytics e Otimização**
• A/B testing automatizado para layouts
• Análise de comportamento para reduzir abandono de carrinho
• Previsão de demanda com machine learning`,

        `Estratégias para aumentar a conversão em um negócio digital:

🎯 **Otimização de Conversão**
• Landing pages personalizadas por fonte de tráfego
• Testes A/B contínuos em CTAs e formulários
• Implementação de urgência e escassez

💰 **Estratégias de Pricing**
• Pricing dinâmico baseado em demanda
• Ofertas personalizadas por segmento
• Programa de fidelidade gamificado

📈 **Growth Hacking**
• Loops virais para referências
• Onboarding otimizado para reduzir churn
• Análise de cohort para retenção`
      ],

      'code': [
        `Implementação de sistema de cache em Redis para API REST em Node.js:

🏗️ **Configuração Inicial**
\`\`\`javascript
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});
\`\`\`

⚡ **Middleware de Cache**
\`\`\`javascript
const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await client.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
\`\`\`

🎯 **Implementação em Rotas**
\`\`\`javascript
app.get('/api/users', cacheMiddleware(600), getUsersController);
\`\`\`

✨ **Benefícios**: Redução de 80% no tempo de resposta e menor carga no banco de dados.`,

        `Criando uma API RESTful escalável com Node.js e MongoDB:

🏗️ **Arquitetura Base**
\`\`\`javascript
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json({ limit: '10mb' }));
\`\`\`

🔐 **Autenticação JWT**
\`\`\`javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
\`\`\`

⚡ **Performance**: Rate limiting, compression e validação de dados para máxima eficiência.`
      ],

      'automation': [
        `Automação de relatórios mensais com Python e RPA:

🐍 **Script Python Base**
\`\`\`python
import pandas as pd
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
\`\`\`

🤖 **Processo RPA (UiPath/Python)**
1. **Coleta de Dados**
   • Conectar com banco de dados
   • Extrair dados do mês anterior
   • Validar integridade dos dados

2. **Processamento**
   • Calcular KPIs automaticamente
   • Gerar gráficos com matplotlib/plotly
   • Criar dashboard interativo

3. **Distribuição**
   • Gerar PDF do relatório
   • Enviar por email para stakeholders
   • Salvar no SharePoint/Drive

⏰ **Agendamento**
• Cron job no Linux: \`0 9 1 * * python relatorio.py\`
• Task Scheduler no Windows
• GitHub Actions para automação na nuvem

📊 **Resultado**: Economia de 15 horas/mês de trabalho manual`,

        `Automatizando processos de vendas com CRM e IA:

🤖 **Lead Scoring Automático**
• Algoritmo que pontua leads baseado em comportamento
• Integração com Google Analytics e redes sociais
• Notificações automáticas para vendedores

📧 **Email Marketing Inteligente**
• Sequências de email personalizadas por segmento
• A/B testing automático de subject lines
• Horário otimizado de envio por fuso horário

📊 **Dashboard em Tempo Real**
• KPIs atualizados automaticamente
• Alertas para oportunidades perdidas
• Previsão de vendas com machine learning

⚡ **Resultado**: Aumento de 40% na conversão de leads e redução de 60% no tempo de follow-up.`
      ],

      'content': [
        `🚀 **As Principais Tendências de IA para 2025**

A inteligência artificial continua revolucionando o mundo dos negócios. Aqui estão as tendências que definirão 2025:

🧠 **1. IA Generativa Multimodal**
Modelos que combinam texto, imagem, áudio e vídeo em uma única solução. Empresas usarão para criar conteúdo mais rico e personalizado.

⚡ **2. AutoML Democratizado**
Ferramentas no-code/low-code permitirão que qualquer profissional crie modelos de IA sem conhecimento técnico profundo.

🔒 **3. IA Responsável e Ética**
Foco em transparência, explicabilidade e redução de vieses. Regulamentações mais rígidas impulsionarão o desenvolvimento ético.

🏭 **4. IA na Borda (Edge AI)**
Processamento local em dispositivos IoT, reduzindo latência e melhorando privacidade dos dados.

🤝 **5. Colaboração Humano-IA**
Sistemas que amplificam capacidades humanas ao invés de substituí-las, criando workflows mais eficientes.

💡 **Para profissionais**: Invistam em upskilling e mantenham-se atualizados. A IA não substitui, mas transforma profissões.

#InteligenciaArtificial #IA2025 #Inovacao #Tecnologia #FuturoDoTrabalho`,

        `📝 **Como Criar Conteúdo Viral no LinkedIn em 2025**

Estratégias comprovadas para aumentar seu alcance e engajamento:

🎯 **Storytelling Autêntico**
• Compartilhe experiências pessoais e lições aprendidas
• Use dados e números para validar seus pontos
• Termine com uma pergunta para gerar discussão

📊 **Formatos que Funcionam**
• Carrosséis com insights práticos (8-10 slides)
• Vídeos curtos com dicas rápidas (30-60s)
• Posts em lista com bullets e emojis

⏰ **Timing Estratégico**
• Publique entre 8h-10h e 17h-19h (horário brasileiro)
• Terça, quarta e quinta são os melhores dias
• Responda comentários nas primeiras 2 horas

🚀 **Resultado**: Aumento médio de 300% no alcance e 150% no engajamento com essas técnicas.`
      ]
    }

    // Determinar qual resposta usar baseado no prompt (case insensitive)
    const promptLower = prompt.toLowerCase()
    let responseKey = 'business' // default

    // Palavras-chave para código/programação
    const codeKeywords = ['código', 'code', 'programação', 'programming', 'redis', 'node.js', 'nodejs', 'javascript', 'python', 'api', 'cache', 'sistema', 'implementar', 'desenvolver', 'função', 'método', 'class', 'variável', 'algoritmo', 'database', 'sql']

    // Palavras-chave para automação
    const automationKeywords = ['automação', 'automation', 'automatizar', 'automate', 'relatórios', 'reports', 'rpa', 'processo', 'process', 'workflow', 'bot', 'script', 'tarefa', 'task', 'repetitivo', 'repetitive', 'cron', 'agendamento', 'schedule']

    // Palavras-chave para conteúdo/marketing
    const contentKeywords = ['linkedin', 'post', 'conteúdo', 'content', 'marketing', 'social', 'mídia', 'media', 'texto', 'text', 'artigo', 'article', 'blog', 'redação', 'writing', 'copywriting', 'tendências', 'trends', 'publicação', 'publication']

    // Verificar qual categoria tem mais matches
    const codeMatches = codeKeywords.filter(keyword => promptLower.includes(keyword)).length
    const automationMatches = automationKeywords.filter(keyword => promptLower.includes(keyword)).length
    const contentMatches = contentKeywords.filter(keyword => promptLower.includes(keyword)).length

    // Escolher a categoria com mais matches
    const maxMatches = Math.max(codeMatches, automationMatches, contentMatches)

    if (maxMatches > 0) {
      if (codeMatches === maxMatches) {
        responseKey = 'code'
      } else if (automationMatches === maxMatches) {
        responseKey = 'automation'
      } else if (contentMatches === maxMatches) {
        responseKey = 'content'
      }
    }

    // Selecionar uma resposta aleatória da categoria escolhida
    const categoryResponses = responses[responseKey]
    const randomIndex = Math.floor(Math.random() * categoryResponses.length)
    return categoryResponses[randomIndex]
  }

  const handleGenerate = async () => {
    const prompt = selectedPrompt || customPrompt
    if (!prompt.trim()) return

    setIsGenerating(true)
    setShowResult(false)

    // Simular delay de API
    setTimeout(() => {
      const response = simulateAIResponse(prompt)
      setGeneratedText(response)
      setIsGenerating(false)
      setShowResult(true)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    // Aqui você poderia adicionar um toast de confirmação
  }

  const handleSelectPrompt = (prompt) => {
    setSelectedPrompt(prompt.prompt)
    setCustomPrompt('')
  }

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 20}s`
              }}
            ></div>
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <path d="M0,100 Q250,50 500,100 T1000,100" stroke="url(#line-gradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
          <path d="M0,200 Q300,150 600,200 T1200,200" stroke="url(#line-gradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
          <path d="M0,300 Q400,250 800,300 T1600,300" stroke="url(#line-gradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}}/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 title-gradient-animated">
            {t('ai_demo.title', 'Demo de IA Interativa')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('ai_demo.desc', 'Experimente o poder da inteligência artificial. Escolha um prompt ou crie o seu próprio!')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <Card className="h-full card-hover-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  {t('ai_demo.input.title', 'Seu Prompt')}
                </CardTitle>
                <CardDescription>
                  {t('ai_demo.input.desc', 'Escolha um template ou escreva seu próprio prompt')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Templates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {promptTemplates.map((template, index) => (
                    <motion.button
                      key={template.id}
                      onClick={() => handleSelectPrompt(template)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                        selectedPrompt === template.prompt
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${template.color} text-white mb-2`}>
                        {template.icon}
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                        {template.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {template.description}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* Custom Prompt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('ai_demo.custom_prompt', 'Ou escreva seu próprio prompt:')}
                  </label>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => {
                      setCustomPrompt(e.target.value)
                      setSelectedPrompt('')
                    }}
                    placeholder={t('ai_demo.placeholder', 'Digite sua pergunta ou solicitação aqui...')}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!selectedPrompt && !customPrompt.trim())}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      {t('ai_demo.generating', 'Gerando...')}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {t('ai_demo.generate', 'Gerar com IA')}
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            <Card className="h-full card-hover-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    {t('ai_demo.output.title', 'Resposta da IA')}
                  </div>
                  {showResult && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="flex items-center gap-1"
                    >
                      <Copy className="w-4 h-4" />
                      {t('ai_demo.copy', 'Copiar')}
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  {t('ai_demo.output.desc', 'Resultado gerado pela inteligência artificial')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="min-h-[400px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <AnimatePresence mode="wait">
                    {isGenerating && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-full text-center"
                      >
                        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {t('ai_demo.processing', 'Processando sua solicitação...')}
                        </p>
                      </motion.div>
                    )}
                    
                    {showResult && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="prose prose-sm dark:prose-invert max-w-none"
                      >
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
                          {generatedText}
                        </pre>
                      </motion.div>
                    )}
                    
                    {!isGenerating && !showResult && (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-center"
                      >
                        <Brain className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          {t('ai_demo.waiting', 'Aguardando seu prompt para gerar uma resposta...')}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AIDemo
