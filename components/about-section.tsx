"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const stats = [
  { label: "Years Experience", value: 1.5, suffix: "+" },
  { label: "Projects Built", value: 6, suffix: "+" },
  { label: "AI Models Deployed", value: 5, suffix: "+" },
  { label: "Happy Clients", value: 3, suffix: "+" },
]

const timeline = [
  {
    year: "Student",
    title: "Data Scientist",
    company: "Independent / Freelance",
    description: "Specialization in building predictive models and analyzing the complex data and building the Multi Agent systems and AI Agent that can work autonomously.",
    achievements: [
      "Built custom ML solutions increasing Business growthefficiency by 80%",
      "Designed and deployed 5+ AI models for real-world applications",
      "Deployed NLP & Computer Vision models into production environments"
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Scikit-learn"],
    availableForHire: true
  }
]

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-bold neon-text-cyan" style={{ fontFamily: "var(--font-space-grotesk)" }}>
      {count}{suffix}
    </span>
  )
}

function LiveAITerminal() {
  const [epoch, setEpoch] = useState(1);
  const [accuracy, setAccuracy] = useState(45.0);
  const [loss, setLoss] = useState(2.540);
  const [logText, setLogText] = useState("Initializing core system...");

  useEffect(() => {
    let currentEpoch = 1;
    const logs = [
      "Processing unstructured data...",
      "Optimizing neural weights...",
      "Calculating loss gradients...",
      "Applying backpropagation...",
      "Validating model performance...",
      "Extracting deep insights...",
      "Updating predictive parameters..."
      
    ];

    const interval = setInterval(() => {
      currentEpoch += Math.floor(Math.random() * 5) + 1;
      if (currentEpoch > 1000) currentEpoch = 1;

      setEpoch(currentEpoch);
      
      const progress = currentEpoch / 1000;
      const newAcc = 45 + (54.8 * Math.pow(progress, 0.5)) + (Math.random() * 0.2 - 0.1);
      setAccuracy(Math.min(99.9, newAcc));
      
      const newLoss = 2.5 * Math.pow(1 - progress, 2) + (Math.random() * 0.05);
      setLoss(Math.max(0.001, newLoss));
      
      if (Math.random() > 0.7) {
        setLogText(logs[Math.floor(Math.random() * logs.length)]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="hidden sm:flex absolute right-0 top-0 w-[45%] h-[90%] flex-col justify-center"
    >
      <div className="glass-strong rounded-xl border border-[#00F5FF]/30 w-full shadow-[0_0_30px_rgba(0,245,255,0.1)] group hover:shadow-[0_0_40px_rgba(123,47,255,0.2)] transition-all duration-500 relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00F5FF]/10 to-[#7B2FFF]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
        
        {/* Header */}
        <div className="bg-[#0A0A2A]/90 border-b border-[#00F5FF]/20 px-4 py-3 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <div className="text-xs font-mono text-[#00F5FF]/80 flex items-center">
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            ai_brain_training.py
          </div>
          <div className="w-12" /> {/* Spacer */}
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 font-mono text-xs md:text-sm flex flex-col gap-4 relative min-h-[300px] bg-[#020010]/80">
          
          {/* Hexagon watermark inside terminal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-700">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>

          <div className="text-white/85 leading-relaxed z-10">
            <span className="text-[#FF2CF0]">import</span> torch<br/>
            <span className="text-[#FF2CF0]">import</span> neural_networks <span className="text-[#FF2CF0]">as</span> dp<br/>
            <br/>
            <span className="text-[#7B2FFF]"># Initialize Data Scientist </span><br/>
            model = nn.DataScientist(<br/>
            &nbsp;&nbsp;skills=[<span className="text-[#00F5FF]">'Python'</span>, <span className="text-[#00F5FF]">'ML'</span>, <span className="text-[#00F5FF]">'Deep Learning'</span>],<br/>
            &nbsp;&nbsp;experience_years=<span className="text-[#00F5FF]">1.5+</span>,<br/>
            &nbsp;&nbsp;passion_level=<span className="text-[#00F5FF]">'Maximum'</span><br/>
            )<br/>
            <br/>
            <span className="text-[#7B2FFF]"># Start continuous learning & optimization</span><br/>
            model.optimize_business_impact(epochs=<span className="text-[#00F5FF]">1000</span>)<br/>
            <br/>
            <span className="text-[#00F5FF] animate-pulse">❯ {logText}</span>
          </div>
          
          <div className="mt-auto border-t border-[#00F5FF]/20 pt-5 z-10">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/70">Epoch {epoch}/1000</span>
              <span className="text-[#00F5FF] font-bold tracking-wider">Accuracy: {accuracy.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-[#0A0A2A] rounded-full overflow-hidden border border-[#00F5FF]/30 relative shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">
              {/* Animated bar */}
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7B2FFF] via-[#00F5FF] to-[#FF2CF0] transition-all duration-100 ease-linear"
                style={{ width: `${epoch / 10}%` }}
              />
              {/* Shine effect over the bar */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between text-xs mt-3 text-white/50">
              <span>Loss: <span className="text-green-400">{loss.toFixed(4)}</span></span>
              <span className="text-[#00F5FF] flex items-center font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00F5FF] mr-2 animate-ping" />
                STATUS: READY TO HIRE
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00F5FF] font-mono text-sm tracking-wider">[ ABOUT ME ]</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Turning Raw Data Into <span className="neon-text-violet">Intelligence Systems</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative rotating-border rounded-2xl p-1">
              <div className="relative glass-strong rounded-xl overflow-hidden aspect-square">
                {/* Placeholder for photo - using gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A2A] via-[#7B2FFF]/20 to-[#00F5FF]/10" />
                
                {/* Photo placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-92 h-100 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#7B2FFF] mx-auto mb-4 flex items-center justify-center">
                      <img 
        src="dheeraj.png" // अपनी फोटो का सही पाथ (path) यहाँ डालें
        alt="Dheeraj Prajapat" 
        className="w-full h-full object-cover rounded-full"
      />
                    </div>
                    <p className="text-[#00F5FF] text-xl sm:text-2xl font-mono font-bold tracking-wide mt-2">
  Dheeraj Prajapat
</p>
                  </div>
                </div>

                {/* Holographic shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              </div>
            </div>

            {/* Floating geometric shapes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-20 h-20 border border-[#00F5FF]/30 rounded-lg"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-6 -left-6 w-16 h-16 border border-[#7B2FFF]/30 rounded-full"
            />
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6">
                I&apos;m a passionate Data Scientist and AI Engineer with expertise in building 
                intelligent systems that solve real-world problems. My journey in tech has 
                been driven by curiosity and a relentless pursuit of innovation.
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
                From developing cutting-edge machine learning models to crafting full-stack 
                applications, I bridge the gap between complex algorithms and practical solutions. 
                I believe in the power of data to transform businesses and lives.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 mb-12"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass rounded-xl p-4 sm:p-6 text-center group hover:neon-border transition-all duration-300"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-white/60 text-xs sm:text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-32"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            My <span className="neon-text-cyan">Journey</span>
          </h3>

          <div className="relative">
            {/* Animated timeline line */}
            <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-white/10">
              <motion.div
                className="w-full bg-gradient-to-b from-[#00F5FF] to-[#7B2FFF]"
                style={{ height: lineHeight }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative pl-8 sm:pl-0 ${i % 2 === 0 ? "sm:pr-[52%]" : "sm:pl-[52%]"}`}
                >
                  {/* Node */}
                  <div className="absolute left-0 sm:left-1/2 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[#00F5FF]"
                    style={{ boxShadow: "0 0 10px #00F5FF, 0 0 20px #00F5FF" }}
                  />
                  
                  <div className="glass rounded-xl p-6 hover:neon-border transition-all duration-300 relative z-10 bg-[#0A0A2A]/60 backdrop-blur-md">
                    <div className="flex items-center flex-wrap gap-3">
                      <span className="text-[#00F5FF] font-mono text-sm">{item.year}</span>
                      {item.availableForHire && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/30 shadow-[0_0_10px_rgba(0,245,255,0.2)]">
                          <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5FF]"></span>
                          </span>
                          Available to Hire
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-white mt-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>{item.title}</h4>
                    <p className="text-[#7B2FFF] font-medium mt-1">{item.company}</p>
                    <p className="text-white/80 text-sm mt-3 leading-relaxed">{item.description}</p>
                    
                    {item.achievements && (
                      <ul className="mt-5 space-y-2">
                        {item.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start text-white/75 text-sm">
                            <span className="text-[#00F5FF] mr-2 mt-0.5">▹</span>
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.skills && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-xs rounded-full bg-[#0A0A2A] border border-[#7B2FFF]/30 text-[#7B2FFF] hover:bg-[#7B2FFF]/10 hover:border-[#7B2FFF] hover:text-white hover:shadow-[0_0_10px_rgba(123,47,255,0.3)] transition-all cursor-default">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {item.availableForHire && (
                      <div className="mt-7">
                        <a href="#contact" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold tracking-wide rounded-lg bg-gradient-to-r from-[#00F5FF] to-[#7B2FFF] text-black hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(123,47,255,0.6)]">
                          Hire Me Now
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT SIDE AI TERMINAL HUD */}
            <LiveAITerminal />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
