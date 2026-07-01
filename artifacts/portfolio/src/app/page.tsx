"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { TypeAnimation } from "react-type-animation";
import { Terminal, Mail, Sun, Moon, Bot, Cpu, GraduationCap, Zap } from "lucide-react";
import { SiGithub, SiDiscord, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import profilePhoto from "@assets/profile.png";

const SOCIAL_LINKS = {
  github: "https://github.com/didoghosh143",
  linkedin: "https://www.linkedin.com/in/thedido",
  discord: "https://discord.com/users/944944458917617755",
  email: "mailto:didoghosh143@gmail.com",
  phone: "tel:+917583952349",
  whatsapp: "https://wa.me/917583952349"
};

/* ─── Touch device detection ─────────────────────────────────────────── */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return isTouch;
}

/* ─── CSS Dot Grid — zero JS, GPU-accelerated ─────────────────────────── */
function DotsBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Fine primary grid — drifts diagonally (disabled on touch via CSS) */}
      <div
        className="dots-bg-layer-1 absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-primary) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          animation: "dots-drift 22s linear infinite",
          willChange: "transform",
        }}
      />
      {/* Medium accent grid — drifts opposite (disabled on touch via CSS) */}
      <div
        className="dots-bg-layer-2 absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-accent-c) 1.6px, transparent 1.6px)",
          backgroundSize: "70px 70px",
          backgroundPosition: "14px 14px",
          animation: "dots-drift2 45s linear infinite",
          willChange: "transform",
        }}
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
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left scroll-progress-bar"
      style={{ scaleX, background: "var(--accent)" }}
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
        background: "radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)",
      }}
    />
  );
}

/* ─── Sticky floating dock ────────────────────────────────────────────── */
const DOCK_ITEMS_CONFIG = [
  { id: "theme",    label: "Theme",    color: "#f59e0b", floatDelay: 0    },
  { id: "about",    label: "About",    color: "#6366f1", floatDelay: 0.15 },
  { id: "github",   label: "GitHub",   color: "#ffffff", floatDelay: 0.3  },
  { id: "linkedin", label: "LinkedIn", color: "#0ea5e9", floatDelay: 0.45 },
  { id: "discord",  label: "Discord",  color: "#818cf8", floatDelay: 0.6  },
  { id: "whatsapp", label: "WhatsApp", color: "#22c55e", floatDelay: 0.75 },
  { id: "email",    label: "Email",    color: "#f43f5e", floatDelay: 0.9  },
] as const;

