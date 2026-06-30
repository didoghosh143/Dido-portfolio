import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Terminal, Mail, Linkedin } from "lucide-react";
import { SiGithub, SiDiscord, SiWhatsapp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import profilePhoto from "@assets/Untitled_(LinkedIn_Profile_Picture)_20260115_100743_0000_1779420104799.png";

const SOCIAL_LINKS = {
  github: "https://github.com/didoghosh143",
  linkedin: "https://www.linkedin.com/in/thedido",
  discord: "https://discord.com/users/944944458917617755",
  email: "mailto:didoghosh143@gmail.com",
  phone: "tel:+917583952349",
  whatsapp: "https://wa.me/917583952349"
};

/* ─── CSS Dot Grid — zero JS, GPU-accelerated, works on all devices ─── */
function DotsBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Fine primary grid — drifts diagonally */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.32) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          animation: "dots-drift 22s linear infinite",
        }}
      />
      {/* Medium accent grid — drifts opposite direction */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(200,185,255,0.9) 1.6px, transparent 1.6px)",
          backgroundSize: "70px 70px",
          backgroundPosition: "14px 14px",
          animation: "dots-drift2 45s linear infinite",
        }}
      />
      {/* Subtle overall pulse */}
      <div
        className="absolute inset-0"
        style={{ animation: "dot-pulse 6s ease-in-out infinite", background: "transparent" }}
      />
    </div>
  );
}

/* ─── Scroll progress bar ─────────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#7b2ff7] z-[200] origin-left"
      style={{ scaleX }}
    />
  );
}

/* ─── Smooth cursor glow ──────────────────────────────────────────────── */
function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        left: sx,
        top: sy,
        translateX: "-50%",
        translateY: "-50%",
        width: 320,
        height: 320,
        background: "radial-gradient(circle, rgba(123,47,247,0.12) 0%, transparent 70%)",
      }}
    />
  );
}

/* ─── Sticky floating dock ────────────────────────────────────────────── */
function StickyDock({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const dockItems = [
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, label: "About", action: () => onScrollTo("about") },
    "divider",
    { icon: <SiGithub size={18} />, label: "GitHub", href: SOCIAL_LINKS.github },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { icon: <SiDiscord size={18} />, label: "Discord", href: SOCIAL_LINKS.discord },
    { icon: <SiWhatsapp size={18} />, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
    "divider",
    { icon: <Mail size={18} />, label: "Email", href: SOCIAL_LINKS.email },
  ] as const;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 80, damping: 18 }}
      className="fixed bottom-6 left-1/2 z-[150] -translate-x-1/2"
    >
      <div className="flex items-center gap-1 px-5 py-3 rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 dock-breathe">
        {dockItems.map((item, i) => {
          if (item === "divider") {
            return <div key={i} className="w-px h-5 bg-white/15 mx-2" />;
          }
          const el = (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.25, color: "#7b2ff7" }}
              whileTap={{ scale: 0.9 }}
              onClick={"action" in item ? item.action : undefined}
              title={item.label}
              className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-[#7b2ff7] transition-colors duration-200 rounded-full hover:bg-white/5"
            >
              {item.icon}
            </motion.button>
          );
          if ("href" in item) {
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                title={item.label}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-[#7b2ff7] transition-colors duration-200 rounded-full hover:bg-white/5"
              >
                {item.icon}
              </motion.a>
            );
          }
          return el;
        })}
      </div>
    </motion.div>
  );
}

