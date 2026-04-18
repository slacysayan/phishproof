import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Kavach from '@/components/Mascot/Kavach';
import { Shield, Zap, Trophy, Heart, Users, Flame, ChevronRight, Check, Smartphone, CreditCard, Mail, Phone, MessageCircle, Globe, Lock, Star, Target, Brain, Award } from 'lucide-react';

const stats = [
  { value: '43%', label: 'Indian teens clicked a phishing link' },
  { value: '300%', label: 'UPI fraud rise in 3 years' },
  { value: '28%', label: 'teens shared an OTP with a stranger' },
  { value: '60+', label: 'real Indian scam scenarios inside' },
];

const features = [
  { icon: <Smartphone className="w-6 h-6" />, title: 'Built for Indian scams', desc: 'Real UPI, WhatsApp, bank SMS, KYC and job scams — not generic phishing examples.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Learn in 3-minute bursts', desc: 'Bite-sized lessons. Play one between classes, one at bus stop, one before bed.' },
  { icon: <Trophy className="w-6 h-6" />, title: 'Earn XP, keep your streak', desc: 'Hearts, levels, badges, daily missions. The game you will actually come back to.' },
  { icon: <Shield className="w-6 h-6" />, title: 'No login, no tracking', desc: 'Works instantly in your browser. Progress saved on your device. Free forever.' },
];

const categories = [
  { icon: <MessageCircle className="w-5 h-5" />, name: 'SMS Scams', desc: 'Fake bank alerts, delivery links, OTP baits' },
  { icon: <CreditCard className="w-5 h-5" />, name: 'UPI Tricks', desc: 'Collect requests, fake refunds, QR traps' },
  { icon: <Lock className="w-5 h-5" />, name: 'KYC & Banks', desc: 'Bank impersonation, Aadhaar traps' },
  { icon: <MessageCircle className="w-5 h-5" />, name: 'Social Engineering', desc: 'WhatsApp scams, digital arrest, fake friends' },
  { icon: <Users className="w-5 h-5" />, name: 'Fake Jobs', desc: 'Work-from-home traps, paid recruitment' },
  { icon: <Award className="w-5 h-5" />, name: 'Expert Gauntlet', desc: 'Mixed difficulty, for seasoned defenders' },
];

const testimonials = [
  { name: 'Aarav, 16', city: 'Bengaluru', quote: '“I almost paid a ₹499 ‘registration fee’ for a fake Amazon WFH job last month. After two PhishProof lessons, I caught the exact same pattern on WhatsApp.”' },
  { name: 'Priya, 17', city: 'Pune', quote: '“The ‘digital arrest’ scam lesson is scary accurate. I called my dad and made him play it.”' },
  { name: 'Rohan, 14', city: 'Delhi', quote: '“Kavach is the cutest shield. I’ve got a 12-day streak and I check URLs now without thinking.”' },
];

