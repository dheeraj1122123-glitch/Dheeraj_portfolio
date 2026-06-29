"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "House price predictor system",
    category: "AI/ML",
    description: "ML-powered business intelligence dashboard with real-time predictions and automated insights generation.",
    fullDescription: "A comprehensive analytics platform that leverages machine learning to provide predictive business intelligence. Features include automated anomaly detection, trend forecasting, and natural language query capabilities.",
    techStack: ["Python", "Scikit-Learn", "HTML/CSS", "SQL", "Streamlit"],
    features: ["Real-time predictions", "Automated insights", "Custom dashboards", "API integrations"],
    color: "#00F5FF",
    github: "https://github.com/dheeraj1122123-glitch/house-price-Indore-",
    demo: "#",
  },
  {
    id: 2,
    title: "Whatsapp AI Agent",
    category: "Generative AI",
    description: "GPT-powered intelligent chatbot with memory, context awareness, and multi-modal capabilities.",
    fullDescription: "An advanced conversational AI system built with state-of-the-art language models. Features include long-term memory, contextual understanding, and seamless integration with enterprise systems.",
    techStack: ["LangChain", "OpenAI", "Next.js", "Agent", "Redis"],
    features: ["Context memory", "OWN API", "Custom personas", "Own database integration"],
    color: "#7B2FFF",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Smart student Analysis System",
    category: "AI/ML",
    description: "Analysing the data of the students.",
    fullDescription: "A production-grade ML model that predict the student's performance based on the data of the students and show that he will pas or not.",
    techStack: ["Django", "Scikit-Learn", "Pandas", "SQL", "FastAPI"],
    features: ["Accurate predictions", "Multi-feature analysis", "Edge deployment", "Custom training"],
    color: "#FF2CF0",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "3D Portfollio",
    category: "Web",
    description: "Interactive and Atractive 3D portfollio website.",
    fullDescription: "A powerful and profesion with advance tool website design that atracts the recruiter.",
    techStack: ["Three.js", "React", "D3.js", "WebGL", "TypeScript"],
    features: ["3D rendering", "Interactive robot", "Large data support", "Custom shaders"],
    color: "#00F5FF",
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Generative AI Content Studio",
    category: "Generative AI",
    description: "Multi-modal AI content creation platform for text, images, and video generation.",
    fullDescription: "An all-in-one creative studio powered by generative AI. Create marketing content, product images, and video clips using natural language prompts and intuitive controls.",
    techStack: ["Stable Diffusion", "GPT-4", "Next.js", "AWS", "FFmpeg"],
    features: ["Text generation", "Image synthesis", "Video creation", "Brand customization"],
    color: "#7B2FFF",
    github: "#",
    demo: "#",
  },
  {
    id: 6,
    title: "Predictive ML Pipeline",
    category: "Data",
    description: "End-to-end automated machine learning system with model versioning and deployment.",
    fullDescription: "A complete MLOps pipeline that automates the entire machine learning lifecycle from data ingestion to model deployment. Features automated retraining and A/B testing.",
    techStack: ["MLflow", "Airflow", "Kubernetes", "Scikit-learn", "DVC"],
    features: ["AutoML", "Model versioning", "A/B testing", "Auto-scaling"],
    color: "#FF2CF0",
    github: "#",
    demo: "#",
  },
]

const categories = ["All", "AI/ML", "Generative AI", "Web", "Data"]

function ProjectCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl overflow-hidden h-full"
        style={{
          borderColor: isHovered ? project.color : "transparent",
          boxShadow: isHovered ? `0 20px 40px ${project.color}20, 0 0 20px ${project.color}10` : "none",
        }}
      >
        {/* Project preview area */}
        <div 
          className="h-48 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}20, transparent)` }}
        >
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `
              linear-gradient(${project.color}20 1px, transparent 1px),
              linear-gradient(90deg, ${project.color}20 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }} />
          
          {/* Project icon/visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isHovered ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                boxShadow: `0 0 30px ${project.color}50`
              }}
            >
              <span className="text-2xl font-bold text-white">{project.title.charAt(0)}</span>
            </motion.div>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4"
          >
            <span className="text-white font-semibold text-sm">Click to view full details</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category tag */}
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3"
            style={{ 
              backgroundColor: `${project.color}20`,
              color: project.color,
            }}
          >
            {project.category}
          </span>

          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {project.title}
          </h3>
          
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/5 rounded text-xs text-white/70"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/70">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto glass-strong rounded-2xl"
        style={{ boxShadow: `0 0 50px ${project.color}30` }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div 
          className="h-48 relative"
          style={{ background: `linear-gradient(135deg, ${project.color}30, transparent)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                boxShadow: `0 0 40px ${project.color}60`
              }}
            >
              <span className="text-3xl font-bold text-white">{project.title.charAt(0)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-4"
            style={{ backgroundColor: `${project.color}20`, color: project.color }}
          >
            {project.category}
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            {project.title}
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3">Key Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.features.map((feature) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span style={{ color: project.color }}>✓</span>
                  <span className="text-white/70 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 glass rounded-lg text-sm text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 glass rounded-lg text-center font-semibold text-white hover:neon-border transition-all"
            >
              View Code
            </motion.a>
            <motion.a
              href={project.demo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-lg text-center font-semibold text-black"
              style={{ 
                background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                boxShadow: `0 0 20px ${project.color}40`
              }}
            >
              Live Demo
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#00F5FF] font-mono text-sm tracking-wider">[ PROJECTS ]</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Featured <span className="neon-text-cyan">Work</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4">
            A showcase of projects that shows my knowledge and expertise in AI, machine learning, and full-stack development.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeFilter === category
                  ? "bg-[#00F5FF] text-black"
                  : "glass text-white/70 hover:text-white"
              }`}
              style={{
                boxShadow: activeFilter === category ? "0 0 20px rgba(0,245,255,0.4)" : "none"
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