/* ─── Reusable animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 18 } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

export default function Home() {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const tickingRef = useRef(false);

  // Parallax for hero section — GPU-accelerated, no React re-renders
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -90]);

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrolled(y > 50);
          const sections = ["about", "skills", "projects", "contact"];
          let current = "";
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el && y >= el.offsetTop - 160) current = id;
          }
          setActiveSection(current);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "Thanks for reaching out — I'll reply soon." });
    (e.target as HTMLFormElement).reset();
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#7b2ff7] selection:text-black relative">

      {/* ── Scroll progress bar ── */}
      <ScrollProgress />

      {/* ── Sticky bottom dock ── */}
      <StickyDock onScrollTo={scrollTo} />

      {/* ── Background ── */}
      <DotsBackground />
      <CursorGlow />

      {/* Subtle purple orb */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-150px] left-[-150px] w-[700px] h-[700px] rounded-full blur-[120px] opacity-15"
          style={{ background: "radial-gradient(circle, rgba(123,47,247,1) 0%, transparent 70%)" }} />
      </div>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/75 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_1px_20px_rgba(0,0,0,0.5)]" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={profilePhoto}
              alt="Deep Ghosh"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#7b2ff7]/60 group-hover:ring-[#7b2ff7] transition-all duration-300"
            />
            <span className="font-['Space_Grotesk'] text-base font-bold text-white tracking-wide group-hover:text-[#7b2ff7] transition-colors duration-300">
              Deep Ghosh
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
            {["about", "skills", "projects", "contact"].map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-[#7b2ff7] after:transition-all after:duration-300 ${
                  activeSection === id
                    ? "text-[#7b2ff7] after:w-full"
                    : "text-white/55 hover:text-white after:w-0 hover:after:w-full"
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("contact")}
            className="hidden md:block px-5 py-2 font-mono text-xs uppercase tracking-widest text-[#7b2ff7] border border-[#7b2ff7]/50 rounded hover:bg-[#7b2ff7] hover:text-white transition-all duration-300"
          >
            Hire Me
          </motion.button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col gap-36 pb-36">

        {/* ── Hero ── */}
        <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
          {/* Ambient floating light orbs — CSS only, no JS */}
          {[
            { w: 90,  h: 90,  top: "18%", left: "8%",  dur: "9s",  delay: "0s"  },
            { w: 65,  h: 65,  top: "65%", left: "18%", dur: "13s", delay: "4s"  },
            { w: 110, h: 110, top: "38%", left: "3%",  dur: "16s", delay: "7s"  },
          ].map((o, i) => (
            <div key={i} className="absolute rounded-full pointer-events-none"
              style={{ width: o.w, height: o.h, top: o.top, left: o.left,
                background: "radial-gradient(circle, rgba(123,47,247,0.18) 0%, transparent 70%)",
                filter: "blur(18px)", animation: `ambient-float ${o.dur} ease-in-out infinite`,
                animationDelay: o.delay }} />
          ))}
          <motion.div style={{ y: heroY }} className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12">

            {/* Left: text */}
            <div className="w-full md:w-[58%] flex flex-col items-start gap-6">

              {/* Mobile: photo centered, then badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex md:hidden flex-col items-start gap-4 w-full"
              >
                <div className="relative self-center">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ background: "radial-gradient(circle, rgba(123,47,247,0.8) 0%, transparent 70%)" }} />
                  <img
                    src={profilePhoto}
                    alt="Deep Ghosh"
                    className="relative w-32 h-32 rounded-full object-cover border-2 border-[#7b2ff7]/70"
                    style={{ boxShadow: "0 0 24px rgba(123,47,247,0.5), 0 0 48px rgba(123,47,247,0.2)" }}
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#7b2ff7] animate-pulse" />
                  <span className="font-mono text-xs text-white/80">👋 Hello, I'm</span>
                </div>
              </motion.div>

              {/* Desktop badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#7b2ff7] animate-pulse" />
                <span className="font-mono text-xs text-white/80">👋 Hello, I'm</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 }}
                className="font-['Space_Grotesk'] text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter"
              >
                <span className="text-white hero-name-glow">
                  Deep Ghosh
                </span>
              </motion.h1>

              <div className="h-8 md:h-10">
                <TypeAnimation
                  sequence={[
                    "Computer Engineering Student", 1200,
                    "AI Agent Engineer in Training", 1200,
                    "React & Node.js Developer", 1200,
                    "API Integration Enthusiast", 1200,
                  ]}
                  wrapper="div"
                  speed={55}
                  className="font-mono text-xl md:text-2xl text-[#7b2ff7]"
                  repeat={Infinity}
                  cursor
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="font-mono text-sm text-white/55 max-w-lg leading-relaxed"
              >
                Building intelligent systems at the intersection of code and AI.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, type: "spring", stiffness: 70 }}
                className="flex flex-wrap items-center gap-4 mt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("projects")}
                  className="px-8 py-3 rounded bg-[#7b2ff7] text-white font-mono text-sm font-bold uppercase tracking-wide hover:bg-[#6a27d8] transition-colors duration-200 shadow-[0_0_24px_rgba(123,47,247,0.4)]"
                >
                  View My Work
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("contact")}
                  className="px-8 py-3 rounded glass-card border-[#7b2ff7]/50 font-mono text-sm font-bold uppercase tracking-wide text-white hover:bg-[#7b2ff7]/15 transition-all duration-200"
                >
                  Let's Connect
                </motion.button>
              </motion.div>

            </div>

            {/* Right: profile photo (desktop) */}
            <div className="hidden md:flex w-[42%] justify-center items-center relative min-h-[420px]">
              <div className="absolute w-[420px] h-[420px] rounded-full"
                style={{ background: "conic-gradient(from 0deg, #7b2ff7, #a855f7, #c084fc, transparent, #7b2ff7)", padding: "3px", animation: "rotate-ring 9s linear infinite", borderRadius: "50%" }}>
                <div className="w-full h-full rounded-full bg-black" />
              </div>
              <div className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(circle, rgba(123,47,247,0.7) 0%, transparent 70%)" }} />
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: 0,
                    height: 0,
                    animation: `rotate-ring ${7 + i * 0.5}s linear infinite`,
                    animationDelay: `${-(i * (7 + i * 0.5)) / 6}s`,
                  }}
                >
                  <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#a855f7]"
                    style={{
                      top: "-3px",
                      left: "207px",
                      boxShadow: "0 0 6px #a855f7, 0 0 12px #7b2ff7",
                    }}
                  />
                </div>
              ))}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[320px] h-[320px] rounded-full overflow-hidden"
                style={{ boxShadow: "0 0 50px rgba(123,47,247,0.5), 0 0 90px rgba(123,47,247,0.18)" }}
              >
                <img src={profilePhoto} alt="Deep Ghosh" className="w-full h-full object-cover rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── About ── */}
        <section id="about" className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            <motion.div variants={fadeUp} className="w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "🤖", title: "AI Tools", desc: "ChatGPT, Claude, Gemini, Perplexity" },
                { icon: "🔌", title: "APIs", desc: "OpenAI, Gemini, Mistral, Anthropic" },
                { icon: "🎓", title: "Education", desc: "Computer Engineering + AI Agent Engineering" },
                { icon: "⚡", title: "Focus", desc: "LLM Apps, Agentic AI, Full-Stack" }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -5, boxShadow: "0 0 24px rgba(123,47,247,0.35)" }}
                  className="glass-card p-6 rounded-xl transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-white">{card.title}</h3>
                  <p className="font-mono text-xs text-white/55 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70 }}
            className="mb-12"
          >
            <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-white">
              Skills
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="flex flex-wrap gap-3"
          >
            {[
              "HTML5", "CSS3", "JavaScript", "React.js", "Vue.js",
              "Node.js", "Express.js", "REST APIs", "Python",
              "LangChain", "OpenAI API", "Gemini API", "Mistral API", "Anthropic API",
              "Prompt Engineering", "RAG", "Agentic Workflows",
              "ChatGPT", "Claude", "Gemini", "Perplexity", "Replit AI", "GitHub Copilot",
              "Git", "GitHub", "VS Code", "Postman"
            ].map((skill, i) => (
              <motion.span
                key={skill}
                variants={fadeUp}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-1.5 rounded-xl bg-white text-black font-['Space_Grotesk'] font-bold text-xs md:text-sm cursor-default select-none"
                style={{
                  animation: `badge-glow ${3 + (i % 6) * 0.35}s ease-in-out infinite`,
                  animationDelay: `${i * 0.13}s`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70 }}
            className="mb-12"
          >
            <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide">
              <span className="text-[#7b2ff7] mr-2">//</span>My Projects
            </h2>
            <p className="text-white/45 font-mono text-sm mt-3">Building in public — projects coming soon</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 0 30px rgba(123,47,247,0.25)" }}
                className="glass-card rounded-xl overflow-hidden group transition-all duration-300"
              >
                <div className="h-48 relative bg-gradient-to-br from-black to-white/5 flex items-center justify-center border-b border-white/10 overflow-hidden">
                  {/* Live scan line */}
                  <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7b2ff7]/50 to-transparent pointer-events-none"
                    style={{ animation: `scan-float ${8 + i * 2}s linear infinite`, animationDelay: `${i * 2.5}s` }} />
                  <Terminal size={44} className="text-white/15 group-hover:text-[#7b2ff7]/50 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 px-2 py-1 border border-[#7b2ff7] text-[#7b2ff7] text-[10px] font-mono uppercase tracking-widest rounded animate-pulse bg-[#7b2ff7]/10">
                    🚧 Coming Soon
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Project TBA</h3>
                  <p className="text-sm text-white/50 mb-6 h-10">Currently in development. Check back soon.</p>
                  <div className="flex items-center gap-3">
                    <button disabled className="px-4 py-2 bg-white/5 text-white/30 text-xs font-bold uppercase rounded cursor-not-allowed border border-white/10">GitHub</button>
                    <button disabled className="px-4 py-2 bg-white/5 text-white/30 text-xs font-bold uppercase rounded cursor-not-allowed border border-white/10">Live Demo</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="font-mono text-xs text-white/35 mt-8 text-center">Projects are actively being built. Follow @didoghosh143 on GitHub.</p>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 70 }}
              className="mb-10"
            >
              <h2 className="font-mono text-xl md:text-3xl font-bold uppercase tracking-wide">
                <span className="text-[#7b2ff7] mr-2">//</span>Let's Build Something
              </h2>
              <p className="text-white/55 font-mono text-xs md:text-sm mt-3 max-w-2xl">
                Whether it's a collaboration, opportunity, or just a chat about AI — I'm always open.
              </p>
            </motion.div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
              {/* Contact cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 w-full"
              >
                {[
                  { href: SOCIAL_LINKS.email, icon: <Mail size={20} className="text-white/50 shrink-0" />, label: "Email", value: "didoghosh143@gmail.com" },
                  { href: SOCIAL_LINKS.phone, icon: <span className="text-white/50 shrink-0 text-lg leading-none">📞</span>, label: "Phone", value: "+91 7583952349" },
                  { href: SOCIAL_LINKS.whatsapp, target: "_blank", icon: <SiWhatsapp size={20} className="text-white/50 shrink-0" />, label: "WhatsApp", value: "wa.me/917583952349" },
                  { href: SOCIAL_LINKS.linkedin, target: "_blank", icon: <Linkedin size={20} className="text-white/50 shrink-0" />, label: "LinkedIn", value: "linkedin.com/in/thedido" },
                  { href: SOCIAL_LINKS.github, target: "_blank", icon: <SiGithub size={20} className="text-white/50 shrink-0" />, label: "GitHub", value: "github.com/didoghosh143" },
                  { href: SOCIAL_LINKS.discord, target: "_blank", icon: <SiDiscord size={20} className="text-white/50 shrink-0" />, label: "Discord", value: "@didoghosh143" },
                ].map(({ href, icon, label, value, target }) => (
                  <motion.a
                    key={label}
                    variants={fadeUp}
                    whileHover={{ x: 4, boxShadow: "0 0 18px rgba(123,47,247,0.3)" }}
                    href={href}
                    target={target}
                    rel={target ? "noreferrer" : undefined}
                    className="glass-card w-full rounded-xl p-3 flex items-center gap-3 transition-all duration-200 group overflow-hidden"
                  >
                    {icon}
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold leading-none mb-1">{label}</div>
                      <div className="text-white text-xs font-mono group-hover:text-[#7b2ff7] transition-colors truncate">{value}</div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Contact form */}
              <motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 60, delay: 0.1 }}
                onSubmit={handleContactSubmit}
                className="glass-card p-6 md:p-8 rounded-xl flex flex-col gap-5"
              >
                {[
                  { label: "Name", type: "text", placeholder: "Your name" },
                  { label: "Email", type: "email", placeholder: "your@email.com" },
                  { label: "Subject", type: "text", placeholder: "What is this regarding?" },
                ].map(({ label, type, placeholder }) => (
                  <div key={label} className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/55 font-bold">{label}</label>
                    <input
                      required
                      type={type}
                      placeholder={placeholder}
                      className="w-full glass-card bg-transparent px-4 py-3 rounded-lg outline-none focus:border-[#7b2ff7] transition-all font-mono text-sm placeholder:text-white/25"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-white/55 font-bold">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello..."
                    className="w-full glass-card bg-transparent px-4 py-3 rounded-lg outline-none focus:border-[#7b2ff7] transition-all font-mono text-sm resize-none placeholder:text-white/25"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(123,47,247,0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 mt-1 rounded-lg bg-[#7b2ff7] text-white font-bold uppercase tracking-widest text-sm transition-all duration-200"
                >
                  Send Message →
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative border-t border-[#7b2ff7]/20 bg-black/60 backdrop-blur-lg pt-14 pb-8 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="font-['Space_Grotesk'] text-2xl font-black uppercase tracking-[0.15em] text-white">Deep Ghosh</span>
            <div className="h-[2px] w-12 rounded-full bg-[#7b2ff7]" />
          </div>
          <p className="font-mono text-sm text-white/45 text-center max-w-xs">
            Turning curiosity into code, one commit at a time.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: SOCIAL_LINKS.github, icon: <SiGithub size={28} /> },
              { href: SOCIAL_LINKS.linkedin, icon: <Linkedin size={28} /> },
              { href: SOCIAL_LINKS.discord, icon: <SiDiscord size={28} /> },
              { href: SOCIAL_LINKS.whatsapp, icon: <SiWhatsapp size={28} /> },
            ].map(({ href, icon }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.25, color: "#7b2ff7" }}
                className="text-white/35 transition-colors duration-200"
              >
                {icon}
              </motion.a>
            ))}
          </div>
          <div className="font-mono text-xs text-white/25 tracking-widest mt-4">
            © 2026 Deep Ghosh. Built with passion & caffeine.
          </div>
        </div>
      </footer>
    </div>
  );
}
