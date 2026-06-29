"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar({ scrolled }: { scrolled: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // SHOW ONLY ON TOP
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // navbar only visible at top
      if (window.scrollY <= 50) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "")

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    })

    setMobileMenuOpen(false)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: showNavbar ? 0 : -120,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero")}
            className="relative group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#7B2FFF] opacity-20 group-hover:opacity-40 transition-opacity" />

              <span
                className="font-display font-bold text-xl text-[#00F5FF]"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                DP
              </span>

              <div className="absolute inset-0 rounded-lg border border-[#00F5FF]/30 group-hover:border-[#00F5FF]/60 transition-colors" />
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative group text-white/70 hover:text-[#00F5FF] transition-colors text-sm font-medium"
              >
                {link.name}

                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00F5FF] group-hover:w-full transition-all duration-300"
                  style={{
                    boxShadow: "0 0 10px #00F5FF",
                  }}
                />
              </button>
            ))}
          </div>

          {/* CTA BUTTON */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("#contact")}
              className="px-6 py-2.5 bg-gradient-to-r from-[#00F5FF] to-[#7B2FFF] text-black font-semibold text-sm rounded-lg"
              style={{
                boxShadow: "0 0 20px rgba(0,245,255,0.3)",
              }}
            >
              Hire Me
            </motion.button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`w-6 h-0.5 bg-[#00F5FF] transition-all ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />

              <span
                className={`w-6 h-0.5 bg-[#00F5FF] transition-all ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`w-6 h-0.5 bg-[#00F5FF] transition-all ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[#020010]/95 backdrop-blur-xl" />

            <div className="relative h-full flex flex-col items-center justify-center gap-8 pt-20">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-display text-white hover:text-[#00F5FF] transition-colors"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollToSection("#contact")}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-[#00F5FF] to-[#7B2FFF] text-black font-semibold rounded-lg"
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}