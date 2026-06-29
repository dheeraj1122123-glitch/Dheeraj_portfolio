"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/dheeraj1122123-glitch", color: "#00F5FF" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dheeraj-prajapat-218b2138b/", color: "#7B2FFF" },
  { name: "Twitter", href: "https://twitter.com", color: "#00F5FF" },
  { name: "Instagram", href: "https://instagram.com", color: "#FF2CF0" },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Formatting WhatsApp message
    const phoneNumber = "919111514980" // Country code 91 + 10 digit number
    const text = `*New Contact from Portfolio!*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n*Message:*\n${formData.message}`
    const encodedText = encodeURIComponent(text)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`
    
    // Small delay for UI animation feedback
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated constellation background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00F5FF] font-mono text-sm tracking-wider">[ CONTACT ]</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Let&apos;s You Build The <span className="neon-text-violet">Future with Me</span> 
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 mb-10">
              {/* Email */}
              <motion.div
                whileHover={{ x: 10 }}
                className="glass rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:neon-border transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00F5FF]/10 flex items-center justify-center">
                  <span className="text-[#00F5FF] text-xl">✉</span>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white/100 font-medium">dheeraj1122123@gmail.com</p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                whileHover={{ x: 10 }}
                className="glass rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:neon-border transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#7B2FFF]/10 flex items-center justify-center">
                  <span className="text-[#7B2FFF] text-xl">📍</span>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white font-medium">Indore, Madhya Pradesh</p>
                </div>
              </motion.div>

              {/* Status */}
              <motion.div
                whileHover={{ x: 10 }}
                className="glass rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:neon-border transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  <p className="text-green-400 font-medium">Open to Work</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      boxShadow: `0 0 20px ${social.color}`
                    }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    style={{ border: `1px solid ${social.color}20` }}
                  >
                    <span className="text-sm font-bold">{social.name.charAt(0)}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Animated radar/globe graphic */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 relative h-48 hidden lg:block"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Radar circles */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-[#00F5FF]/20"
                    style={{ width: i * 80, height: i * 80 }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2 + i, repeat: Infinity }}
                  />
                ))}
                {/* Center dot */}
                <div className="w-4 h-4 rounded-full bg-[#00F5FF]" style={{ boxShadow: "0 0 20px #00F5FF" }} />
                {/* Scanning line */}
                <motion.div
                  className="absolute w-20 h-0.5 bg-gradient-to-r from-[#00F5FF] to-transparent origin-left"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8">
              <div className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-[#00F5FF] transition-colors peer"
                  />
                  <label className="absolute left-4 top-4 text-white/50 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00F5FF] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs bg-[#0A0A2A] px-1">
                    Your Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-[#00F5FF] transition-colors peer"
                  />
                  <label className="absolute left-4 top-4 text-white/50 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00F5FF] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs bg-[#0A0A2A] px-1">
                    Email Address
                  </label>
                </div>

                {/* Subject */}
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-[#00F5FF] transition-colors peer"
                  />
                  <label className="absolute left-4 top-4 text-white/50 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00F5FF] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs bg-[#0A0A2A] px-1">
                    Subject
                  </label>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder=" "
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-[#00F5FF] transition-colors peer resize-none"
                  />
                  <label className="absolute left-4 top-4 text-white/50 transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#00F5FF] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs bg-[#0A0A2A] px-1">
                    Your Message
                  </label>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-lg font-bold text-black relative overflow-hidden transition-all disabled:opacity-70"
                  style={{
                    background: isSubmitted 
                      ? "linear-gradient(135deg, #10B981, #059669)" 
                      : "linear-gradient(135deg, #00F5FF, #7B2FFF)",
                    boxShadow: isSubmitted 
                      ? "0 0 30px rgba(16, 185, 129, 0.4)" 
                      : "0 0 30px rgba(0, 245, 255, 0.3)"
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      />
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <span>✓</span> Message Sent!
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>
              </div>
            </form>

            {/* AI Assistant hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-white/40 text-sm">
                Or chat directly with my{" "}
                <span className="text-[#00F5FF] cursor-pointer hover:underline">
                  AI assistant →
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
