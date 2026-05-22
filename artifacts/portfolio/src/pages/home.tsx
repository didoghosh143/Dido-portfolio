import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Terminal, Mail, Linkedin, MessageCircle } from "lucide-react";
import { SiGithub, SiDiscord } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import profilePhoto from "@assets/Untitled_(LinkedIn_Profile_Picture)_20260115_100743_0000_1779420104799.png";


const SOCIAL_LINKS = {
  github: "https://github.com/didoghosh143",
  linkedin: "https://www.linkedin.com/in/thedido",
  discord: "https://discord.com/users/944944458917617755",
  email: "mailto:didoghosh143@gmail.com",
  phone: "tel:+917583952349"
};

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(123, 47, 247, 0.5)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 47, 247, ${0.3 * (1 - dist / 150)})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 z-0 pointer-events-none"
    />
  );
}

export default function Home() {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#7b2ff7] selection:text-black relative overflow-x-hidden">
      {/* SECTION 0 - Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(123,47,247,0.2)_0%,rgba(0,0,0,0)_70%)] animate-orb blur-3xl" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(123,47,247,0.12)_0%,rgba(0,0,0,0)_70%)] animate-orb blur-3xl" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(123,47,247,0.12)_0%,rgba(168,85,247,0.08)_70%)] animate-orb blur-3xl" style={{ animationDelay: '-10s' }} />
        
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#7b2ff7] to-transparent opacity-[0.03] animate-[scan-line_8s_linear_infinite]" style={{ top: '0%' }} />
      </div>

      <ParticleCanvas />

      {/* SECTION 1 - Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#7b2ff7]/20 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} data-testid="nav-logo">
            <img src={profilePhoto} alt="Deep Ghosh" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#7b2ff7]/60" />
            <span className="font-['Space_Grotesk'] text-base font-bold text-white tracking-wide">Deep Ghosh</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/70">
            <button onClick={() => scrollTo('about')} className="hover:text-[#7b2ff7] transition-colors" data-testid="nav-about">About</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-[#7b2ff7] transition-colors" data-testid="nav-skills">Skills</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-[#7b2ff7] transition-colors" data-testid="nav-projects">Projects</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#7b2ff7] transition-colors" data-testid="nav-contact">Contact</button>
          </div>
          <button 
            onClick={() => scrollTo('contact')}
            className="hidden md:block px-5 py-2 font-mono text-xs uppercase tracking-widest text-[#7b2ff7] border border-[#7b2ff7]/50 rounded hover:bg-[#7b2ff7]/10 hover:glow-cyan transition-all"
            data-testid="nav-hire"
          >
            Hire Me
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col gap-32 pb-32">
        {/* SECTION 2 - Hero */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-[60%] flex flex-col items-start gap-6">
              {/* Mobile-only profile photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex md:hidden self-center relative mb-2"
              >
                <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.7) 0%, transparent 70%)' }} />
                <div className="relative w-28 h-28 rounded-full p-[3px]" style={{ background: 'conic-gradient(from 0deg, #7b2ff7, #a855f7, #c084fc, transparent, #7b2ff7)', animation: 'rotate-ring 6s linear infinite' }}>
                  <img
                    src={profilePhoto}
                    alt="Deep Ghosh"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#7b2ff7] animate-pulse" />
                <span className="font-mono text-xs text-white/80">👋 Hello, I'm</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-['Space_Grotesk'] text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter"
              >
                <span className="text-white inline-block w-full" style={{textShadow: '0 0 40px rgba(255,255,255,0.15)'}}>Deep Ghosh</span>
              </motion.h1>

              <div className="h-8 md:h-10">
                <TypeAnimation
                  sequence={[
                    "Computer Engineering Student", 1000,
                    "AI Agent Engineer in Training", 1000,
                    "React & Node.js Developer", 1000,
                    "API Integration Enthusiast", 1000,
                  ]}
                  wrapper="div"
                  speed={50}
                  className="font-mono text-xl md:text-2xl text-[#7b2ff7]"
                  repeat={Infinity}
                  cursor={true}
                />
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-mono text-sm text-white/60 max-w-lg leading-relaxed"
              >
                Building intelligent systems at the intersection of code and AI.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-4 mt-4"
              >
                <button 
                  onClick={() => scrollTo('projects')}
                  className="px-8 py-3 rounded bg-gradient-to-r from-[#7b2ff7] to-[#7b2ff7] text-white font-mono text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
                  data-testid="btn-view-work"
                >
                  View My Work
                </button>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="px-8 py-3 rounded glass-card border-[#7b2ff7]/50 font-mono text-sm font-bold uppercase tracking-wide text-white hover:bg-[#7b2ff7]/10 hover:glow-cyan transition-all"
                  data-testid="btn-connect"
                >
                  Let's Connect
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 mt-8"
              >
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#7b2ff7] hover:glow-cyan-text transition-all" data-testid="social-github"><SiGithub size={24} /></a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#7b2ff7] hover:glow-cyan-text transition-all" data-testid="social-linkedin"><Linkedin size={24} /></a>
                <a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" className="text-white/50 hover:text-[#7b2ff7] hover:glow-cyan-text transition-all" data-testid="social-discord"><SiDiscord size={24} /></a>
                <a href={SOCIAL_LINKS.email} className="text-white/50 hover:text-[#7b2ff7] hover:glow-cyan-text transition-all" data-testid="social-email"><Mail size={24} /></a>
              </motion.div>
            </div>

            <div className="hidden md:flex w-[40%] justify-center items-center relative min-h-[420px]">
              {/* Outer slow-spinning gradient ring */}
              <div className="absolute w-[420px] h-[420px] rounded-full animate-[rotate-ring_8s_linear_infinite]"
                style={{ background: 'conic-gradient(from 0deg, #7b2ff7, #a855f7, #c084fc, transparent, #7b2ff7)', padding: '3px', borderRadius: '50%' }}>
                <div className="w-full h-full rounded-full bg-black" />
              </div>
              {/* Inner counter-spinning ring */}
              <div className="absolute w-[390px] h-[390px] rounded-full animate-[rotate-ring_14s_linear_infinite_reverse] opacity-40"
                style={{ background: 'conic-gradient(from 180deg, #a855f7, transparent, #7b2ff7, transparent)', padding: '1px', borderRadius: '50%' }}>
                <div className="w-full h-full rounded-full bg-transparent" />
              </div>
              {/* Glow blob behind photo */}
              <div className="absolute w-[300px] h-[300px] rounded-full blur-3xl z-0"
                style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.6) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)' }} />
              {/* Floating particles ring — 8 small dots orbiting */}
              {[...Array(8)].map((_, i) => (
                <div key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#a855f7] opacity-70"
                  style={{
                    animation: `rotate-ring ${6 + i * 0.4}s linear infinite`,
                    transformOrigin: '0 0',
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateX(210px) translateY(-4px)`,
                    boxShadow: '0 0 6px #a855f7, 0 0 12px #7b2ff7',
                  }}
                />
              ))}
              {/* Profile photo */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[320px] h-[320px] rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(123,47,247,0.5), 0 0 80px rgba(123,47,247,0.2)' }}
              >
                <img
                  src={profilePhoto}
                  alt="Deep Ghosh"
                  className="w-full h-full object-cover rounded-full"
                  data-testid="profile-photo"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - About */}
        <section id="about" className="max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* Terminal */}
            <motion.div variants={itemVariants} className="w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-white/40">~/about.md</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed text-[#7b2ff7]/80">
                <p className="mb-2"><span className="text-white/40">&gt;</span> whoami</p>
                <p className="text-white mb-6">Deep Ghosh — Computer Engineering student, AI Agent Engineer</p>
                
                <p className="mb-2"><span className="text-white/40">&gt;</span> cat bio.txt</p>
                <p className="text-white/80 mb-2">I'm building autonomous systems that think, plan, and act.</p>
                <p className="text-white/80 mb-2">I've immersed myself in the AI ecosystem — LLM APIs, agentic workflows, and exploring what's possible when code meets intelligence.</p>
                <p className="text-white/80 mb-6">I believe the next generation of software will be AI-native, and I'm positioning myself right at that intersection.</p>
                
                <p className="mb-2"><span className="text-white/40">&gt;</span> cat location.txt</p>
                <p className="text-white mb-2">West Bengal, India</p>
                <p className="animate-pulse">_</p>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "🤖", title: "AI Tools", desc: "ChatGPT, Claude, Gemini, Perplexity" },
                { icon: "🔌", title: "APIs", desc: "OpenAI, Gemini, Mistral, Anthropic" },
                { icon: "🎓", title: "Education", desc: "Computer Engineering + AI Agent Engineering" },
                { icon: "⚡", title: "Focus", desc: "LLM Apps, Agentic AI, Full-Stack" }
              ].map((card, i) => (
                <motion.div key={i} variants={itemVariants} className="glass-card p-6 rounded-xl hover:glow-cyan hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-white">{card.title}</h3>
                  <p className="font-mono text-xs text-white/60 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 4 - Skills */}
        <section id="skills" className="max-w-7xl mx-auto px-6 w-full">
          <div className="mb-12">
            <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide inline-block relative group">
              <span className="text-[#7b2ff7] mr-2">//</span>Tech Stack & Skills
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#7b2ff7] to-[#7b2ff7] transform origin-left transition-transform duration-300" />
            </h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
            className="flex flex-col gap-6"
          >
            {[
              { title: "Frontend", skills: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Vue.js"] },
              { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Python"] },
              { title: "AI & LLM", skills: ["LangChain", "OpenAI API", "Gemini API", "Mistral API", "Anthropic API", "Prompt Engineering", "RAG", "Agentic Workflows"] },
              { title: "AI Tools", skills: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Replit AI", "GitHub Copilot"] },
              { title: "Dev Tools", skills: ["Git", "GitHub", "VS Code", "Postman"] }
            ].map((cat, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-full md:w-48 shrink-0">
                  <h3 className="font-bold text-white/80 uppercase tracking-wider text-sm">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-['JetBrains_Mono'] text-xs text-white/80 hover:border-[#7b2ff7] hover:text-[#7b2ff7] hover:bg-[#7b2ff7]/10 hover:glow-cyan transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 5 - Projects */}
        <section id="projects" className="max-w-7xl mx-auto px-6 w-full">
          <div className="mb-12">
            <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide">
              <span className="text-[#7b2ff7] mr-2">//</span>My Projects
            </h2>
            <p className="text-white/50 font-mono text-sm mt-4">Building in public — projects coming soon</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map(i => (
              <motion.div key={i} variants={itemVariants} className="glass-card rounded-xl overflow-hidden group">
                <div className="h-48 relative bg-gradient-to-br from-black to-white/5 flex items-center justify-center border-b border-white/10">
                  <Terminal size={48} className="text-white/20 group-hover:text-[#7b2ff7]/50 transition-colors" />
                  <div className="absolute top-4 right-4 px-2 py-1 border border-[#7b2ff7] text-[#7b2ff7] text-[10px] font-mono uppercase tracking-widest rounded animate-pulse bg-[#7b2ff7]/10">
                    🚧 Coming Soon
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Project TBA</h3>
                  <p className="text-sm text-white/60 mb-6 h-10">Currently in development. Check back soon.</p>
                  <div className="flex items-center gap-3">
                    <button disabled className="px-4 py-2 bg-white/5 text-white/40 text-xs font-bold uppercase rounded cursor-not-allowed border border-white/10">GitHub</button>
                    <button disabled className="px-4 py-2 bg-white/5 text-white/40 text-xs font-bold uppercase rounded cursor-not-allowed border border-white/10">Live Demo</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="font-mono text-xs text-white/40 mt-8 text-center">Projects are actively being built. Follow @didoghosh143 on GitHub.</p>
        </section>


        {/* SECTION 7 - Contact */}
        <section id="contact" className="max-w-7xl mx-auto px-6 w-full">
          <div className="mb-12">
            <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide">
              <span className="text-[#7b2ff7] mr-2">//</span>Let's Build Something
            </h2>
            <p className="text-white/60 font-mono text-sm mt-4 max-w-2xl">Whether it's a project collaboration, an opportunity, or just a conversation about AI — I'm always open.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <a href={SOCIAL_LINKS.email} className="glass-card p-4 rounded-xl flex items-center gap-4 hover:glow-cyan hover:-translate-y-1 transition-all group overflow-hidden">
                <Mail className="text-white/40 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Email</div>
                  <div className="text-white font-mono group-hover:text-[#7b2ff7] transition-colors truncate">didoghosh143@gmail.com</div>
                </div>
              </a>
              <a href={SOCIAL_LINKS.phone} className="glass-card p-4 rounded-xl flex items-center gap-4 hover:glow-cyan hover:-translate-y-1 transition-all group overflow-hidden">
                <span className="text-white/40 shrink-0 text-lg">📞</span>
                <div className="min-w-0">
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Phone</div>
                  <div className="text-white font-mono group-hover:text-[#7b2ff7] transition-colors truncate">+91 7583952349</div>
                </div>
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="glass-card p-4 rounded-xl flex items-center gap-4 hover:glow-cyan hover:-translate-y-1 transition-all group overflow-hidden">
                <Linkedin className="text-white/40 shrink-0" size={24} />
                <div className="min-w-0">
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">LinkedIn</div>
                  <div className="text-white font-mono group-hover:text-[#7b2ff7] transition-colors truncate">linkedin.com/in/thedido</div>
                </div>
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="glass-card p-4 rounded-xl flex items-center gap-4 hover:glow-cyan hover:-translate-y-1 transition-all group overflow-hidden">
                <SiGithub className="text-white/40 shrink-0" size={24} />
                <div className="min-w-0">
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">GitHub</div>
                  <div className="text-white font-mono group-hover:text-[#7b2ff7] transition-colors truncate">github.com/didoghosh143</div>
                </div>
              </a>
              <a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" className="glass-card p-4 rounded-xl flex items-center gap-4 hover:glow-cyan hover:-translate-y-1 transition-all group overflow-hidden">
                <SiDiscord className="text-white/40 shrink-0" size={24} />
                <div className="min-w-0">
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Discord</div>
                  <div className="text-white font-mono group-hover:text-[#7b2ff7] transition-colors truncate">discord.com/users/944944458917617755</div>
                </div>
              </a>
            </div>

            <form onSubmit={handleContactSubmit} className="glass-card p-8 rounded-xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/60 font-bold">Name</label>
                <input required type="text" className="glass-card bg-transparent px-4 py-3 rounded-lg outline-none focus:border-[#7b2ff7] focus:glow-cyan transition-all font-mono text-sm" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/60 font-bold">Email</label>
                <input required type="email" className="glass-card bg-transparent px-4 py-3 rounded-lg outline-none focus:border-[#7b2ff7] focus:glow-cyan transition-all font-mono text-sm" placeholder="your@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/60 font-bold">Subject</label>
                <input required type="text" className="glass-card bg-transparent px-4 py-3 rounded-lg outline-none focus:border-[#7b2ff7] focus:glow-cyan transition-all font-mono text-sm" placeholder="What is this regarding?" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-white/60 font-bold">Message</label>
                <textarea required rows={5} className="glass-card bg-transparent px-4 py-3 rounded-lg outline-none focus:border-[#7b2ff7] focus:glow-cyan transition-all font-mono text-sm resize-none" placeholder="Hello..." />
              </div>
              <button type="submit" className="w-full py-4 mt-2 rounded-lg bg-gradient-to-r from-[#7b2ff7] to-[#7b2ff7] text-white font-bold uppercase tracking-widest text-sm hover:animate-shimmer bg-[length:200%_auto] transition-all">
                Send Message →
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* SECTION 8 - Footer */}
      <footer className="relative border-t border-[#7b2ff7]/20 bg-black/50 backdrop-blur-lg pt-16 pb-8 z-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#7b2ff7] to-[#7b2ff7] opacity-30" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-8">
          <div className="font-['JetBrains_Mono'] text-2xl font-bold gradient-text">
            &lt;Deep Ghosh /&gt;
          </div>
          <p className="font-mono text-sm text-white/50 text-center max-w-sm">
            Turning curiosity into code, one commit at a time.
          </p>
          <div className="flex items-center gap-6">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#7b2ff7] transition-colors"><SiGithub size={20} /></a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#7b2ff7] transition-colors"><Linkedin size={20} /></a>
            <a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#7b2ff7] transition-colors"><SiDiscord size={20} /></a>
          </div>
          <div className="font-mono text-xs text-white/30 tracking-widest mt-8">
            © 2026 Deep Ghosh. Built with passion & caffeine.
          </div>
        </div>
      </footer>
    </div>
  );
}