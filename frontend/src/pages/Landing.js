import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import Kavach from '@/components/Mascot/Kavach';
import { 
  Shield, Zap, Trophy, Heart, Users, Flame, ChevronRight, Check, 
  Smartphone, CreditCard, Mail, Phone, MessageCircle, Globe, 
  Lock, Star, Target, Brain, Award, ArrowRight, Play, MousePointer2, 
  Rocket, ChevronDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '43%', label: 'Indian teens clicked a phishing link', color: '#58cc02' },
  { value: '300%', label: 'UPI fraud rise in 3 years', color: '#1cb0f6' },
  { value: '28%', label: 'Teens shared an OTP with a stranger', color: '#ff4b4b' },
  { value: '60+', label: 'Real Indian scam scenarios inside', color: '#ffb703' },
];

const Landing = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaCardRef = useRef(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Premium Scroll Transforms
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0, 0.08], [100, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const statsX = useTransform(scrollYProgress, [0.05, 0.2], [200, 0]);
  const scrollProgressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    // 1. Initial Hero Entrance (GSAP Juice)
    const tl = gsap.timeline({ defaults: { ease: "elastic.out(1, 0.6)" } });
    
    tl.fromTo(".mission-badge", 
      { scale: 0, opacity: 0, y: 20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 1.2, delay: 0.6 }
    )
    .fromTo(".hero-title", 
      { y: 150, opacity: 0, skewY: 10 }, 
      { y: 0, opacity: 1, skewY: 0, duration: 1.8, stagger: 0.15 },
      "-=0.8"
    )
    .fromTo(".hero-subtitle", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2 },
      "-=1"
    );

    // 2. Feature Card Reveal (GSAP ScrollTrigger)
    gsap.utils.toArray(".feature-card").forEach((card, i) => {
      gsap.fromTo(card, 
        { scale: 0.7, opacity: 0, y: 100 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=80",
            toggleActions: "play none none reverse"
          },
          delay: (i % 3) * 0.15
        }
      );
    });

  }, []);

  const goStart = () => {
    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.85 },
      colors: ['#58cc02', '#1cb0f6', '#ff4b4b', '#ffb703'],
      gravity: 0.8
    });
    setTimeout(() => navigate('/start'), 700);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#58cc02]/30 overflow-x-hidden font-body relative">
      <motion.div 
        style={{ width: scrollProgressWidth }}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#1cb0f6] to-[#58cc02] z-[100] transition-none"
      />

      {/* Initialize State Overlay */}
      {!isSplineLoaded && (
        <div className="absolute inset-0 z-[1] bg-[#0a0a0a] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 border-[6px] border-[#58cc02]/10 border-t-[#58cc02] rounded-full animate-spin shadow-[0_0_50px_rgba(88,204,2,0.2)]" />
            <div className="text-sm font-black uppercase tracking-[0.8em] text-[#58cc02] animate-pulse">Scanning Bharat Assets...</div>
          </div>
        </div>
      )}

      {/* Background Texture */}
      <div className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle, #fff 1.5px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} 
      />

      {/* Main Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-3xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-28 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1cb0f6] to-[#58cc02] rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-white/10 group overflow-hidden p-2">
               <img src="/kavach.webp" alt="PhishProof Mascot" className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-2xl md:text-4xl font-display font-black tracking-tightest leading-none mt-1">PhishProof</span>
          </motion.div>
          
          <div className="flex items-center gap-12">
            <div className="hidden lg:flex items-center gap-14">
              {['Mission', 'Security', 'India-Safe'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black text-white/50 hover:text-[#58cc02] transition-colors uppercase tracking-[0.5em]">{item}</a>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={goStart}
              className="bg-[#58cc02] text-white px-8 md:px-14 py-4 md:py-6 rounded-3xl text-sm md:text-lg font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(88,204,2,0.4)] hover:shadow-[#58cc02]/60 transition-all border-b-8 border-[#58a700]/80"
            >
              Start Mission
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Intense Hero Section */}
      <section className="relative w-full h-[160vh] md:h-[135vh] overflow-hidden flex flex-col items-center">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-full">
            <Spline 
              scene="https://prod.spline.design/tsSGi2LgriPCaLQS/scene.splinecode" 
              onLoad={() => setIsSplineLoaded(true)}
            />
          </div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-[#0a0a0a] z-10 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pt-40 md:pt-64 h-full">
          <div className="mission-badge inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/10 backdrop-blur-3xl border-2 border-white/20 shadow-3xl text-xs md:text-sm font-black uppercase tracking-[0.6em] text-[#58cc02] mb-16 ring-4 ring-[#58cc02]/20">
             <div className="w-3 h-3 rounded-full bg-[#58cc02] animate-ping" />
             Cyber-Aware Bharat
          </div>

          <h1 className="hero-title text-7xl md:text-[140px] lg:text-[180px] leading-[0.75] font-display font-black tracking-tighter mb-14 text-white max-w-[90rem]">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#1cb0f6] to-[#58cc02] filter drop-shadow-[0_0_30px_rgba(28,176,246,0.3)]">Never</span><br /> get scammed.
          </h1>
          
          <p className="hero-subtitle text-2xl md:text-5xl text-white font-black leading-tight max-w-6xl mb-12 tracking-tight px-4 drop-shadow-3xl">
            Spot fake UPI, Digital Arrests, and WhatsApp traps <br className="hidden lg:block" /> 
            with Bharat's first AI-powered interactive simulator.
          </p>

          <motion.div 
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute bottom-32 md:bottom-48 flex flex-col items-center w-full px-6"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center bg-black/95 backdrop-blur-3xl p-12 md:p-16 rounded-[60px] md:rounded-[100px] border-2 border-white/15 shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] max-w-6xl w-full group">
              <div className="hidden md:block pr-20 border-r-2 border-white/10 text-left">
                <div className="text-white font-display text-4xl md:text-6xl font-black mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Zero Scams.</div>
                <div className="text-[#58cc02] text-sm font-black uppercase tracking-[0.5em]">2026 Security Protocol</div>
              </div>
              
              <div className="w-full md:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goStart} 
                  className="pp-duo-btn pp-duo-green h-24 md:h-36 px-12 md:px-28 text-3xl md:text-5xl w-full md:w-auto shadow-[0_40px_80px_rgba(88,204,2,0.6)] font-black flex items-center justify-center gap-6 border-none"
                >
                  <Rocket className="w-10 h-10 md:w-16 md:h-16" />
                  PLAY FREE
                </motion.button>
              </div>
            </div>

            <motion.div 
               animate={{ y: [0, 20, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="mt-20 flex flex-col items-center gap-8"
            >
              <div className="text-xs font-black uppercase tracking-[1em] text-[#58cc02]">Scroll for Intel</div>
              <ChevronDown className="w-8 h-8 md:w-12 md:h-12 text-[#58cc02]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Massive Stats */}
      <section className="py-32 md:py-64 bg-[#060606] border-y-2 border-white/10 overflow-hidden relative">
        <motion.div style={{ x: statsX }} className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center group relative p-12 bg-white/5 rounded-[50px] border-2 border-white/5 hover:border-[#58cc02]/40 transition-all duration-700"
              >
                <div className="text-7xl md:text-[120px] font-black mb-6 transition-transform group-hover:scale-110 leading-none" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-black text-white leading-tight uppercase tracking-[0.4em] max-w-[240px] mx-auto italic">
                  {stat.label}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[50px]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Restore How it Works - Premium Version */}
      <section id="security" className="py-32 md:py-64 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-8 py-3 rounded-full bg-white/10 border-2 border-white/20 text-xs font-black uppercase tracking-[0.6em] text-[#1cb0f6] mb-12"
            >
              The Training Arc
            </motion.div>
            <h2 className="text-5xl md:text-9xl font-display font-black tracking-tighter mb-28 md:mb-40 leading-[0.8] text-white">
              Watch. Fail. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1cb0f6] to-[#58cc02]">Unstoppable.</span>
            </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14 text-left">
            {[
              { num: '01', title: 'Live Scenarios', desc: 'Real WhatsApp from "Mom" or a fake UPI collect request. 100% realistic.', icon: <Smartphone /> },
              { num: '02', title: 'The 3s Reflex', desc: 'Choose your action in under 3 seconds. Earn XP for spotting red flags.', icon: <Brain /> },
              { num: '03', title: 'In-Depth Intel', desc: 'Kavach breaks down the scammer\'s tech and mindset. Stay updated weekly.', icon: <Lock /> },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25, duration: 1 }}
                className="feature-card relative overflow-hidden p-12 md:p-16 bg-white/5 border-2 border-white/10 rounded-[60px] group border-l-[12px] border-l-[#1cb0f6] hover:bg-white/10 transition-all hover:scale-[1.05] shadow-3xl"
              >
                <div className="absolute top-10 right-10 text-9xl md:text-[180px] font-display font-black opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">{step.num}</div>
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-[40px] bg-[#1cb0f6]/10 text-[#1cb0f6] flex items-center justify-center mb-12 border-2 border-[#1cb0f6]/20 shadow-2xl">
                  {step.icon}
                </div>
                <h3 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tighter text-white">{step.title}</h3>
                <p className="text-xl md:text-2xl text-white font-black leading-tight drop-shadow-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section id="curriculum" className="py-32 md:py-64 bg-[#060606] border-y-2 border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 md:gap-40 items-center">
            <motion.div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-8 py-3 rounded-full bg-[#58cc02]/10 border-2 border-[#58cc02]/30 text-xs font-black uppercase tracking-[0.6em] text-[#58cc02] mb-12">Scam Library v2.0</div>
              <h2 className="text-5xl md:text-9xl font-display font-black mb-14 leading-[0.8] tracking-tighter text-white">
                Outsmart <br /> <span className="text-[#58cc02]">every trick.</span>
              </h2>
              <p className="text-2xl md:text-4xl text-white font-black mb-20 leading-tight max-w-2xl opacity-90">
                Scenario updates every 48 hours based on new reports from <span className="text-[#1cb0f6] underline decoration-8 underline-offset-[12px]">Cyber Intel units</span>.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goStart}
                className="bg-white text-black px-16 md:px-24 py-6 md:py-10 rounded-[40px] text-xl md:text-3xl font-black uppercase tracking-[0.3em] flex items-center gap-8 group w-fit shadow-2xl hover:bg-[#58cc02] hover:text-white transition-all duration-500 border-none"
              >
                LAUNCH <ArrowRight className="w-10 h-10 group-hover:translate-x-6 transition-transform" />
              </motion.button>
            </motion.div>
            
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
              {[
                { title: 'SMS Scams', desc: 'Bank alerts, delivery traps.', icon: <Mail />, color: '#1cb0f6' },
                { title: 'UPI Tricks', icon: <Smartphone />, desc: 'Collect requests, fake refunds.', color: '#58cc02' },
                { title: 'Social Labs', icon: <Users />, desc: 'WhatsApp & Digital Arrests.', color: '#ff4b4b' },
                { title: 'The Gauntlet', icon: <Flame />, desc: 'Elite defenders only.', color: '#ffb703' },
              ].map((cat, i) => (
                <motion.div 
                  key={i} 
                  className="feature-card p-12 bg-white/5 border-2 border-white/10 rounded-[60px] hover:bg-white/10 transition-all cursor-pointer group hover:border-[#58cc02]/60 shadow-3xl"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-[35px] flex items-center justify-center mb-12 group-hover:rotate-12 transition-transform text-4xl shadow-2xl border-2 border-white/5" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                     {cat.icon}
                  </div>
                  <h4 className="text-4xl font-display font-black mb-4 text-white">{cat.title}</h4>
                  <p className="text-xl text-white font-black leading-tight opacity-100">{cat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Massive CTA */}
      <section className="py-40 md:py-80 bg-[#0a0a0a] relative flex justify-center items-center overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="p-20 md:p-48 rounded-[80px] md:rounded-[140px] bg-white text-black relative shadow-[0_0_200px_rgba(255,255,255,0.1)] overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                animate={{ y: [0, -30, 0], rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-16 md:mb-24 flex justify-center"
              >
                <Kavach size={200} expression="excited" trackMouse={false} className="md:w-72 md:h-72 drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]" />
              </motion.div>
              <h2 className="text-7xl md:text-[160px] lg:text-[220px] font-display font-black mb-20 leading-[0.7] tracking-tighter group-hover:scale-[1.02] transition-transform duration-1000 text-center">
                Outsmart <br />
                the trap.
              </h2>
              <motion.button 
                whileHover={{ scale: 1.1, shadow: "0 50px 100px rgba(88,204,2,0.6)" }}
                whileTap={{ scale: 0.9 }}
                onClick={goStart}
                className="bg-[#58cc02] text-white h-32 md:h-48 px-20 md:px-40 rounded-[50px] md:rounded-[70px] text-4xl md:text-7xl shadow-[0_40px_80px_rgba(88,204,2,0.5)] font-black flex items-center justify-center w-full transition-all border-b-[20px] border-[#58a700]/80"
              >
                START NOW
              </motion.button>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-gradient-to-br from-[#58cc02]/30 via-transparent to-transparent pointer-events-none group-hover:rotate-180 transition-transform duration-[6000ms]" />
          </motion.div>
        </div>
      </section>

      {/* Global Safety Footer */}
      <footer className="py-32 md:py-48 px-8 border-t-2 border-white/10 bg-black relative">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-24">
          <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-white/20 group-hover:bg-[#58cc02]/30 transition-all shadow-inner">
              <Kavach size={48} expression="idle" trackMouse={false} />
            </div>
            <span className="font-display font-black text-4xl md:text-6xl tracking-tightest text-white">PhishProof</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-14 md:gap-20 text-xs md:text-sm font-black uppercase tracking-[0.5em] text-white/40">
            {['Safety', 'Privacy', 'Bharat Safe'].map(link => (
                <a key={link} href="#" className="hover:text-[#58cc02] transition-colors">{link}</a>
            ))}
            <a href="https://cybercrime.gov.in" target="_blank" className="text-[#ff4b4b] hover:underline font-black decoration-4 underline-offset-8">REPORT SCAM: 1930</a>
          </div>

          <div className="text-sm font-black text-white/20 uppercase tracking-[0.4em]">
            © 2026 Developed for digital bharat.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color, className = "", delay = 0 }) => {
  return (
    <motion.div 
      className={`feature-card bg-white/5 backdrop-blur-3xl rounded-[80px] border-2 border-white/10 flex flex-col items-start gap-12 shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] transition-all duration-700 overflow-hidden group hover:border-[#58cc02]/60 hover:bg-white/10 ${className}`}
    >
      <div className="w-28 h-28 md:w-36 md:h-36 rounded-[45px] flex items-center justify-center border-2 border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-700 group-hover:rotate-12" style={{ backgroundColor: `${color}25`, color }}>
        <div className="scale-[1.5] md:scale-[2]">{icon}</div>
      </div>
      <div>
        <h3 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter text-white drop-shadow-md">{title}</h3>
        <p className="text-2xl md:text-3xl text-white font-black leading-tight opacity-100">{desc}</p>
      </div>
    </motion.div>
  );
};

export default Landing;
