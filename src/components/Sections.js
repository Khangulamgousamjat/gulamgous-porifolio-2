"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ChevronDown, Award, Briefcase, Code, User, Send, CheckCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

// Custom SVG Icons to avoid casing/version mismatches in lucide-react exports
const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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
    width="16"
    height="16"
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

export default function Sections({ activeSection, onContactSubmit }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-cyan-400 bg-cyan-950/70 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300 font-bold">
              NEURAL INTERFACE ONLINE
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-4"
          >
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]">
              NIKITA
            </span>{" "}
            <br className="md:hidden" />
            <span className="text-cyan-400 drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]">
              JAMODKAR
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-mono text-cyan-200 text-base md:text-xl tracking-widest mb-10 max-w-2xl mx-auto font-bold bg-black/40 py-1.5 px-4 rounded-full inline-block border border-white/5"
          >
            CS Diploma Student // Developer & Designer
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 justify-center items-center">
            <a
              href="#about"
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-white font-black transition-all shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
              data-interactive
            >
              Access System Core
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full font-mono text-xs tracking-wider border-2 border-white hover:border-cyan-400 hover:bg-white/10 transition-all font-bold active:scale-95 cursor-pointer"
              data-interactive
            >
              Send Signal
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
              CORE IDENTITY
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
                  <Award className="w-4 h-4" /> CREDENTIALS & BIOGRAPHY
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed mb-6 font-medium">
                  Hello! I am a passionate Computer Science diploma student based in India, dedicated to exploring the intersection of modern front-end technologies and robust engineering. 
                  My goal is to translate complex technical problems into fluid, engaging, and premium digital systems.
                </p>
              </div>

              <div className="border-t border-cyan-500/20 pt-4 mt-4">
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-1 font-black">
                  CURRENT EDUCATION
                </span>
                <p className="text-base md:text-lg font-black text-white">Diploma in Engineering (Computer Science)</p>
                <p className="font-mono text-xs text-cyan-300 font-bold">Maharashtra State Board of Technical Education</p>
              </div>
            </motion.div>

            {/* Right Card: Details */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border-2 border-purple-500/30 bg-[#040409]/95 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] space-y-6"
            >
              <div>
                <h3 className="font-mono text-purple-400 text-xs uppercase tracking-widest mb-3 font-black border-b border-purple-500/20 pb-1">
                  SYSTEM INFO
                </h3>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500 font-bold">USER:</span>
                    <span className="text-white font-bold">Nikita Jamodkar</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500 font-bold">ROLES:</span>
                    <span className="text-cyan-300 font-bold">Developer & Designer</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-zinc-500 font-bold">INTERESTS:</span>
                    <span className="text-purple-300 font-bold">Development, UI/UX</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-cyan-400 text-xs uppercase tracking-widest mb-2.5 font-bold">
                  LANGUAGES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["English", "Hindi", "Marathi"].map((lang) => (
                    <span key={lang} className="px-3.5 py-1 rounded-md border-2 border-cyan-500/20 bg-cyan-950/60 font-mono text-xs text-cyan-300 font-bold">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-purple-400 text-xs uppercase tracking-widest mb-2.5 font-bold">
                  HOBBIES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Reading", "Drawing", "Dancing"].map((hobby) => (
                    <span key={hobby} className="px-3.5 py-1 rounded-md border-2 border-purple-500/20 bg-purple-950/60 font-mono text-xs text-purple-300 font-bold">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: Interactive Skills Core */}
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
              TECHNOLOGY MATRIX
            </h2>
            <div className="h-[3px] w-32 bg-cyan-400 mt-4 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto z-10 relative">
            {[
              { name: "Python", category: "Core Backend / Diagnostic Scripts", level: "Expert", color: "cyan" },
              { name: "HTML & CSS", category: "Structural & Layout Design", level: "Advanced", color: "purple" },
              { name: "JavaScript", category: "Dynamic Interactive Frontend", level: "Intermediate", color: "cyan" },
              { name: "C / C++", category: "System Programming Foundations", level: "Competent", color: "purple" },
              { name: "UI Design", category: "Futuristic Cyber-Aesthetics", level: "Expert", color: "cyan" },
              { name: "Development", category: "Full-Stack Project Pipeline", level: "Advanced", color: "purple" },
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
                <div className="font-mono text-xs text-zinc-500 font-bold mb-1.5">NODE ID 0{index + 1}</div>
                <div className="font-black text-white text-lg md:text-xl mb-1.5">{skill.name}</div>
                <div className="text-xs text-zinc-300 leading-normal mb-3 font-semibold">{skill.category}</div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${skill.color === "cyan" ? "bg-cyan-400 animate-ping" : "bg-purple-400 animate-pulse"}`} />
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-black ${skill.color === "cyan" ? "text-cyan-300" : "text-purple-300"}`}>
                    {skill.level}
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
        <div className="max-w-5xl w-full">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 font-mono text-sm text-purple-300 tracking-[0.3em] uppercase mb-2 bg-black/60 px-3.5 py-1 rounded-md border border-purple-500/30">
              <Briefcase className="w-4 h-4 text-purple-400" /> Section 04 // Engineering Lab
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              PROJECT ARCHIVE
            </h2>
            <div className="h-[3px] w-32 bg-purple-500 mt-4 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            {/* Showcase card */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7 p-8 rounded-2xl border-2 border-cyan-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-md bg-purple-950/70 border border-purple-500/50 font-mono text-xs text-purple-300 font-bold">
                  HARDWARE & SOFTWARE
                </span>
                <span className="px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/50 font-mono text-xs text-cyan-300 font-bold">
                  PYTHON
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                Motion Detector Alarm Sensor
              </h3>

              <p className="text-white text-sm md:text-base leading-relaxed mb-6 font-medium">
                A custom security system combining hardware triggers with software control pipelines. Utilizing motion sensors linked to a python backend, the system monitors environments, processes real-time polling data, handles state detection, and dispatches instant visual/digital notifications upon threshold violations.
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2.5 text-sm text-zinc-100 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Real-time polling sensor state and threshold calibration</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-zinc-100 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Automated alerts & log management pipeline</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-zinc-100 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Interactive web Dashboard for active feed logs</span>
                </div>
              </div>
            </motion.div>

            {/* Technical stats */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 p-8 rounded-2xl border-2 border-purple-500/30 bg-[#040409]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] font-mono text-xs space-y-4"
            >
              <div className="text-cyan-400 font-black uppercase border-b border-cyan-500/20 pb-2.5 text-sm tracking-widest">
                // TECHNICAL ARCHIVE
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-bold block">DEVICE TYPE:</span>
                <span className="text-white font-bold block text-sm">Active Infrared & Motion HUD</span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-bold block">PIPELINE STACK:</span>
                <span className="text-cyan-300 font-bold block text-xs">Python 3.10 / OpenCV / Threading / WebSockets</span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-bold block">STATUS:</span>
                <span className="text-purple-400 animate-pulse font-black text-sm tracking-wide">SYSTEM NOMINAL</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Timeline Path */}
      <section
        id="timeline"
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative"
      >
        <div className="max-w-5xl w-full">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 font-mono text-sm text-cyan-300 tracking-[0.3em] uppercase mb-2 bg-black/60 px-3.5 py-1 rounded-md border border-cyan-500/30">
              <Award className="w-4 h-4 text-cyan-400" /> Section 05 // History Log
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              TIMELINE MILESTONES
            </h2>
            <div className="h-[3px] w-32 bg-cyan-400 mt-4 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
            
            {/* Milestone 1: Python Training */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border-2 border-cyan-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            >
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-cyan-950/90 border-2 border-cyan-400/50 font-mono text-[10px] text-cyan-300 font-bold">
                EDUCATION & DEV
              </div>
              <span className="font-mono text-xs text-cyan-400 font-black block mb-1">01 / TRAINEE</span>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3">Python Developer Training</h3>
              <p className="text-white text-sm leading-relaxed font-semibold">
                Completed exhaustive training in python architectures, focusing on asynchronous programming, data analytics pipelines, and secure web application frameworks.
              </p>
            </motion.div>

            {/* Milestone 2: Plant Training Internship */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl border-2 border-purple-500/30 bg-black/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            >
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-purple-950/90 border-2 border-purple-400/50 font-mono text-[10px] text-purple-300 font-bold">
                INTERNSHIP
              </div>
              <span className="font-mono text-xs text-purple-400 font-black block mb-1">02 / INTERN</span>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3">Plant Training Internship</h3>
              <p className="text-white text-sm leading-relaxed font-semibold">
                Applied programming and diagnostic pipelines in an industrial plant environment. Designed dashboard utilities to read, aggregate, and represent machinery output diagnostics.
              </p>
            </motion.div>

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
              <Send className="w-4 h-4 text-purple-400" /> Section 06 // Uplink Terminal
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              COMMUNICATION CONSOLE
            </h2>
            <div className="h-[3px] w-32 bg-purple-500 mt-4 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
          </div>

          <div className="max-w-xl mx-auto w-full">
            {/* Contact details */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl border-2 border-cyan-500/30 bg-[#040409]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6"
            >
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-4 font-black border-b border-cyan-500/20 pb-1">
                // NODE DIRECTORY
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:nikitajamodkar12@gmail.com"
                  className="flex items-center gap-3 group text-sm text-white hover:text-cyan-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2 rounded-lg bg-cyan-950/60 border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="font-bold text-xs md:text-sm">nikitajamodkar12@gmail.com</span>
                </a>

                <a
                  href="tel:+919322407834"
                  className="flex items-center gap-3 group text-sm text-white hover:text-purple-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2 rounded-lg bg-purple-950/60 border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="font-bold text-sm">+91 93224 07834</span>
                </a>

                <a
                  href="https://wa.me/919322407834?text=Hello%20Nikita,%20I%20saw%20your%20cinematic%20portfolio%20and%20would%20love%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm text-white hover:text-cyan-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2 rounded-lg bg-cyan-950/60 border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="font-bold text-sm">WhatsApp Uplink</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/nikita-jamodkar-570aa1357?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm text-white hover:text-purple-300 transition-colors"
                  data-interactive
                >
                  <div className="p-2 rounded-lg bg-purple-950/60 border-2 border-purple-500/30 group-hover:border-purple-400 transition-colors">
                    <LinkedinIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="font-bold text-sm">LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
