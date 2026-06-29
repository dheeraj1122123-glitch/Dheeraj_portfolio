"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Robot3D } from "./robot-3d"

const roles = ["Data Scientist", "AI Engineer", "ML Expert", "MERN Stack Developer"]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const targetText = roles[currentRole]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseDuration = 2000

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < targetText.length) {
          setDisplayText(targetText.substring(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-10"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-pulse-glow"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[#00F5FF] text-sm font-mono">AVAILABLE FOR HIRE</span>
            </motion.div>

            {/* Main heading with staggered reveal */}
            <div className="mb-6 relative">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="block text-[#7B2FFF] font-mono text-sm tracking-wider mb-3 font-bold"
              >
                // MR.DHEERAJ PRAJAPAT
              </motion.span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="block text-white"
                >
                  Dheeraj
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#7B2FFF] to-[#FF2CF0] animate-gradient pb-2 drop-shadow-[0_0_15px_rgba(123,47,255,0.5)]"
                >
                  Prajapat
                </motion.span>
              </h1>
            </div>

            {/* Typewriter subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="h-10 mb-6"
            >
              <span className="text-xl sm:text-2xl font-mono text-white/80">
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-[#00F5FF] ml-1 animate-pulse" />
              </span>
            </motion.div>

            {/* Bio text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-white/80 text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
            >
              Building intelligent and smart systems that bridge the gap between technology and human potential.
              The systems I build are designed to grow , learn ,descision making and growing the business and solve the real world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,245,255,0.6)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 bg-gradient-to-r from-[#00F5FF] to-[#7B2FFF] text-black font-bold rounded-lg text-base"
                style={{ boxShadow: "0 0 25px rgba(0,245,255,0.4)" }}
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 glass neon-border rounded-lg text-white font-semibold text-base relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </motion.div>

            {/* Tech stack floating icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex gap-4 mt-10"
            >
              {["Python", "TensorFlow", "React"].map((tech, i) => (
                <motion.div
                  key={tech}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                  className="w-12 h-12 rounded-lg glass flex items-center justify-center text-xs font-mono text-[#00F5FF]"
                >
                  {tech.substring(0, 2)}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
          >
            {/* Glow effect behind robot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-[#00F5FF]/10 blur-3xl" />
              <div className="absolute w-48 h-48 rounded-full bg-[#7B2FFF]/10 blur-3xl translate-x-10 translate-y-10" />
            </div>
            
            <Robot3D />
            
            {/* Neon underlight effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-4 bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-30 blur-lg" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs font-mono">SCROLL DOWN</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
