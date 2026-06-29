"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#7B2FFF] flex items-center justify-center">
              <span className="font-bold text-black" style={{ fontFamily: "var(--font-space-grotesk)" }}>DP</span>
            </div>
            <span className="text-white/400 font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Dheeraj Prajapat
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/90 text-sm text-center"
          >
            © {currentYear} Dheeraj Prajapat. Built with passion and code.
          </motion.p>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-400 text-sm">Thank you for visiting!</span>
          </motion.div>
        </div>

        {/* Decorative line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/20 to-transparent" />

        {/* Easter egg text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/80 text-xs mt-6 font-mono"
        >
          {'< Built with Next.js, Three.js, and lots of ☕ />'}
        </motion.p>
      </div>
    </footer>
  )
}