function StickyDock({
  onScrollTo,
  isLight,
  onToggleTheme,
}: {
  onScrollTo: (id: string) => void;
  isLight: boolean;
  onToggleTheme: () => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /* Brand-colored icons (bigger, bolder) */
  const dockItems = [
    { id: "theme",    icon: isLight ? <Sun size={22} strokeWidth={2.5} /> : <Moon size={22} strokeWidth={2.5} />,        label: "Theme",    action: onToggleTheme },
    { id: "about",    icon: <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, label: "About", action: () => onScrollTo("about") },
    "divider",
    { id: "github",   icon: <SiGithub size={21} />,   label: "GitHub",   href: SOCIAL_LINKS.github },
    { id: "linkedin", icon: <FaLinkedin size={21} />,  label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { id: "discord",  icon: <SiDiscord size={21} />,  label: "Discord",  href: SOCIAL_LINKS.discord },
    { id: "whatsapp", icon: <SiWhatsapp size={21} />, label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
    "divider",
    { id: "email",    icon: <Mail size={21} strokeWidth={2} />, label: "Email", href: SOCIAL_LINKS.email },
  ] as const;

  /* Pill slides up, then each icon cascades in */
  const pillVariants: Variants = {
    hidden: { y: 120, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.8, type: "spring", stiffness: 110, damping: 20 } },
  };
  const iconVariants: Variants = {
    hidden:  { opacity: 0, y: 20, scale: 0.4 },
    visible: (custom: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: 1.0 + custom * 0.07, type: "spring", stiffness: 280, damping: 20 },
    }),
  };

  const tooltipBg   = isLight ? "#111" : "#fff";
  const tooltipText = isLight ? "#fff" : "#111";
  const defaultColor = isLight ? "#111111" : "rgba(255,255,255,0.55)";

  const getItemColor = (id: string) =>
    DOCK_ITEMS_CONFIG.find(c => c.id === id)?.color ?? defaultColor;
  const getFloatDelay = (id: string) =>
    DOCK_ITEMS_CONFIG.find(c => c.id === id)?.floatDelay ?? 0;

  let iconIdx = -1;

  return (
    <motion.div
      variants={pillVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-5 left-1/2 z-[150] -translate-x-1/2"
    >
      {/* Pill container with shimmer sweep */}
      <div
        className="relative flex items-center px-3 py-2 rounded-full overflow-hidden"
        style={{
          background: isLight ? "#ffffff" : "rgba(8,8,12,0.92)",
          border: isLight ? "1px solid #e5e7eb" : "1px solid rgba(255,255,255,0.09)",
          boxShadow: isLight
            ? "0 6px 28px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)"
            : "0 6px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Live shimmer sweep — GPU-composited */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-full"
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
          style={{
            background: isLight
              ? "linear-gradient(90deg, transparent, rgba(0,0,0,0.04), rgba(79,70,229,0.08), rgba(0,0,0,0.04), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.02), rgba(123,47,247,0.12), rgba(255,255,255,0.02), transparent)",
            width: "60%",
          }}
        />

        {/* Icons */}
        {dockItems.map((item, i) => {
          if (item === "divider") {
            return (
              <motion.div
                key={`div-${i}`}
                custom={i}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="w-px mx-1.5 self-stretch my-1"
                style={{ background: isLight ? "#e5e7eb" : "rgba(255,255,255,0.10)" }}
              />
            );
          }

          iconIdx++;
          const cfg = DOCK_ITEMS_CONFIG.find(c => c.id === item.id);
          const brandColor = item.id === "github" && isLight ? "#000000" : (cfg?.color ?? defaultColor);
          const floatDelay = cfg?.floatDelay ?? 0;
          const isHov = hoveredId === item.id;

          const iconEl = (
            <motion.div
              key={item.id}
              custom={i}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="relative flex flex-col items-center"
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHov && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap pointer-events-none z-20 font-mono uppercase tracking-widest"
                    style={{ background: tooltipBg, color: tooltipText }}
                  >
                    {item.label}
                    <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 block w-2.5 h-2.5 rotate-45" style={{ background: tooltipBg }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon glow ring on hover */}
              <AnimatePresence>
                {isHov && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: `0 0 14px 4px ${brandColor}55`, background: `${brandColor}18` }}
                  />
                )}
              </AnimatePresence>

              {/* Ambient float + icon button */}
              {"href" in item ? (
                <motion.a
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
                  whileHover={{ scale: 1.45, y: -8 }}
                  whileTap={{ scale: 0.76, rotate: -10 }}
                  style={{
                    color: isHov ? brandColor : defaultColor,
                    filter: isHov ? `drop-shadow(0 0 6px ${brandColor}88)` : "none",
                    transition: "color 0.15s, filter 0.15s",
                  }}
                  className="dock-touch-btn w-10 h-10 flex items-center justify-center rounded-full relative z-10"
                >
                  {item.icon}
                </motion.a>
              ) : (
                <motion.button
                  onClick={item.action}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
                  whileHover={{ scale: 1.45, y: -8 }}
                  whileTap={{ scale: 0.76, rotate: 10 }}
                  style={{
                    color: isHov ? brandColor : defaultColor,
                    filter: isHov ? `drop-shadow(0 0 6px ${brandColor}88)` : "none",
                    transition: "color 0.15s, filter 0.15s",
                  }}
                  className="dock-touch-btn w-10 h-10 flex items-center justify-center rounded-full relative z-10"
                >
                  {item.icon}
                </motion.button>
              )}

              {/* Active dot */}
              <AnimatePresence>
                {isHov && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -bottom-1.5 w-1 h-1 rounded-full"
                    style={{ background: brandColor }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );

          return iconEl;
        })}
      </div>
    </motion.div>
  );
}

/* ─── Reusable animation variants ────────────────────────────────────── */
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};
/* Skill-specific variants — tighter stagger, smaller y = less GPU work per frame */
const skillStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0 } }
};
const skillFadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 22 } }
};

