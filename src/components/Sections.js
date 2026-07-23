"use client";

import { motion } from "framer-motion";
import { 
  Mail, ChevronDown, Award, Briefcase, Code, User, Send, CheckCircle, 
  ExternalLink, Cpu, Brain, Database, Layers, GitBranch, Terminal, 
  Shield, Sparkles, Server, Zap, Target, BookOpen, Activity, Lock, X,
  Globe
} from "lucide-react";
import { useState, memo } from "react";

// Custom SVG Icons
const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LeetCodeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.102 17.93l-2.697 2.607c-.766.741-1.823 1.144-2.906 1.144s-2.14-.403-2.906-1.144l-4.325-4.179a4.269 4.269 0 01-1.229-3.023c0-1.142.443-2.215 1.229-3.023l4.325-4.179c.766-.741 1.823-1.144 2.906-1.144s2.14.403 2.906 1.144l2.697 2.607a.823.823 0 001.164-1.164l-2.697-2.607C13.255 3.659 11.758 3.1 10.193 3.1s-3.062.559-4.276 1.73L1.592 9.009C.378 10.18 0 11.66 0 13.255c0 1.595.378 3.075 1.592 4.246l4.325 4.179C7.131 22.851 8.628 23.41 10.193 23.41s3.062-.559 4.276-1.73l2.697-2.607a.823.823 0 00-1.164-1.144zM23.172 12.336a.823.823 0 000-1.164L18.42 6.42a.823.823 0 00-1.164 1.164l4.173 4.18-4.173 4.179a.823.823 0 101.164 1.164l4.752-4.751z" />
  </svg>
);

