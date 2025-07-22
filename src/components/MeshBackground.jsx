import { useState, useEffect, useCallback, useRef } from 'react'

const MeshBackground = ({ theme = 'light' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState('home')
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [isIdle, setIsIdle] = useState(false)
  const rafRef = useRef()
  const lastUpdateRef = useRef(0)
  const observerRef = useRef()
  const idleTimerRef = useRef()

  // Reset idle timer
  const resetIdleTimer = useCallback(() => {
    setIsIdle(false)
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
    }, 5000) // 5 segundos de inatividade
  }, [])

  // Throttled mouse move handler para performance
  const handleMouseMove = useCallback((e) => {
    const now = Date.now()
    if (now - lastUpdateRef.current < 16) return // ~60fps limit

    lastUpdateRef.current = now
    resetIdleTimer()

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    })
  }, [resetIdleTimer])

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const now = Date.now()
    if (now - lastUpdateRef.current < 16) return // ~60fps limit

    lastUpdateRef.current = now
    resetIdleTimer()

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    })
  }, [resetIdleTimer])

  // Detectar seção atual baseada no scroll
  const detectCurrentSection = useCallback(() => {
    const sections = ['home', 'about', 'services', 'projects', 'contact']
    const scrollPosition = window.scrollY + window.innerHeight / 2

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          if (currentSection !== sectionId) {
            setCurrentSection(sectionId)
          }
          break
        }
      }
    }
  }, [currentSection])

  // Detectar preferência de movimento reduzido e visibilidade
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const batteryQuery = navigator.getBattery ? navigator.getBattery() : null

    setIsVisible(!mediaQuery.matches)

    const handleChange = (e) => setIsVisible(!e.matches)
    mediaQuery.addEventListener('change', handleChange)

    // Otimização para dispositivos com bateria baixa
    if (batteryQuery) {
      batteryQuery.then(battery => {
        const checkBattery = () => {
          setIsActive(battery.level > 0.2 || battery.charging)
        }
        battery.addEventListener('levelchange', checkBattery)
        battery.addEventListener('chargingchange', checkBattery)
        checkBattery()
      })
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Intersection Observer para otimização de performance
  useEffect(() => {
    if (!isVisible) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsActive(true)
          } else {
            setIsActive(false)
          }
        })
      },
      { threshold: 0.1 }
    )

    const meshElement = document.querySelector('.mesh-background')
    if (meshElement) {
      observerRef.current.observe(meshElement)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isVisible])

  // Event listeners
  useEffect(() => {
    if (!isVisible || !isActive) return

    const combinedScrollHandler = () => {
      handleScroll()
      detectCurrentSection()
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', combinedScrollHandler, { passive: true })
    window.addEventListener('resize', detectCurrentSection, { passive: true })

    // Detectar seção inicial
    detectCurrentSection()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', combinedScrollHandler)
      window.removeEventListener('resize', detectCurrentSection)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [handleMouseMove, handleScroll, detectCurrentSection, isVisible, isActive])

  // Mapeamento de cores por seção
  const sectionColors = {
    home: { primary: '#e0e7ff', secondary: '#f0fdfa', accent: '#dbeafe' },
    about: { primary: '#f0fdfa', secondary: '#e0e7ff', accent: '#fef3c7' },
    services: { primary: '#dbeafe', secondary: '#fef3c7', accent: '#e0e7ff' },
    projects: { primary: '#fef3c7', secondary: '#dbeafe', accent: '#f0fdfa' },
    contact: { primary: '#e0e7ff', secondary: '#dbeafe', accent: '#f0fdfa' }
  }

  const sectionColorsDark = {
    home: { primary: '#1e293b', secondary: '#0f172a', accent: '#1e40af' },
    about: { primary: '#0f172a', secondary: '#1e293b', accent: '#312e81' },
    services: { primary: '#1e40af', secondary: '#312e81', accent: '#1e293b' },
    projects: { primary: '#312e81', secondary: '#1e40af', accent: '#0f172a' },
    contact: { primary: '#1e293b', secondary: '#1e40af', accent: '#0f172a' }
  }

  const colors = theme === 'dark' ? sectionColorsDark[currentSection] : sectionColors[currentSection]

  // CSS custom properties para controle dinâmico
  const meshStyle = {
    '--mouse-x': isIdle ? '50%' : `${mousePosition.x}%`,
    '--mouse-y': isIdle ? '50%' : `${mousePosition.y}%`,
    '--scroll-progress': scrollProgress,
    '--mesh-opacity': isVisible && isActive ? (theme === 'dark' ? '0.8' : '0.6') : '0.3',
    '--mesh-primary': colors?.primary || (theme === 'dark' ? '#1e293b' : '#e0e7ff'),
    '--mesh-secondary': colors?.secondary || (theme === 'dark' ? '#0f172a' : '#f0fdfa'),
    '--mesh-accent': colors?.accent || (theme === 'dark' ? '#1e40af' : '#dbeafe'),
    '--current-section': currentSection,
    '--idle-state': isIdle ? '1' : '0'
  }

  if (!isVisible) {
    // Fallback estático para usuários com preferência de movimento reduzido
    return (
      <div 
        className="mesh-background-static fixed inset-0 pointer-events-none z-0"
        style={meshStyle}
      />
    )
  }

  return (
    <div 
      className="mesh-background fixed inset-0 pointer-events-none z-0"
      style={meshStyle}
    />
  )
}

export default MeshBackground