export default function Home() {
  const { toast } = useToast();
  const isTouch = useIsTouchDevice();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lenisRef = useRef<Lenis | null>(null);
  const [isLight, setIsLight] = useState(() => {
    try { return localStorage.getItem("theme") === "light"; } catch { return false; }
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLight]);

  const toggleTheme = () => setIsLight(l => !l);

  // Lenis smooth scroll init
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2.5,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setScrolled(scroll > 50);
      const sections = ["about", "skills", "projects", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scroll >= el.offsetTop - 160) current = id;
      }
      setActiveSection(current);
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "Thanks for reaching out — I'll reply soon." });
    (e.target as HTMLFormElement).reset();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans relative" style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Scroll progress bar ── */}
      <ScrollProgress />

      {/* ── Sticky bottom dock ── */}
      <StickyDock onScrollTo={scrollTo} isLight={isLight} onToggleTheme={toggleTheme} />

      {/* ── Background ── */}
      <DotsBackground />
      {!isTouch && <CursorGlow />}

      {/* Subtle purple orb — hidden on mobile via ambient-orb class */}
      <div className="ambient-orb fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full blur-[90px] opacity-10"
          style={{ background: "radial-gradient(circle, var(--orb-color) 0%, transparent 70%)" }} />
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl py-3 shadow-[0_1px_20px_rgba(0,0,0,0.3)]" : "bg-transparent py-5"}`}
        style={scrolled ? { background: "var(--nav-scrolled)", borderBottom: "1px solid var(--glass-border)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={scrollTop}
          >
            <img
              src={profilePhoto.src}
              alt="Deep Ghosh"
              className="w-8 h-8 rounded-full object-cover ring-2 transition-all duration-300"
              style={{ outline: "2px solid var(--accent-dim)" }}
            />
            <span className="font-['Space_Grotesk'] text-base font-bold tracking-wide transition-colors duration-300" style={{ color: "var(--fg)" }}>
              Deep Ghosh
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
            {["about", "skills", "projects", "contact"].map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`nav-btn relative transition-colors duration-200 ${activeSection === id ? "is-active" : ""}`}
                style={{ color: activeSection === id ? "var(--accent)" : "var(--fg-muted)" }}
              >
                {id}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("contact")}
            className="hire-me-btn hidden md:block px-5 py-2 font-mono text-xs uppercase tracking-widest rounded transition-all duration-300 hover:text-white"
            style={{ color: "var(--accent)", border: "1px solid var(--accent-dim)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
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
                background: "radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)",
                filter: "blur(18px)", animation: `ambient-float ${o.dur} ease-in-out infinite`,
                animationDelay: o.delay }} />
          ))}
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12">

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
                  <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)" }} />
                  <img
                    src={profilePhoto.src}
                    alt="Deep Ghosh"
                    className="relative w-32 h-32 rounded-full object-cover border-2"
                    style={{ borderColor: "var(--accent-dim)", boxShadow: "0 0 24px var(--accent-glow), 0 0 48px var(--accent-dim)" }}
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                  <span className="font-mono text-xs text-white/80">👋 Hello, I'm</span>
                </div>
              </motion.div>

              {/* Desktop badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="hello-badge hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <span className="badge-dot w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                <span className="badge-label font-mono text-xs text-white/80">👋 Hello, I'm</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 }}
                className="font-['Space_Grotesk'] text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter"
              >
                <span
                  className={isLight ? "" : "text-white hero-name-glow"}
                  style={isLight ? { color: "#000000", WebkitTextFillColor: "#000000" } : undefined}
                >
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
                  className="font-mono text-xl md:text-2xl live-text-gradient"
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
                  className="px-8 py-3 rounded font-mono text-sm font-bold uppercase tracking-wide transition-colors duration-200"
                  style={{ background: "var(--accent)", color: "#ffffff", boxShadow: "0 0 24px var(--accent-glow)" }}
                >
                  View My Work
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("contact")}
                  className="px-8 py-3 rounded glass-card font-mono text-sm font-bold uppercase tracking-wide transition-all duration-200"
                  style={{ borderColor: "var(--accent-dim)", color: "var(--fg)" }}
                >
                  Let's Connect
                </motion.button>
              </motion.div>

            </div>

            {/* Right: profile photo (desktop) */}
            <div className="hidden md:flex w-[42%] justify-center items-center relative min-h-[420px]">
              <div className="absolute w-[420px] h-[420px] rounded-full"
                style={{ background: "var(--ring-gradient)", padding: "3px", animation: "rotate-ring 9s linear infinite", borderRadius: "50%" }}>
                <div className="w-full h-full rounded-full" style={{ background: "var(--bg)" }} />
              </div>
              <div className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)" }} />
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
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      top: "-3px",
                      left: "207px",
                      background: "var(--ring-dot)",
                      boxShadow: "0 0 6px var(--ring-dot), 0 0 12px var(--accent)",
                    }}
                  />
                </div>
              ))}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[320px] h-[320px] rounded-full overflow-hidden"
                style={{ boxShadow: "0 0 50px var(--accent-glow), 0 0 90px var(--accent-dim)" }}
              >
                <img src={profilePhoto.src} alt="Deep Ghosh" className="w-full h-full object-cover rounded-full" />
              </motion.div>
            </div>
          </div>
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
              <div className="p-6 font-mono text-sm leading-relaxed" style={{ color: "var(--accent)" }}>
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
                { icon: <Bot size={32} style={{ color: isLight ? "#4f46e5" : "var(--accent)" }} />, title: "AI Tools", desc: "ChatGPT, Claude, Gemini, Perplexity" },
                { icon: <Cpu size={32} style={{ color: isLight ? "#4f46e5" : "var(--accent)" }} />, title: "APIs", desc: "OpenAI, Gemini, Mistral, Anthropic" },
                { icon: <GraduationCap size={32} style={{ color: isLight ? "#4f46e5" : "var(--accent)" }} />, title: "Education", desc: "Computer Engineering + AI Agent Engineering" },
                { icon: <Zap size={32} style={{ color: isLight ? "#4f46e5" : "var(--accent)" }} />, title: "Focus", desc: "LLM Apps, Agentic AI, Full-Stack" }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.96 }}
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
              <span className="section-accent mr-2" style={{ color: isLight ? "#4f46e5" : "var(--accent)" }}>//</span>Skills
            </h2>
          </motion.div>

          {/* Skills grid — skillStagger (0.04s) + small y (12px) = mobile-smooth */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={skillStagger}
            className="flex flex-wrap gap-3"
          >
            {[
              "HTML5", "CSS3", "JavaScript", "React.js", "Vue.js",
              "Node.js", "Express.js", "REST APIs", "Python",
              "LangChain", "OpenAI API", "Gemini API", "Mistral API", "Anthropic API",
              "Prompt Engineering", "RAG", "Agentic Workflows",
              "ChatGPT", "Claude", "Gemini", "Perplexity", "Replit AI", "GitHub Copilot",
              "Git", "GitHub", "VS Code", "Postman"
            ].map((skill) => (
              <motion.span
                key={skill}
                variants={skillFadeUp}
                whileTap={{ scale: 0.92 }}
                className="transform-gpu px-4 py-2 rounded-xl font-['Space_Grotesk'] font-bold text-xs md:text-sm cursor-default select-none min-h-[36px] flex items-center"
                style={{
                  background: "var(--badge-bg)",
                  color: "var(--badge-text)",
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
              <span style={{ color: isLight ? "#4f46e5" : "var(--accent)" }} className="section-accent mr-2">//</span>My Projects
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
                whileHover={{ y: -6, boxShadow: "0 0 30px var(--accent-dim)" }}
                className="glass-card rounded-xl overflow-hidden group transition-all duration-300"
              >
                <div className="h-48 relative bg-gradient-to-br from-black to-white/5 flex items-center justify-center border-b border-white/10 overflow-hidden">
                  {/* Live scan line */}
                  <div className="absolute left-0 right-0 h-px from-transparent to-transparent pointer-events-none"
                    style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 50%, transparent), transparent)`, animation: `scan-float ${8 + i * 2}s linear infinite`, animationDelay: `${i * 2.5}s` }} />
                  <Terminal size={44} className="text-white/15 transition-colors duration-300" style={{ color: "var(--fg-dim)" }} />
                  <div className="absolute top-4 right-4 px-2 py-1 text-[10px] font-mono uppercase tracking-widest rounded animate-pulse"
                    style={{ border: "1px solid var(--accent)", color: "var(--accent)", background: "var(--accent-subtle)" }}>
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
                <span style={{ color: isLight ? "#4f46e5" : "var(--accent)" }} className="section-accent mr-2">//</span>Let's Build Something
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
                  { href: SOCIAL_LINKS.linkedin, target: "_blank", icon: <FaLinkedin size={20} className="text-white/50 shrink-0" />, label: "LinkedIn", value: "linkedin.com/in/thedido" },
                  { href: SOCIAL_LINKS.github, target: "_blank", icon: <SiGithub size={20} className="text-white/50 shrink-0" />, label: "GitHub", value: "github.com/didoghosh143" },
                  { href: SOCIAL_LINKS.discord, target: "_blank", icon: <SiDiscord size={20} className="text-white/50 shrink-0" />, label: "Discord", value: "@didoghosh143" },
                ].map(({ href, icon, label, value, target }) => (
                  <motion.a
                    key={label}
                    variants={fadeUp}
                    whileHover={{ x: 4, boxShadow: "0 0 18px var(--accent-dim)" }}
                    href={href}
                    target={target}
                    rel={target ? "noreferrer" : undefined}
                    className="contact-link-card glass-card w-full rounded-xl p-3 flex items-center gap-3 transition-all duration-200 group overflow-hidden"
                  >
                    {icon}
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold leading-none mb-1">{label}</div>
                      <div className="text-xs font-mono transition-colors truncate" style={{ color: "var(--fg)" }}>{value}</div>
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
                      className="w-full glass-card bg-transparent px-4 py-3 rounded-lg outline-none transition-all font-mono text-sm placeholder:text-white/25"
                      style={{ "--focus-border": "var(--accent)" } as React.CSSProperties}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-white/55 font-bold">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello..."
                    className="w-full glass-card bg-transparent px-4 py-3 rounded-lg outline-none transition-all font-mono text-sm resize-none placeholder:text-white/25"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 mt-1 rounded-lg font-bold uppercase tracking-widest text-sm transition-all duration-200"
                  style={{ background: "var(--accent)", color: "#ffffff", boxShadow: "0 0 28px var(--accent-glow)" }}
                >
                  Send Message →
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative backdrop-blur-lg pt-14 pb-8 z-10" style={{ borderTop: "1px solid var(--accent-dim)", background: "var(--glass-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="font-['Space_Grotesk'] text-2xl font-black uppercase tracking-[0.15em] text-white">Deep Ghosh</span>
            <div className="h-[2px] w-12 rounded-full" style={{ background: "var(--accent)" }} />
          </div>
          <p className="font-mono text-sm text-white/45 text-center max-w-xs">
            Turning curiosity into code, one commit at a time.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: SOCIAL_LINKS.github, icon: <SiGithub size={28} /> },
              { href: SOCIAL_LINKS.linkedin, icon: <FaLinkedin size={28} /> },
              { href: SOCIAL_LINKS.discord, icon: <SiDiscord size={28} /> },
              { href: SOCIAL_LINKS.whatsapp, icon: <SiWhatsapp size={28} /> },
            ].map(({ href, icon }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.88 }}
                className="transition-colors duration-200 p-2"
                style={{ color: "var(--fg)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
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

