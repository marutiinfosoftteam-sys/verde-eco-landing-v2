import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import Tilt from 'react-parallax-tilt';
import { 
  Leaf, 
  ShieldCheck, 
  Zap, 
  BatteryCharging, 
  Smartphone, 
  Menu, 
  X, 
  ChevronDown, 
  Star, 
  Check, 
  ArrowRight,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Hero Card Interactive Particle Constellation Canvas
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouse = { x: null, y: null, radius: 130 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            let angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * 1.5;
            p.y -= Math.sin(angle) * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist / 100})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-10" />;
}

// Full Background Cinematic 3D Portal Canvas
function Cinematic3DPortalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let angle = 0;
    const particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 250 + 50,
        speed: Math.random() * 0.015 + 0.005,
        yOffset: (Math.random() - 0.5) * 150,
        size: Math.random() * 2.2 + 0.8,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.008;

      const cx = width / 2;
      const cy = height / 2;

      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, 250);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
      gradient.addColorStop(0.5, 'rgba(20, 184, 166, 0.1)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 250, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle + angle) * p.radius * 1.8;
        const y = cy + Math.sin(p.angle + angle) * (p.radius * 0.6) + p.yOffset;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#10b981';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0" />;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [openFaq, setOpenFaq] = useState(null);

  const featuresRef = useRef(null);
  const reviewsRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.querySelectorAll('.gsap-feature-card'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (reviewsRef.current) {
        gsap.fromTo(
          reviewsRef.current.querySelectorAll('.gsap-review-card'),
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const headings = document.querySelectorAll('.gsap-heading');
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -80 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const faqs = [
    {
      q: "How does the Verde Eco-Monitor charge itself?",
      a: "Verde features an integrated microscopic transparent solar film that captures both indoor ambient light and outdoor sunlight, ensuring continuous operation."
    },
    {
      q: "Is the device water and dust resistant?",
      a: "Yes! Verde is rated IP67, making it resistant to accidental spills, heavy rain, and dust particles during outdoor adventures."
    },
    {
      q: "How do I sync the device with my phone?",
      a: "Verde connects effortlessly via Bluetooth 5.3 to our companion app available on both iOS and Android for real-time energy and environmental tracking."
    },
    {
      q: "What is the warranty period?",
      a: "We offer a 2-year comprehensive replacement warranty covering any hardware defects or battery degradation."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">

      {/* Global Background Tech Grid & Scanline Animation Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-tech-grid opacity-70"></div>
        <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent animate-scanline"></div>

        <motion.div 
          animate={{ x: [0, 100, -50, 0], y: [0, -80, 100, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 w-[500px] h-[500px] bg-emerald-500/10 blur-[160px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -120, 80, 0], y: [0, 100, -60, 0], scale: [1, 0.9, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-teal-500/10 blur-[180px] rounded-full"
        />
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors group-hover:border-emerald-400"
            >
              <Leaf className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-white">Verde<span className="text-emerald-400">.</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            {['Features', 'Reviews', 'Pricing', 'FAQ'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)} 
                className="hover:text-emerald-400 transition duration-200 hover:-translate-y-0.5 inline-block"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#pricing" 
              onClick={(e) => handleNavClick(e, '#pricing')} 
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-emerald-500/20"
            >
              Pre-Order Now
            </motion.a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4"
            >
              <a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Features</a>
              <a href="#reviews" onClick={(e) => handleNavClick(e, '#reviews')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Reviews</a>
              <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Pricing</a>
              <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">FAQ</a>
              <div className="pt-2">
                <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="block w-full py-3 text-center rounded-xl bg-emerald-500 font-semibold text-slate-950">
                  Pre-Order Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden relative bg-transparent">
        <Cinematic3DPortalCanvas />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                <span>Next-Gen Sustainable Tech</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Power Your Life, <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Protect the Planet.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal">
                Meet Verde, the revolutionary solar-powered smart monitor designed to track your carbon footprint and energize your daily routine with zero guilt.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/25">
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold transition text-center">
                  Explore Features
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <Tilt perspective={1000} glareEnable={true} glareMaxOpacity={0.3} scale={1.02} className="w-full max-w-md">
                <div className="relative w-full h-[380px] rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
                  <ParticleCanvas />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-400/10 pointer-events-none"></div>
                  
                  <div className="relative z-20 bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 px-6 py-4 rounded-2xl text-center shadow-xl">
                    <Leaf className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
                    <h3 className="text-sm font-bold text-white">Verde Interactive Core</h3>
                    <p className="text-xs text-emerald-400 mt-0.5">Move cursor to interact</p>
                  </div>
                </div>
              </Tilt>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section id="features" ref={featuresRef} className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 gsap-heading">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Engineered for Excellence</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Packed with Sustainable Innovation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BatteryCharging, title: "Infinite Solar", desc: "Never plug in again. Transparent solar cells harvest both indoor and outdoor light seamlessly." },
              { icon: Zap, title: "Lightning Fast", desc: "Equipped with optimized low-power architecture for instantaneous data response." },
              { icon: ShieldCheck, title: "Built to Last", desc: "Crafted from 100% recycled aerospace aluminum and reclaimed ocean plastics." },
              { icon: Smartphone, title: "Smart Sync", desc: "Pair seamlessly with iOS and Android apps to view real-time eco-statistics." }
            ].map((feature, idx) => (
              <Tilt key={idx} perspective={800} scale={1.03} className="h-full">
                <div className="gsap-feature-card h-full bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl space-y-4 shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" ref={reviewsRef} className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 gsap-heading">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Loved by Thousands</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">What Our Community Says</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Environmental Designer", text: "Verde completely changed how I monitor my household energy usage. The design is sleek and minimalist!" },
              { name: "Marcus Chen", role: "Tech Reviewer", text: "Unbelievable battery life powered purely by ambient room light. A must-have gadget for any eco-conscious household." },
              { name: "Elena Rostova", role: "Sustainability Lead", text: "The app integration is flawless and seeing my real-time carbon offset is surprisingly motivating." }
            ].map((review, idx) => (
              <Tilt key={idx} perspective={800} scale={1.02} className="h-full">
                <div className="gsap-review-card h-full bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl space-y-4 flex flex-col justify-between shadow-xl">
                  <div className="space-y-4">
                    <div className="flex space-x-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm italic">"{review.text}"</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800/80">
                    <p className="font-bold text-white text-sm">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Simple, Transparent Pricing */}
      <section id="pricing" className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 gsap-heading">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Flexible Options</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Simple, Transparent Pricing</p>
            <p className="text-slate-400 text-base">Choose the perfect plan to start your sustainable journey today.</p>
            
            <div className="flex items-center justify-center space-x-4 pt-4">
              <span className={`text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 bg-slate-800 rounded-full p-1 relative transition border border-slate-700 cursor-pointer"
              >
                <div className={`w-6 h-6 bg-emerald-500 rounded-full transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-sm font-semibold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Annual <span className="text-emerald-400 text-xs">(Save 20%)</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Tilt perspective={1000} scale={1.02} className="h-full">
              <div 
                onClick={() => handlePlanSelect('starter')}
                className={`h-full bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 space-y-6 flex flex-col justify-between transition-all duration-300 cursor-pointer relative z-10 ${
                  selectedPlan === 'starter'
                    ? 'border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20'
                    : 'border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">Starter Eco</h3>
                      <p className="text-sm text-slate-400 mt-1">Perfect for individuals beginning their green journey.</p>
                    </div>
                    {selectedPlan === 'starter' && (
                      <span className="bg-emerald-500 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-white">{isAnnual ? '$99' : '$129'}</span>
                    <span className="text-sm text-slate-400">/ device</span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>Verde Standard Device</span></li>
                    <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>Basic App Telemetry Sync</span></li>
                    <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>1-Year Hardware Warranty</span></li>
                  </ul>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect('starter');
                  }}
                  className={`w-full py-3.5 rounded-xl font-semibold transition cursor-pointer ${
                    selectedPlan === 'starter'
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {selectedPlan === 'starter' ? 'Selected Plan' : 'Choose Starter'}
                </button>
              </div>
            </Tilt>

            <Tilt perspective={1000} scale={1.02} className="h-full">
              <div 
                onClick={() => handlePlanSelect('pro')}
                className={`h-full bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 space-y-6 flex flex-col justify-between relative transition-all duration-300 cursor-pointer z-10 ${
                  selectedPlan === 'pro'
                    ? 'border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20'
                    : 'border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="absolute -top-3.5 right-8 bg-emerald-500 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full z-20">
                  Most Popular
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Pro Sustainable</h3>
                    <p className="text-sm text-slate-400 mt-1">Ideal for complete home monitoring and advanced analytics.</p>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-extrabold text-white">{isAnnual ? '$159' : '$199'}</span>
                    <span className="text-sm text-slate-400">/ device</span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>Verde Pro Device + Solar Hub</span></li>
                    <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>Advanced Analytics & API Access</span></li>
                    <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>2-Year Comprehensive Warranty</span></li>
                    <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>Priority Customer Support</span></li>
                  </ul>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect('pro');
                  }}
                  className={`w-full py-3.5 rounded-xl font-semibold transition cursor-pointer ${
                    selectedPlan === 'pro'
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {selectedPlan === 'pro' ? 'Selected Plan' : 'Choose Pro'}
                </button>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-16 gsap-heading">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Got Questions?</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-colors shadow-xl relative z-10"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left font-semibold text-white flex justify-between items-center focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">Verde<span className="text-emerald-400">.</span></span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Verde Eco Inc. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-slate-400">
            <a href="#" className="hover:text-emerald-400 transition">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition">Terms</a>
            <a href="#" className="hover:text-emerald-400 transition">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}