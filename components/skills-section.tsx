"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const skillCategories = [
  {
    name: "AI / Machine Learning",
    icon: "AI",
    color: "#00F5FF",
    description: "Building intelligent systems that learn and adapt",
    skills: [
      { name: "Machine Learning", level: 98 },
      { name: "Deep Learning", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 75 },
      { name: "Computer Vision", level: 80 },
      { name: "NLP", level: 70 },
    ],
  },
  {
    name: "Data Science",
    icon: "DS",
    color: "#7B2FFF",
    description: "Transforming raw data into actionable insights",
    skills: [
      { name: "Python", level: 98 },
      { name: "Data Analytics", level: 95 },
      { name: "Scikit-learn", level: 95 },
      { name: "SQL", level: 88 },
      { name: "Pandas", level: 92 },
      { name: "Statistics", level: 85 },
    ],
  },
  {
    name: "Frontend Development",
    icon: "FE",
    color: "#FF2CF0",
    description: "Creating stunning, responsive user interfaces",
    skills: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript", level: 82 },
      { name: "Json", level: 75 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 92 },
    ],
  },
  {
    name: "Backend & DevOps",
    icon: "BE",
    color: "#00F5FF",
    description: "Scalable infrastructure and robust APIs",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 72 },
      { name: "Git", level: 90 },
      { name: "LangChain", level: 85 },
    ],
  },
]

const allSkills = [
  "Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
  "Scikit-learn", "Data Science", "AI/ML", "NLP", "Computer Vision",
  "React", "Node.js", "Next.js", "MongoDB", "Docker", "Three.js",
  "Generative AI", "LangChain", "Data Analytics", "SQL", "AWS", "Git", "Github", "AIAgents", "Jupyter Notebooks", "VSCode"
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white/90 text-sm font-medium">{name}</span>
        <span className="text-white/60 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{ 
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 15px ${color}60`
          }}
        >
          <div className="absolute inset-0 animate-shimmer" />
        </motion.div>
      </div>
    </div>
  )
}

function FlipCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      className="relative h-[420px] cursor-pointer group"
      style={{ perspective: "1500px" }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div 
            className="w-full h-full glass-strong p-8 flex flex-col items-center justify-center text-center transition-all duration-500"
            style={{
              borderColor: category.color,
              boxShadow: `0 0 40px ${category.color}30, inset 0 0 60px ${category.color}10`
            }}
          >
            {/* Large icon */}
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 rounded-2xl flex items-center justify-center mb-6 relative"
              style={{ 
                background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`,
                border: `2px solid ${category.color}50`,
                boxShadow: `0 0 30px ${category.color}40`
              }}
            >
              <span 
                className="text-4xl font-bold font-mono"
                style={{ 
                  color: category.color,
                  textShadow: `0 0 20px ${category.color}`
                }}
              >
                {category.icon}
              </span>
              
              {/* Orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute -top-1 left-1/2 w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: category.color,
                    boxShadow: `0 0 10px ${category.color}`
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* Title */}
            <h3 
              className="text-2xl font-bold mb-3"
              style={{ 
                fontFamily: "var(--font-space-grotesk)",
                color: "white"
              }}
            >
              {category.name}
            </h3>
            
            {/* Description */}
            <p className="text-white/60 text-sm mb-6 max-w-[220px]">
              {category.description}
            </p>
            
            {/* Skill count badge */}
            <div 
              className="px-4 py-2 rounded-full text-sm font-mono"
              style={{ 
                background: `${category.color}20`,
                color: category.color,
                border: `1px solid ${category.color}40`
              }}
            >
              {category.skills.length} Skills
            </div>
            
            {/* Flip hint */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-6 text-white/20 text-xs font-mono flex items-center gap-2"
            >
              <span>Hover or click to flip</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.div>
          </div>
        </div>
        
        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div 
            className="w-full h-full glass-strong p-6 flex flex-col"
            style={{
              borderColor: category.color,
              boxShadow: `0 0 40px ${category.color}30, inset 0 0 60px ${category.color}10`
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ 
                  background: `${category.color}20`,
                  border: `1px solid ${category.color}40`
                }}
              >
                <span 
                  className="text-lg font-bold font-mono"
                  style={{ color: category.color }}
                >
                  {category.icon}
                </span>
              </div>
              <h4 
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {category.name}
              </h4>
            </div>
            
            {/* Skills list */}
            <div className="flex-1 overflow-hidden">
              {category.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={category.color}
                  delay={0.1 + i * 0.08}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${category.color}15 0%, transparent 70%)`
        }}
      />
    </motion.div>
  )
}

function TechArsenal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-20"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        Tech <span className="neon-text-cyan">Skills</span> and <span className="neon-text-cyan">Tools</span>
      </h3>
      
      <div className="flex flex-wrap justify-center gap-3">
        {allSkills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: i * 0.04, 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.35, 
              y: -8,
              boxShadow: "0 0 25px rgba(0,245,255,0.6)"
            }}
            className="glass px-5 py-2.5 rounded-xl text-sm font-mono text-white/100 hover:text-[#00F5FF] transition-all duration-300 cursor-default border border-white/5 hover:border-[#00F5FF]/50"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[#00F5FF] font-mono text-sm tracking-wider mb-4 px-4 py-1.5 rounded-full glass"
          >
            [ SKILLS ]
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Technical <span className="neon-text-magenta">Expertise</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4 text-lg">
            A comprehensive tools and skills honed through years of building AI systems, ML pipelines, and full-stack applications.
          </p>
        </motion.div>

        {/* Flip Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <FlipCard key={category.name} category={category} index={i} />
          ))}
        </div>

        {/* Tech Arsenal */}
        <TechArsenal />
      </div>
    </section>
  )
}
