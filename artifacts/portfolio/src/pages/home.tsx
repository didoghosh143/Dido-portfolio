import { motion } from "framer-motion";
import video1 from "@assets/Recording_2026-05-22_080027_1779417056504.mp4";
import video2 from "@assets/screen-20260522-071558_1779417061524.mp4";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white">
      {/* Fake Terminal Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] mix-blend-screen" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-white/10 bg-black/80 backdrop-blur-md z-40">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="font-mono text-sm tracking-wider flex items-center gap-2">
            <span className="text-accent animate-pulse">_</span>
            YOUR_NAME
          </div>
          <div className="flex gap-6 font-mono text-xs text-white/50">
            <a href="#work" className="hover:text-white transition-colors uppercase tracking-widest" data-testid="nav-work">Work</a>
            <a href="#about" className="hover:text-white transition-colors uppercase tracking-widest" data-testid="nav-about">About</a>
            <a href="#contact" className="hover:text-white transition-colors uppercase tracking-widest" data-testid="nav-contact">Contact</a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-32">
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-accent uppercase tracking-widest border border-accent/20 bg-accent/10 px-3 py-1.5">
                Status: Online
              </span>
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                Developer / Creator
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase leading-[0.9]">
              Building<br/>
              <span className="text-white/40">things that</span><br/>
              work.
            </h1>

            <p className="font-mono text-sm text-white/60 max-w-md leading-relaxed mt-4">
              // I build software and ship things. Open to work.
            </p>
          </motion.div>
        </section>

        {/* Work Section */}
        <section id="work" className="flex flex-col gap-12">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-accent">// 01</span>
            <h2 className="text-2xl font-bold uppercase tracking-wide">Featured Work</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-video border border-white/10 bg-white/5 overflow-hidden group-hover:border-accent/50 transition-colors">
                <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 z-10">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="font-mono text-[10px] text-white/40 ml-2">video_1.mp4</span>
                </div>
                <video 
                  src={video1} 
                  autoPlay={false} 
                  controls={true} 
                  className="w-full h-full object-cover pt-8"
                  data-testid="video-1"
                />
              </div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="uppercase">Project Alpha</span>
                <span className="text-white/40">2026</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-video border border-white/10 bg-white/5 overflow-hidden group-hover:border-accent/50 transition-colors">
                <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 z-10">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="font-mono text-[10px] text-white/40 ml-2">video_2.mp4</span>
                </div>
                <video 
                  src={video2} 
                  autoPlay={false} 
                  controls={true} 
                  className="w-full h-full object-cover pt-8"
                  data-testid="video-2"
                />
              </div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="uppercase">Project Beta</span>
                <span className="text-white/40">2026</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills & About */}
        <section id="about" className="flex flex-col gap-12">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-accent">// 02</span>
            <h2 className="text-2xl font-bold uppercase tracking-wide">System Specs</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-sm text-white/60 space-y-4"
            >
              <p>{`> whoami`}</p>
              <p className="text-white pl-4">A developer focused on shipping high-performance web applications with clean, brutalist aesthetics.</p>
              <p>{`> cat motivation.txt`}</p>
              <p className="text-white pl-4">I believe software should be fast, reliable, and look damn good. No fluff. Just execution.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 border border-white/10 p-6 bg-white/[0.02]"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">Active Modules</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Node.js', 'CSS', 'Design'].map((skill) => (
                  <span key={skill} className="font-mono text-xs uppercase px-3 py-1.5 border border-white/20 hover:border-accent hover:text-accent transition-colors cursor-default" data-testid={`skill-${skill.toLowerCase()}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer / Contact */}
      <footer id="contact" className="border-t border-white/10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-6 md:p-12 flex flex-col gap-4 col-span-1 md:col-span-2">
            <h2 className="text-4xl font-bold uppercase tracking-tight">Initiate<br/>Connection</h2>
            <p className="font-mono text-sm text-white/40">Ready to build something?</p>
          </div>
          
          <a href="#" className="p-6 md:p-12 flex flex-col justify-between group hover:bg-white/5 transition-colors" data-testid="link-github">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">01</span>
            <span className="text-xl font-bold uppercase tracking-wide group-hover:text-accent transition-colors flex items-center justify-between">
              GitHub
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </span>
          </a>
          
          <a href="#" className="p-6 md:p-12 flex flex-col justify-between group hover:bg-white/5 transition-colors" data-testid="link-twitter">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">02</span>
            <span className="text-xl font-bold uppercase tracking-wide group-hover:text-accent transition-colors flex items-center justify-between">
              Twitter
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </span>
          </a>

          <a href="#" className="p-6 md:p-12 flex flex-col justify-between group hover:bg-white/5 transition-colors" data-testid="link-email">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">03</span>
            <span className="text-xl font-bold uppercase tracking-wide group-hover:text-accent transition-colors flex items-center justify-between">
              Email
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </span>
          </a>
        </div>
        <div className="border-t border-white/10 p-6 flex justify-between items-center font-mono text-xs text-white/30 uppercase tracking-widest">
          <span>© 2026 YOUR_NAME</span>
          <span>System Normal</span>
        </div>
      </footer>
    </div>
  );
}