const Landing = () => {
  const navigate = useNavigate();
  const heroTitle = useRef(null);
  const heroSub = useRef(null);
  const heroMascot = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroMascot.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' })
      .fromTo(heroTitle.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo(heroSub.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
  }, []);

  const goStart = () => navigate('/start');

  return (
    <div className="min-h-dvh bg-white text-[#242424]" data-testid="landing-page">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#0000000d]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9"><Kavach size={36} expression="idle" /></div>
            <span className="font-display font-bold text-lg tracking-tight" style={{fontFamily: 'var(--font-display)'}}>PhishProof</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#242424]">
            <a href="#features" className="hover:text-black">Features</a>
            <a href="#scams" className="hover:text-black">Scam types</a>
            <a href="#how" className="hover:text-black">How it works</a>
            <a href="#stories" className="hover:text-black">Stories</a>
          </div>
          <button onClick={goStart} className="pp-duo-btn pp-duo-dark h-10 px-5 text-xs" data-testid="nav-start-button">
            Start Playing
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5f5f5] text-xs font-semibold text-[#242424] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#58cc02]" />
                Built in India • Free forever
              </div>
              <h1 ref={heroTitle} className="text-[42px] md:text-[64px] leading-[1.05] font-bold tracking-tight" style={{fontFamily: 'var(--font-display)'}}>
                The <span className="text-[#58cc02]">fun</span>, free way to<br />
                <span className="text-[#1cb0f6]">outsmart</span> every scam.
              </h1>
              <p ref={heroSub} className="mt-6 text-lg text-[#6b6b6b] leading-relaxed max-w-[520px]">
                PhishProof trains Indian teenagers to spot UPI fraud, phishing SMS, fake KYC calls and job scams — through bite-sized, game-like lessons. No login. Your brain, level 1 to scam-immune.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <button onClick={goStart} className="pp-duo-btn pp-duo-green h-14 px-8 text-sm" data-testid="hero-start-button">
                  Get Started
                </button>
                <button onClick={goStart} className="pp-duo-btn pp-duo-ghost h-14 px-8 text-sm" data-testid="hero-continue-button">
                  I Have An Account
                </button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-[#898989]">
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#58cc02]" /> No signup</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#58cc02]" /> Free forever</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#58cc02]" /> Works on mobile</span>
              </div>
            </div>
            <div ref={heroMascot} className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -top-8 -left-6 rotate-[-8deg] px-3 py-2 rounded-xl bg-white shadow-[var(--pp-shadow-card)] text-xs font-semibold text-[#242424] flex items-center gap-2 pp-float">
                  <Flame className="w-4 h-4 text-[#ff9800]" /> 7-day streak 🔥
                </div>
                <div className="absolute -bottom-4 -right-2 rotate-[6deg] px-3 py-2 rounded-xl bg-white shadow-[var(--pp-shadow-card)] text-xs font-semibold text-[#242424] flex items-center gap-2 pp-float" style={{ animationDelay: '1s' }}>
                  <Star className="w-4 h-4 text-[#ffb703] fill-[#ffb703]" /> +50 XP
                </div>
                <div className="absolute top-1/2 -left-10 -translate-y-1/2 px-3 py-2 rounded-xl bg-white shadow-[var(--pp-shadow-card)] text-xs font-semibold text-[#ff4b4b] flex items-center gap-2 pp-float" style={{ animationDelay: '1.6s' }}>
                  <Heart className="w-4 h-4 fill-[#ff4b4b]" /> 5 hearts
                </div>
                <div className="pp-float">
                  <Kavach size={280} expression="happy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-10 md:py-12 border-y border-[#0000000d] bg-[#fafafa]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((s, i) => (
              <div key={i} className="text-left md:text-center" data-testid={`landing-stat-${i}`}>
                <div className="text-3xl md:text-4xl font-bold text-[#242424]" style={{fontFamily: 'var(--font-display)'}}>{s.value}</div>
                <div className="text-xs md:text-sm text-[#6b6b6b] mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-[#f5f5f5] text-[11px] font-semibold uppercase tracking-widest text-[#898989] mb-4">Why PhishProof</div>
            <h2 className="text-[32px] md:text-[48px] leading-tight font-bold" style={{fontFamily: 'var(--font-display)'}}>
              Passive safety videos don’t work.<br /><span className="text-[#898989]">Reflexes do.</span>
            </h2>
            <p className="mt-4 text-[#6b6b6b] text-base md:text-lg">Only repeated exposure to realistic fake scenarios — with instant feedback — builds the 3-second scam reflex.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <div key={i} className="pp-card pp-card-hover p-6 text-left" data-testid={`feature-${i}`}>
                <div className="w-11 h-11 rounded-xl bg-[#242424] text-white flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-1" style={{fontFamily: 'var(--font-display)'}}>{f.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCAM CATEGORIES */}
      <section id="scams" className="py-20 md:py-24 bg-[#fafafa] border-y border-[#0000000d]">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white pp-ring text-[11px] font-semibold uppercase tracking-widest text-[#898989] mb-4">6 Scam categories</div>
              <h2 className="text-[32px] md:text-[44px] leading-tight font-bold mb-4" style={{fontFamily: 'var(--font-display)'}}>Every trick Indian<br />teens actually face.</h2>
              <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed">From “fake refund” UPI collect requests to “digital arrest” phone calls — our scenarios are built from real fraud reports filed at cybercrime.gov.in.</p>
              <button onClick={goStart} className="mt-8 pp-duo-btn pp-duo-dark h-12 px-6 text-xs">See The Skill Map →</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {categories.map((c, i) => (
                <div key={i} className="pp-card p-4 flex items-start gap-3" data-testid={`category-${i}`}>
                  <div className="w-10 h-10 rounded-lg bg-[#1cb0f6]/10 text-[#1cb0f6] flex items-center justify-center shrink-0">{c.icon}</div>
                  <div>
                    <div className="font-bold text-sm" style={{fontFamily: 'var(--font-display)'}}>{c.name}</div>
                    <div className="text-xs text-[#6b6b6b] leading-relaxed mt-0.5">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-[#f5f5f5] text-[11px] font-semibold uppercase tracking-widest text-[#898989] mb-4">How it works</div>
            <h2 className="text-[32px] md:text-[44px] leading-tight font-bold" style={{fontFamily: 'var(--font-display)'}}>Play. Miss. Learn the trick. Remember forever.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: <Brain className="w-5 h-5" />, title: 'See a real-looking scam', desc: 'A WhatsApp from “Mom”. A UPI refund. A bank SMS. Everything looks exactly like the real thing.' },
              { n: '02', icon: <Target className="w-5 h-5" />, title: 'Decide: legit or scam?', desc: 'Swipe, tap, or rank. You have 5 hearts per lesson. Fast calls earn bonus XP.' },
              { n: '03', icon: <Shield className="w-5 h-5" />, title: 'Get the breakdown', desc: 'Kavach highlights every red flag, teaches the trick, and tells you what to do in real life.' },
            ].map((step, i) => (
              <div key={i} className="pp-card p-6 relative" data-testid={`how-step-${i}`}>
                <div className="text-[48px] leading-none font-black text-[#f0f0f0] absolute top-3 right-4" style={{fontFamily: 'var(--font-display)'}}>{step.n}</div>
                <div className="w-10 h-10 rounded-lg bg-[#58cc02]/10 text-[#58a700] flex items-center justify-center mb-3">{step.icon}</div>
                <h3 className="text-lg font-bold mb-1" style={{fontFamily: 'var(--font-display)'}}>{step.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="stories" className="py-20 md:py-28 bg-[#fafafa] border-y border-[#0000000d]">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-white pp-ring text-[11px] font-semibold uppercase tracking-widest text-[#898989] mb-4">Real stories</div>
            <h2 className="text-[32px] md:text-[44px] leading-tight font-bold" style={{fontFamily: 'var(--font-display)'}}>Teens who stopped falling<br />for scams.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="pp-card p-6" data-testid={`testimonial-${i}`}>
                <div className="flex gap-1 mb-3">{Array.from({length:5}).map((_,k)=>(<Star key={k} className="w-4 h-4 text-[#ffb703] fill-[#ffb703]" />))}</div>
                <p className="text-[#242424] text-[15px] leading-relaxed mb-4">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#58cc02] to-[#1cb0f6] flex items-center justify-center text-white font-bold" style={{fontFamily:'var(--font-display)'}}>{t.name[0]}</div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-[#898989]">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          <div className="pp-card p-8 md:p-14 text-center bg-[#242424] text-white border-0 relative overflow-hidden" style={{boxShadow: '0 20px 60px rgba(34,42,53,0.25)'}}>
            <div className="absolute -top-6 -right-6 opacity-20"><Kavach size={140} expression="idle" /></div>
            <h2 className="text-[32px] md:text-[48px] leading-tight font-bold max-w-2xl mx-auto" style={{fontFamily:'var(--font-display)'}}>Your first scam recognition reflex is 5 minutes away.</h2>
            <p className="text-white/70 mt-4 max-w-xl mx-auto">No sign-up. No download. No pretend quiz — just one real scenario at a time.</p>
            <button onClick={goStart} className="pp-duo-btn pp-duo-green h-14 px-10 text-sm mt-8" data-testid="cta-start-button">Start Playing Free</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#0000000d] py-10">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#898989]">
          <div className="flex items-center gap-2">
            <Kavach size={28} expression="idle" />
            <span className="font-display font-bold text-[#242424]" style={{fontFamily:'var(--font-display)'}}>PhishProof</span>
            <span className="ml-3">© 2026</span>
          </div>
          <div className="flex items-center gap-5">
            <span>Cyber helpline: <span className="font-mono text-[#242424]">1930</span></span>
            <span className="hidden md:inline">•</span>
            <a href="https://cybercrime.gov.in" className="hover:text-[#242424]">cybercrime.gov.in</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
