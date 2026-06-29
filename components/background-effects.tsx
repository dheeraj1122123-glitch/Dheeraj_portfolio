"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

// Particle system component
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    alpha: number
    color: string
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const colors = ["#00F5FF", "#7B2FFF", "#FF2CF0"]
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - subtle attraction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          particle.vx += dx * 0.00002
          particle.vy += dy * 0.00002
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(")", `, ${particle.alpha})`)
          .replace("rgb", "rgba")
          .replace("#", "")
        
        // Convert hex to rgba
        const hex = particle.color.replace("#", "")
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.alpha})`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

// Starfield background
function Starfield() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars Layer 1 */}
      <div className="absolute inset-0 animate-starfield" style={{ animationDuration: "100s" }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`star1-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 200}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
      {/* Stars Layer 2 - slower */}
      <div className="absolute inset-0 animate-starfield" style={{ animationDuration: "150s" }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star2-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 200}%`,
              opacity: Math.random() * 0.5 + 0.2,
              background: i % 3 === 0 ? "#00F5FF" : i % 3 === 1 ? "#7B2FFF" : "#FF2CF0",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Grid floor effect
function GridFloor() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute bottom-0 left-0 right-0 h-[60vh]"
        style={{
          background: "linear-gradient(to top, rgba(0,245,255,0.05) 0%, transparent 100%)",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      >
        <div 
          className="absolute inset-0 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,245,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,245,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  )
}

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #00F5FF, #7B2FFF, #FF2CF0)",
        boxShadow: "0 0 10px #00F5FF, 0 0 20px #00F5FF",
      }}
    />
  )
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("INITIALIZING PORTFOLIO_OS v2.0...")
  const [showGlitch, setShowGlitch] = useState(false)

  useEffect(() => {
    const statuses = [
      "LOADING NEURAL NETWORKS...",
      "INITIALIZING 3D ENGINE...",
      "CONNECTING TO MATRIX...",
      "DECRYPTING DATA STREAMS...",
      "CALIBRATING HOLOGRAPHICS...",
      "SYSTEM READY"
    ]

    let currentStatus = 0
    const statusInterval = setInterval(() => {
      if (currentStatus < statuses.length) {
        setStatus(statuses[currentStatus])
        currentStatus++
      }
    }, 400)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(statusInterval)
          setShowGlitch(true)
          setTimeout(onComplete, 600)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(statusInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-[100] bg-[#020010] flex flex-col items-center justify-center ${showGlitch ? "animate-glitch" : ""}`}
    >
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none animate-scanline opacity-10"
        style={{
          background: "linear-gradient(transparent 50%, rgba(0,245,255,0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* HUD Frame */}
      <div className="relative">
        <div className="absolute -inset-8 border border-[#00F5FF]/20" />
        <div className="absolute -inset-6 border border-[#00F5FF]/10" />
        
        <div className="p-8 text-center">
          <motion.div 
            className="font-mono text-[#00F5FF] text-sm mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {`>`} {status}
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-64 h-2 bg-[#0A0A2A] border border-[#00F5FF]/30 mb-4">
            <motion.div
              className="h-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, #00F5FF, #7B2FFF)",
                boxShadow: "0 0 10px #00F5FF",
              }}
            />
          </div>
          
          <div className="font-mono text-[#00F5FF]/60 text-xs">
            {Math.min(Math.round(progress), 100)}% COMPLETE
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#00F5FF]/30" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#00F5FF]/30" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#00F5FF]/30" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#00F5FF]/30" />
    </motion.div>
  )
}

// Custom Cursor
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -100, targetY = -100;
    let currentTrailX = -100, currentTrailY = -100;
    let currentCursorX = -100, currentCursorY = -100;

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    }
    
    const updateCursor = () => {
      currentCursorX += (targetX - currentCursorX) * 0.5;
      currentCursorY += (targetY - currentCursorY) * 0.5;
      
      currentTrailX += (targetX - currentTrailX) * 0.15;
      currentTrailY += (targetY - currentTrailY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentCursorX}px, ${currentCursorY}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${currentTrailX}px, ${currentTrailY}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", moveCursor)
    updateCursor();
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrameId);
    }
  }, [])

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)",
          willChange: "transform"
        }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          background: "#00F5FF",
          boxShadow: "0 0 10px #00F5FF, 0 0 20px #00F5FF",
          willChange: "transform"
        }}
      />
    </>
  )
}

// Side Navigation Dots
function SideNav({ sections, activeSection }: { sections: string[], activeSection: string }) {
  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-6 px-2 py-1 text-xs font-mono text-[#00F5FF] opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A0A2A]/80 rounded whitespace-nowrap">
            {section.toUpperCase()}
          </span>
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section
                ? "bg-[#00F5FF] scale-125"
                : "bg-white/20 hover:bg-[#00F5FF]/50"
            }`}
            style={{
              boxShadow: activeSection === section ? "0 0 10px #00F5FF, 0 0 20px #00F5FF" : "none",
            }}
          />
        </button>
      ))}
    </div>
  )
}

export {
  Particles,
  Starfield,
  GridFloor,
  ScrollProgress,
  LoadingScreen,
  CustomCursor,
  SideNav
}