function Sections({ activeSection, onContactSubmit }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    if (onContactSubmit) onContactSubmit();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  // Projects data
  const projects = [
    {
      title: "Pharma AI Agent",
      emoji: "💊",
      stack: ["Python", "LangChain", "Multi-Agent AI", "OpenAI"],
      description: "Multi-agent network automating pharmacy workflows, clinical verification, and prescription analysis with high precision.",
      repo: "https://github.com/Khangulamgousamjat/Pharma-AI-Agent",
      live: "https://pharma-ai-agent-gk.vercel.app",
      highlight: "Multi-Agent Architecture"
    },
    {
      title: "Event Gous Kratos",
      emoji: "🛡️",
      stack: ["TypeScript", "Next.js", "Tailwind CSS", "REST API"],
      description: "Enterprise event management platform engineered for high-concurrency scaling, dynamic registration, and real-time portal monitoring.",
      repo: "https://github.com/Khangulamgousamjat/Event-Gous-Kratos",
      live: "https://event-gous-kratos.vercel.app",
      highlight: "High Concurrency Engine"
    },
    {
      title: "Food Waste Management",
      emoji: "🍎",
      stack: ["TypeScript", "React", "Node.js", "MongoDB"],
      description: "Real-time surplus food discovery and logistics connection platform bridging food donors, redistributors, and NGOs seamlessly.",
      repo: "https://github.com/Khangulamgousamjat/food-waste-management",
      live: "https://hungerlink-gk.vercel.app",
      highlight: "Real-time Surplus Match"
    },
    {
      title: "Student Socio Master",
      emoji: "👥",
      stack: ["Next.js", "Prisma", "NextAuth", "PostgreSQL", "Pusher"],
      description: "Modern social platform for students featuring nested comments, real-time messaging, post visibility controls, and secure NextAuth authentication.",
      repo: "https://github.com/Khangulamgousamjat/student-social-master",
      live: "https://student-social-master-gk.vercel.app",
      highlight: "Real-time Social Engine"
    },
    {
      title: "Resume Screening System",
      emoji: "📄",
      stack: ["Python", "NLP", "HTML5", "Scikit-Learn"],
      description: "AI-powered parsing tool automatically extracting, scoring, and ranking candidate resumes against target job descriptions.",
      repo: "https://github.com/Khangulamgousamjat/Resume-Screening-System",
      live: "https://resume-screening-system-gk.vercel.app",
      highlight: "NLP Ranking Engine"
    },
    {
      title: "Skill Developer",
      emoji: "🎓",
      stack: ["JavaScript", "GPT-4 API", "Node.js", "Chart.js"],
      description: "AI-driven intern development & monitoring platform featuring radar competency metrics, learning milestones, and AI feedback.",
      repo: "https://github.com/Khangulamgousamjat/Skill-Developer",
      live: "https://skill-developer.vercel.app",
      highlight: "GPT-4 Competency Radar"
    }
  ];

  // AI Modules Status
  const aiModules = [
    { name: "OpenAI API", icon: "🤖", status: "ACTIVE", color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40" },
    { name: "Gemini API", icon: "✨", status: "ACTIVE", color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40" },
    { name: "Prompt Engineering", icon: "🧠", status: "ONLINE", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40" },
    { name: "AI Application Dev", icon: "⚡", status: "RUNNING", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40" },
    { name: "Gen AI Systems", icon: "🚀", status: "LEARNING", color: "text-purple-400 border-purple-500/30 bg-purple-950/40" },
    { name: "LLM Engineering", icon: "🔥", status: "IN PROGRESS", color: "text-amber-400 border-amber-500/30 bg-amber-950/40" },
  ];

  // Focus Areas
  const focusAreas = [
    { title: "Advanced DSA", objective: "Solving LeetCode & mastering problem-solving patterns", status: "Active", color: "text-cyan-400 border-cyan-500/30" },
    { title: "Agentic AI & LLMs", objective: "Engineering autonomous multi-agent systems & RAG pipelines", status: "Active", color: "text-purple-400 border-purple-500/30" },
    { title: "Full Stack Systems", objective: "Building high-performance, responsive MERN applications", status: "In Progress", color: "text-emerald-400 border-emerald-500/30" },
    { title: "Open Source", objective: "Contributing to developer libraries and AI frameworks", status: "Active", color: "text-cyan-400 border-cyan-500/30" },
    { title: "Career Target", objective: "Preparing for Google Software Engineer technical tracks", status: "Locked In 🎯", color: "text-amber-400 border-amber-500/30" }
  ];

  return (
    <div className="relative z-10 w-full font-sans text-white select-none">
      
      {/* Section 1: Hero Identity Reveal */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center px-6 relative"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/60 bg-cyan-950/70 mb-6 shadow-[0_0_25px_rgba(34,211,238,0.35)]">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> GULAMGOUS.exe INITIALIZED // SYSTEM ONLINE
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-4"
          >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]">
              GULAMGOUS
            </span>{" "}
            <br className="md:hidden" />
            <span className="text-cyan-400 drop-shadow-[0_0_35px_rgba(34,211,238,0.6)]">
              KHAN
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="font-mono text-cyan-200 text-base md:text-xl tracking-wider mb-6 font-bold bg-black/60 py-2 px-6 rounded-full inline-block border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          >
            FULL STACK AI/ML ENGINEER // CSE GRADUATE
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Building intelligent software, multi-agent AI networks, and scalable full-stack applications.
            <br />
            <span className="text-purple-400 font-mono text-xs font-bold tracking-widest uppercase block mt-2">
              MISSION TARGET: GOOGLE SOFTWARE ENGINEER 2027 🎯
            </span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center items-center">
            <a
              href="#about"
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-black transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              data-interactive
            >
              <Cpu className="w-4 h-4" /> Access Neural Core
            </a>
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider border-2 border-purple-500/60 bg-purple-950/40 hover:bg-purple-900/60 hover:border-purple-400 transition-all font-bold active:scale-95 cursor-pointer text-purple-200 flex items-center gap-2"
              data-interactive
            >
              <Briefcase className="w-4 h-4" /> View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider border-2 border-white/60 hover:border-cyan-400 hover:bg-white/10 transition-all font-bold active:scale-95 cursor-pointer flex items-center gap-2"
              data-interactive
            >
              <Send className="w-4 h-4" /> Send Signal
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300 font-semibold bg-black/50 px-3 py-1 rounded-md border border-white/10">
            Scroll to Navigate
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </div>
      </section>

      {/* Section 2: About Digital Chamber */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative"
      >
        <div className="max-w-5xl w-full">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 font-mono text-sm text-cyan-300 tracking-[0.3em] uppercase mb-2 bg-black/60 px-3.5 py-1 rounded-md border border-cyan-500/30">
              <User className="w-4 h-4 text-cyan-400" /> Section 02 // Knowledge Chamber
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              CORE IDENTITY & SYSTEM SPECS
            </h2>
            <div className="h-[3px] w-32 bg-cyan-400 mt-4 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Card: Bio */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 p-8 rounded-2xl border-2 border-cyan-500/30 bg-[#040409]/95 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono text-cyan-400 text-sm uppercase tracking-widest mb-4 flex items-center gap-2 font-black border-b border-cyan-500/20 pb-2">
                  <Award className="w-4 h-4" /> CREDENTIALS & MISSION OVERVIEW
                </h3>
                
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
                  <div 
                    className="relative group shrink-0 cursor-zoom-in"
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-cyan-400/50 bg-black flex items-center justify-center">
                      <img 
                        src="/image.jpg" 
                        alt="Gulamgous Khan" 
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Interactive magnifying glass hover icon */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] text-cyan-300 font-black tracking-widest uppercase bg-black/80 px-2.5 py-1 rounded border border-cyan-400/40">
                          ZOOM
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-white text-base md:text-lg leading-relaxed font-medium text-justify">
                      Hello! I am <strong className="text-cyan-300">Gulamgous Khan</strong>, a Full Stack AI/ML Engineer and Computer Science Engineering Graduate dedicated to architecting next-generation intelligent software. I combine modern MERN stack application design with state-of-the-art Generative AI frameworks, Agentic systems, and high-performance REST APIs.
                    </p>
                  </div>
                </div>

                {/* Full-screen Lightbox Modal */}
                {isImageModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300">
                    <button 
                      onClick={() => setIsImageModalOpen(false)}
                      className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-cyan-400 transition-colors duration-200 cursor-pointer z-50 shadow-lg"
                      aria-label="Close modal"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div 
                      className="absolute inset-0 cursor-zoom-out" 
                      onClick={() => setIsImageModalOpen(false)}
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="relative z-10 max-w-4xl max-h-[85vh] p-4 flex flex-col items-center justify-center"
                    >
                      <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                        <img 
                          src="/image.jpg" 
                          alt="Gulamgous Khan - Full" 
                          className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-xl"
                        />
                      </div>
                      <div className="mt-4 font-mono text-[10px] md:text-xs text-cyan-300 font-bold uppercase tracking-widest bg-black/60 py-2 px-6 rounded-full border border-cyan-500/20 shadow-md">
                        GULAMGOUS KHAN // PROFILE ARTIFACT
                      </div>
                    </motion.div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20">
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1 font-bold">SPECIALIZATION</span>
                    <ul className="text-xs text-zinc-300 space-y-1 font-mono font-medium">
                      <li>• MERN Stack Development</li>
                      <li>• Generative AI Applications</li>
                      <li>• REST API Architecture</li>
                      <li>• Database & Vector Design</li>
                      <li>• Prompt Engineering</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
                    <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-1 font-bold">CURRENTLY LEARNING</span>
                    <ul className="text-xs text-zinc-300 space-y-1 font-mono font-medium">
                      <li>• Advanced DSA (LeetCode)</li>
                      <li>• Gen AI Systems</li>
                      <li>• LLM Applications</li>
                      <li>• Agentic AI Architectures</li>
                      <li>• Scalable System Design</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan-500/20 pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-0.5 font-black">
                    DEGREE / QUALIFICATION
                  </span>
                  <p className="text-base font-black text-white">B.Tech / B.E in Computer Science Engineering (CSE)</p>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-950/40 font-mono text-xs text-amber-300 font-bold self-start sm:self-auto">
                  CAREER GOAL: GOOGLE SWE 🎯
                </div>
              </div>
            </motion.div>

            {/* Right Card: Details & AI Modules */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border-2 border-purple-500/30 bg-[#040409]/95 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] space-y-6"
            >
              <div>
                <h3 className="font-mono text-purple-400 text-xs uppercase tracking-widest mb-3 font-black border-b border-purple-500/20 pb-1">
                  // SYSTEM DIAGNOSTICS
                </h3>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500 font-bold">ENTITY:</span>
                    <span className="text-white font-bold">Gulamgous Khan</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500 font-bold">HANDLE:</span>
                    <span className="text-cyan-300 font-bold">@Khangulamgousamjat</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500 font-bold">ROLE:</span>
                    <span className="text-purple-300 font-bold">Full Stack AI/ML Engineer</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500 font-bold">SYSTEM STATE:</span>
                    <span className="text-emerald-400 font-bold animate-pulse">RUNNING / ACTIVE</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold border-b border-cyan-500/20 pb-1">
                  🤖 AI MODULE STATUS
                </h3>
                <div className="space-y-2">
                  {aiModules.map((mod) => (
                    <div key={mod.name} className="flex items-center justify-between text-xs font-mono bg-black/60 p-2 rounded-lg border border-white/5">
                      <span className="text-white font-bold flex items-center gap-1.5">
                        <span>{mod.icon}</span> {mod.name}
                      </span>
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-black tracking-wider ${mod.color}`}>
                        {mod.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: Interactive Skills & Neural Stack Core */}
      <section
        id="skills"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative"
      >
        <div className="max-w-5xl w-full">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 font-mono text-sm text-cyan-300 tracking-[0.3em] uppercase mb-2 bg-black/60 px-3.5 py-1 rounded-md border border-cyan-500/30">
              <Code className="w-4 h-4 text-cyan-400" /> Section 03 // Central AI Core
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              NEURAL STACK & DSA MATRIX
            </h2>
            <div className="h-[3px] w-32 bg-cyan-400 mt-4 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>

          {/* Interactive Stack Badges */}
          <div className="mb-12 p-6 rounded-2xl border-2 border-cyan-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] text-center">
            <h3 className="font-mono text-cyan-400 text-xs uppercase tracking-widest mb-4 font-black">
              // REPOSITORY TECH STACK (LIVE ICONS)
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <img src="https://skillicons.dev/icons?i=python,js,ts,cpp,c,html,css,react,nextjs,nodejs,express,fastapi,flask" alt="Skills Stack Row 1" width="640" height="48" loading="lazy" decoding="async" className="max-w-full h-auto" />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
              <img src="https://skillicons.dev/icons?i=postgres,mongodb,sqlite,redis,supabase,firebase,docker,kubernetes,aws,gcp,azure,git,github,linux,bash" alt="Skills Stack Row 2" width="740" height="48" loading="lazy" decoding="async" className="max-w-full h-auto" />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
              <img src="https://skillicons.dev/icons?i=py,tensorflow,pytorch,opencv,postman,vscode,vercel,tailwind,bootstrap,figma" alt="Skills Stack Row 3" width="500" height="48" loading="lazy" decoding="async" className="max-w-full h-auto" />
            </div>
          </div>

          {/* DSA & Cognitive Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* LeetCode & DSA Patterns */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl border-2 border-amber-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-6">
                <h3 className="font-mono text-amber-400 text-sm uppercase tracking-widest font-black flex items-center gap-2">
                  <LeetCodeIcon className="w-5 h-5 text-amber-400" /> DATA STRUCTURES & ALGORITHMS
                </h3>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 font-mono text-xs text-amber-300 font-bold">
                  200+ Solved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20">
                  <span className="font-mono text-xs text-amber-300 font-bold block mb-2">🧠 Core Topics</span>
                  <ul className="text-xs text-zinc-300 space-y-1.5 font-semibold">
                    <li>🔹 Arrays & Strings</li>
                    <li>🔹 Linked Lists & Trees</li>
                    <li>🔹 Hash Maps & Graphs</li>
                    <li>🔹 BFS / DFS / Backtracking</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20">
                  <span className="font-mono text-xs text-amber-300 font-bold block mb-2">🚀 Advanced Patterns</span>
                  <ul className="text-xs text-zinc-300 space-y-1.5 font-semibold">
                    <li>⚡ Sliding Window & Two Pointers</li>
                    <li>⚡ Binary Search</li>
                    <li>⚡ Dynamic Programming</li>
                    <li>⚡ Recursion & Greedy Algorithms</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Architecture Tree */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-2xl border-2 border-cyan-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <div className="border-b border-cyan-500/20 pb-3 mb-6">
                <h3 className="font-mono text-cyan-400 text-sm uppercase tracking-widest font-black flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" /> SYSTEM ARCHITECTURE TREE
                </h3>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20">
                  <span className="text-cyan-300 font-bold block mb-1">💻 FULL STACK ENGINEERING</span>
                  <p className="text-zinc-300">JS/TS, Python, C++ • React, Next.js, Node.js, Express, FastAPI • Postgres, MongoDB, SQLite • Vercel, Railway, Git</p>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20">
                  <span className="text-purple-300 font-bold block mb-1">🤖 AI & COGNITIVE ARCHITECTURES</span>
                  <p className="text-zinc-300">LLM Apps & Prompt Engineering • Agentic AI & RAG • LangChain, LlamaIndex, Pinecone • NLP & Speech Models</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Interactive AI/ML & Full Stack Technology Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { 
                name: "Generative AI & LLMs", 
                category: "Agentic Systems, RAG Pipelines, LangChain & LlamaIndex", 
                level: "Expert", 
                color: "cyan",
                sub: "OpenAI, Gemini API, Vector DBs"
              },
              { 
                name: "Machine Learning & DL", 
                category: "TensorFlow, PyTorch, Scikit-Learn & Computer Vision", 
                level: "Advanced", 
                color: "purple",
                sub: "Neural Nets, NLP, Model Fine-Tuning"
              },
              { 
                name: "MERN & Web Architecture", 
                category: "React.js, Next.js, Node.js, Express.js & REST APIs", 
                level: "Expert", 
                color: "cyan",
                sub: "SSR/SSG, Tailwind, State Mgmt"
              },
              { 
                name: "Databases & Vector DBs", 
                category: "PostgreSQL, MongoDB, Pinecone, SQLite & Redis", 
                level: "Advanced", 
                color: "purple",
                sub: "ORM/ODMs, Vector Embeddings"
              },
              { 
                name: "Python & Backend Systems", 
                category: "Python 3.10+, FastAPI, Flask, Asyncio & WebSockets", 
                level: "Expert", 
                color: "cyan",
                sub: "Microservices & API Security"
              },
              { 
                name: "DevOps & Cloud Tools", 
                category: "Git, GitHub, Linux, Docker, Vercel & Postman", 
                level: "Advanced", 
                color: "purple",
                sub: "CI/CD Pipelines, Deployment"
              },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`p-6 rounded-xl border-2 bg-black/95 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all cursor-pointer ${
                  skill.color === "cyan" 
                    ? "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]" 
                    : "border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                }`}
                data-interactive
              >
                <div className="font-mono text-xs text-zinc-500 font-bold mb-1.5 flex items-center justify-between">
                  <span>NODE ID 0{index + 1}</span>
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${skill.color === "cyan" ? "text-cyan-400" : "text-purple-400"}`}>
                    {skill.sub}
                  </span>
                </div>
                <div className="font-black text-white text-lg md:text-xl mb-1.5">{skill.name}</div>
                <div className="text-xs text-zinc-300 leading-normal mb-3 font-semibold">{skill.category}</div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${skill.color === "cyan" ? "bg-cyan-400 animate-ping" : "bg-purple-400 animate-pulse"}`} />
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-black ${skill.color === "cyan" ? "text-cyan-300" : "text-purple-300"}`}>
                    {skill.level} STATUS
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Futuristic Project Lab */}
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative"
      >
        <div className="max-w-6xl w-full">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 font-mono text-sm text-purple-300 tracking-[0.3em] uppercase mb-2 bg-black/60 px-3.5 py-1 rounded-md border border-purple-500/30">
              <Briefcase className="w-4 h-4 text-purple-400" /> Section 04 // Engineering Lab
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              PROJECT DATABASE
            </h2>
            <div className="h-[3px] w-32 bg-purple-500 mt-4 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, index) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 rounded-2xl border-2 border-cyan-500/20 hover:border-cyan-400 bg-black/95 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{proj.emoji}</span>
                    <span className="px-2.5 py-0.5 rounded-full border border-purple-400/40 bg-purple-950/60 font-mono text-[10px] text-purple-300 font-bold">
                      {proj.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    {proj.title}
                  </h3>

                  <p className="text-zinc-300 text-xs leading-relaxed mb-4 font-medium">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.stack.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 font-mono text-[10px] text-cyan-300 font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <a
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-white/20 hover:border-cyan-400 bg-white/5 hover:bg-cyan-500/10 transition-all font-mono text-xs font-bold text-center flex items-center justify-center gap-2 cursor-pointer group-hover:border-cyan-400"
                    data-interactive
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400" /> Repo <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/40 transition-all font-mono text-xs font-bold text-center flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                      data-interactive
                    >
                      <Globe className="w-4 h-4 text-cyan-400" /> Live <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Current Focus & Objectives */}
      <section
        id="timeline"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative"
      >
        <div className="max-w-5xl w-full">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 font-mono text-sm text-cyan-300 tracking-[0.3em] uppercase mb-2 bg-black/60 px-3.5 py-1 rounded-md border border-cyan-500/30">
              <Target className="w-4 h-4 text-cyan-400" /> Section 05 // Mission Matrix
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              CURRENT FOCUS & ACTIVITY
            </h2>
            <div className="h-[3px] w-32 bg-cyan-400 mt-4 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>

          {/* Current Focus Table Card */}
          <div className="p-8 rounded-2xl border-2 border-cyan-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] mb-12">
            <h3 className="font-mono text-cyan-400 text-xs uppercase tracking-widest mb-6 font-black border-b border-cyan-500/20 pb-2">
              🎯 TARGET MATRIX & OBJECTIVES
            </h3>

            <div className="space-y-4">
              {focusAreas.map((area) => (
                <div key={area.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-cyan-950/20 border border-white/5 gap-2">
                  <div>
                    <span className="font-bold text-sm text-white block">{area.title}</span>
                    <span className="text-xs text-zinc-300">{area.objective}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-mono font-bold self-start sm:self-auto ${area.color}`}>
                    {area.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live GitHub Stats Cards */}
          <div className="p-8 rounded-2xl border-2 border-purple-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-center">
            <h3 className="font-mono text-purple-400 text-xs uppercase tracking-widest mb-6 font-black border-b border-purple-500/20 pb-2">
              📊 LIVE GITHUB ACTIVITY & METRICS
            </h3>

            <div className="flex flex-wrap justify-center items-center gap-6">
              <img 
                src="https://github-readme-stats-eight-theta.vercel.app/api?username=khangulamgousamjat&show_icons=true&theme=tokyonight&hide_border=true&bg_color=000000&title_color=00F0FF&icon_color=00F0FF&text_color=ffffff" 
                alt="GitHub Stats" 
                width="495"
                height="195"
                loading="lazy"
                decoding="async"
                className="max-w-full h-auto rounded-xl border border-white/10"
              />
              <img 
                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs?username=khangulamgousamjat&layout=compact&theme=tokyonight&hide_border=true&bg_color=000000&title_color=00F0FF&text_color=ffffff" 
                alt="Top Languages" 
                width="300"
                height="195"
                loading="lazy"
                decoding="async"
                className="max-w-full h-auto rounded-xl border border-white/10"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Contact Communication Terminal */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative"
      >
        <div className="max-w-5xl w-full">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 font-mono text-sm text-purple-300 tracking-[0.3em] uppercase mb-2 bg-black/60 px-3.5 py-1 rounded-md border border-purple-500/30">
              <Send className="w-4 h-4 text-purple-400" /> Section 06 // Access Terminal
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              COMMUNICATION TERMINAL
            </h2>
            <div className="h-[3px] w-32 bg-purple-500 mt-4 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            
            {/* Direct Links / Badges */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border-2 border-cyan-500/30 bg-[#040409]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6"
            >
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-4 font-black border-b border-cyan-500/20 pb-1">
                // NEURAL UPLINK DIRECTORY
              </h3>
              
              <div className="space-y-4">
                <a
                  href="https://github.com/Khangulamgousamjat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm text-white hover:text-cyan-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                    <GithubIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase block font-bold">GITHUB REPOSITORY</span>
                    <span className="font-bold text-sm">github.com/Khangulamgousamjat</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/gulamgous"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm text-white hover:text-purple-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 group-hover:border-purple-400 transition-colors">
                    <LinkedinIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase block font-bold">LINKEDIN NETWORK</span>
                    <span className="font-bold text-sm">linkedin.com/in/gulamgous</span>
                  </div>
                </a>

                <a
                  href="mailto:gousk2004@gmail.com"
                  className="flex items-center gap-3 group text-sm text-white hover:text-cyan-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase block font-bold">DIRECT EMAIL</span>
                    <span className="font-bold text-sm">gousk2004@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://leetcode.com/u/khangulamgous/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm text-white hover:text-amber-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/30 group-hover:border-amber-400 transition-colors">
                    <LeetCodeIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase block font-bold">LEETCODE PROFILE</span>
                    <span className="font-bold text-sm">leetcode.com/u/khangulamgous/</span>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Interactive Terminal Form */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl border-2 border-purple-500/30 bg-[#040409]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <h3 className="font-mono text-xs text-purple-400 uppercase tracking-widest mb-4 font-black border-b border-purple-500/20 pb-1 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> TRANSMIT SIGNAL TO GULAMGOUS
              </h3>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 animate-bounce" />
                  <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    SIGNAL RECEIVED & LOGGED
                  </span>
                  <p className="text-xs text-zinc-400">
                    Thank you for reaching out. Gulamgous will respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm font-mono text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">YOUR EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm font-mono text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">TRANSMISSION MESSAGE</label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Type your signal message..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm font-mono text-white outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 font-mono text-xs font-black tracking-widest text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer uppercase flex items-center justify-center gap-2"
                    data-interactive
                  >
                    <Send className="w-4 h-4" /> Transmit Packet
                  </button>
                </form>
              )}
            </motion.div>

          </div>

          {/* Terminal Footer Badge */}
          <div className="mt-16 text-center">
            <span className="font-mono text-xs text-cyan-400/80 bg-black/80 px-4 py-2 rounded-full border border-cyan-500/30">
              Gulamgous OS v3.0 | STATUS: ONLINE | MISSION: GOOGLE 2027
            </span>
          </div>

        </div>
      </section>
      
    </div>
  );
}

export default memo(Sections);

