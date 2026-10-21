import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import Tilt from 'react-parallax-tilt';
import Background3D from './Background3D';
import { LoadingScreen, ScrollProgress, CursorGlow, CountUp, RevealText, Reveal } from './Effects';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHero, PageExtra } from './Sections';
import PolicyPage from './Policies';

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
  Globe,
  Send,
  Info,
  Cpu,
  CreditCard,
  Lock,
  ShoppingBag,
  CheckCircle2,
  ExternalLink,
  Sun,
  Calculator,
  Award,
  PackageCheck,
  Sparkles,
  Clock,
  Image as ImageIcon,
  MessageSquare,
  Bot,
  TrendingUp,
  Users
} from 'lucide-react';

// ===== EDIT THESE =====
const CONTACT_EMAIL = 'hello@your-domain.com';   // apna real email
const FORM_ENDPOINT = '';                         // Formspree URL, e.g. 'https://formspree.io/f/xxxx' (khali = mailto use hoga)
const OFFER_END = new Date('2026-12-31T23:59:59'); // offer ki asli last date
const SHOW_DEMO_SOCIAL_PROOF = false;             // fake "just ordered" popup (real orders ho tab hi true karo)
const VALID_PAGES = ['home','about','products','features','calculator','gallery','reviews','pricing','faq','contact','privacy','terms','refund'];
const socialProofList = [
  { name: "Rahul Sharma", city: "Mumbai", product: "Verde Pro + Solar Hub", time: "2 mins ago" },
  { name: "Jessica Miller", city: "London", product: "Verde Eco-Monitor Standard", time: "5 mins ago" },
  { name: "Amit Patel", city: "Ahmedabad", product: "Verde Pro + Solar Hub", time: "12 mins ago" },
  { name: "Lucas Moreau", city: "Paris", product: "Verde Eco-Monitor Standard", time: "18 mins ago" }
];
const calcTimeLeft = () => {
  const diff = Math.max(0, OFFER_END.getTime() - Date.now());
  return { hours: Math.floor(diff / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) };
};

// Particle Canvas for Hero & Visuals
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

function Cinematic3DPortalCanvas() {
  return null;
}


export default function App() {
  const location = useLocation();
const navigate = useNavigate();
const seg = location.pathname.slice(1);
const currentPage = VALID_PAGES.includes(seg) ? seg : 'home';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [openFaq, setOpenFaq] = useState(null);

  // Multi-Currency State
  const [currency, setCurrency] = useState('USD');
  const currencyRates = { USD: { symbol: '$', rate: 1 }, EUR: { symbol: '€', rate: 0.92 }, GBP: { symbol: '£', rate: 0.79 }, INR: { symbol: '₹', rate: 83 } };
  const curr = currencyRates[currency];

  // Countdown Timer (real deadline: OFFER_END)
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Modal States
  const [selectedFeatureModal, setSelectedFeatureModal] = useState(null);
  const [productPreviewModal, setProductPreviewModal] = useState(null);

  // Carbon Calculator State
  const [monthlyBill, setMonthlyBill] = useState(150);
  const calculatedSavings = Math.round(monthlyBill * 0.35);
  const calculatedCarbonOffset = Math.round(monthlyBill * 1.8);

  // Social Proof Toast State
  const [socialToast, setSocialToast] = useState(null);

  useEffect(() => {
    if (!SHOW_DEMO_SOCIAL_PROOF) return;
    const interval = setInterval(() => {
      const randomItem = socialProofList[Math.floor(Math.random() * socialProofList.length)];
      setSocialToast(randomItem);
      setTimeout(() => setSocialToast(null), 5000);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your Verde Eco Assistant. Ask me anything about our solar monitors, installation, or shipping!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let botReply = "Verde devices feature transparent solar films that charge automatically under indoor or outdoor light! You can pre-order from our pricing section.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('buy')) {
        botReply = `Our Standard monitor is ${getPriceFormatted(rawPrices.starter)} and the Pro Solar Hub is ${getPriceFormatted(rawPrices.pro)}.`;
      } else if (lower.includes('shipping') || lower.includes('deliver')) {
        botReply = "We offer free eco-friendly worldwide shipping on all orders. Standard has a 1-year warranty and Pro has a 2-year warranty.";
      } else if (lower.includes('water') || lower.includes('durable')) {
        botReply = "Yes, Verde is IP67 certified water and dustproof.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 800);
  };

  // Safe Demo Checkout State (Demo Only - No Real Financial Exposure)
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ name: '', email: '', cardNumber: '', expiry: '', cvv: '' });

  // Contact Form State
  const [formData, setFormData] = useState({ fullName: '', email: '', productInterest: 'Verde Eco-Monitor Standard', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });

  // Mobile Drawer Scroll Lock Effect (Requirement 5)
  useEffect(() => {
  const lock = mobileMenuOpen;
  document.body.style.overflow = lock ? 'hidden' : '';
  document.documentElement.style.overflow = lock ? 'hidden' : '';
  if (lenisRef.current) { if (lock) lenisRef.current.stop(); else lenisRef.current.start(); }
  return () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (lenisRef.current) lenisRef.current.start();
  };
}, [mobileMenuOpen]);

  // Handle ESC key to close modal/drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCheckoutModalOpen(false);
        setProductPreviewModal(null);
        setSelectedFeatureModal(null);
        setChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const lenisRef = useRef(null);

  const featureDetailsMap = [
    { 
      id: 'solar',
      icon: BatteryCharging, 
      title: "Infinite Solar", 
      desc: "Never plug in again. Transparent solar cells harvest both indoor and outdoor light seamlessly.",
      bgGradient: "from-amber-500/20 via-emerald-500/10 to-slate-900",
      accentIcon: Sun,
      highlights: [
        "Photovoltaic Transparent Layer with 92% Light Absorption.",
        "Charges under ambient room lighting as low as 100 Lux.",
        "Zero electricity bills and continuous operational uptime."
      ]
    },
    { 
      id: 'fast',
      icon: Zap, 
      title: "Lightning Fast", 
      desc: "Equipped with optimized low-power architecture for instantaneous data response.",
      bgGradient: "from-teal-500/20 via-emerald-500/10 to-slate-900",
      accentIcon: Zap,
      highlights: [
        "Ultra-low latency microchip telemetry updating every 100ms.",
        "Instantaneous push notification alerts for energy spikes.",
        "Optimized ARM Cortex processor for minimal power draw."
      ]
    },
    { 
      id: 'durable',
      icon: ShieldCheck, 
      title: "Built to Last", 
      desc: "Crafted from 100% recycled aerospace aluminum and reclaimed ocean plastics.",
      bgGradient: "from-emerald-500/20 via-cyan-500/10 to-slate-900",
      accentIcon: ShieldCheck,
      highlights: [
        "IP67 Certified: Complete dust protection and water resistance up to 1m.",
        "Scratch-resistant Sapphire glass shielding the sensors.",
        "Manufactured with 0% virgin plastics and 100% recyclable components."
      ]
    },
    { 
      id: 'sync',
      icon: Smartphone, 
      title: "Smart Sync", 
      desc: "Pair seamlessly with iOS and Android apps to view real-time eco-statistics.",
      bgGradient: "from-blue-500/20 via-emerald-500/10 to-slate-900",
      accentIcon: Smartphone,
      highlights: [
        "Bluetooth 5.3 Low Energy protocol with auto-pairing.",
        "Comprehensive dashboard tracking carbon offset metrics.",
        "Seamless cloud backup with end-to-end telemetry encryption."
      ]
    }
  ];

     const rawPrices = { starter: 99, pro: 159 };

  const getPriceFormatted = (baseUSD) => {
    const converted = Math.round(baseUSD * curr.rate);
    return `${curr.symbol}${converted}`;
  };

  const productDetailsMap = {
    starter: {
      id: 'starter',
      title: 'Verde Eco-Monitor Standard',
      tagline: 'Essential Household Energy & Solar Monitor',
      basePrice: rawPrices.starter,
      icon: BatteryCharging,
      badge: 'Standard Edition',
      bgGradient: 'from-emerald-500/20 via-teal-500/10 to-slate-900',
      specs: [
        { label: 'Solar Panel', val: 'Micro-Transparent Photovoltaic' },
        { label: 'Connectivity', val: 'Bluetooth 5.3 LE' },
        { label: 'Battery Backup', val: '120 Hours Continuous without light' },
        { label: 'Rating', val: 'IP67 Water & Dustproof' }
      ],
      boxItems: [
        '1x Verde Eco-Monitor Standard Unit',
        '1x Magnetic Wall Mount Stand',
        '1x Recycled Paper Quick Start Guide',
        '1x 1-Year Hardware Warranty Certificate'
      ]
    },
    pro: {
      id: 'pro',
      title: 'Verde Pro + Solar Hub',
      tagline: 'Whole-Home Analytics & Energy Automation Hub',
      basePrice: rawPrices.pro,
      icon: Zap,
      badge: 'Flagship Edition',
      bgGradient: 'from-teal-500/20 via-emerald-500/20 to-slate-900',
      specs: [
        { label: 'Solar Hub Panel', val: 'Dual-Facet Transparent Solar Array' },
        { label: 'Connectivity', val: 'Bluetooth 5.3 + Dual-Band Wi-Fi' },
        { label: 'API & Analytics', val: 'Full Developer Access + Cloud Sync' },
        { label: 'Rating', val: 'IP67 Heavy-Duty Certified' }
      ],
      boxItems: [
        '1x Verde Pro Main Monitoring Console',
        '1x High-Efficiency Solar Hub Attachment',
        '1x Universal Magnetic Desk & Wall Mount',
        '1x Developer API Access Key & Companion App License',
        '1x 2-Year Comprehensive Warranty Card'
      ]
    }
  };

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

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const handlePageChange = (pageId) => {
  navigate(pageId === 'home' ? '/' : '/' + pageId);
  setMobileMenuOpen(false);
  window.dispatchEvent(new Event('verde-nav'));
  if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
};

  
  useEffect(() => {
    document.title = currentPage === 'home'
      ? 'Verde Eco | Solar-Powered Smart Energy Monitor'
      : `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} | Verde Eco`;
  }, [currentPage]);

  const handleInquireClick = (planKey) => {
    setSelectedPlan(planKey);
    setProductPreviewModal(productDetailsMap[planKey]);
  };

  const handleProceedToCheckout = () => {
    setProductPreviewModal(null);
    setOrderSuccess(false);
    setCheckoutModalOpen(true);
  };

  // Safe Demo Checkout handler (No real financial keys exposed)
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCheckoutLoading(true);

    setTimeout(() => {
      setCheckoutLoading(false);
      setOrderSuccess(true);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }, 1200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setFormStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }
    setFormStatus({ submitting: true, success: false, error: '' });
    const done = () => {
      setFormStatus({ submitting: false, success: true, error: '' });
      setFormData({ fullName: '', email: '', productInterest: 'Verde Eco-Monitor Standard', subject: '', message: '' });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    };
    if (!FORM_ENDPOINT) {
      const body = `${formData.message}\n\nFrom: ${formData.fullName} (${formData.email})\nInterest: ${formData.productInterest}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject || 'Verde inquiry')}&body=${encodeURIComponent(body)}`;
      done();
      return;
    }
    fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(formData) })
      .then((r) => { if (!r.ok) throw new Error(); done(); })
      .catch(() => setFormStatus({ submitting: false, success: false, error: 'Could not send. Please try again or email us directly.' }));
  };

  const faqs = [
    { q: "How does the Verde Eco-Monitor charge itself?", a: "Verde features an integrated microscopic transparent solar film that captures both indoor ambient light and outdoor sunlight, ensuring continuous operation." },
    { q: "Is the device water and dust resistant?", a: "Yes! Verde is rated IP67, making it resistant to accidental spills, heavy rain, and dust particles during outdoor adventures." },
    { q: "How do I sync the device with my phone?", a: "Verde connects effortlessly via Bluetooth 5.3 to our companion app available on both iOS and Android for real-time energy and environmental tracking." },
    { q: "What is the warranty period?", a: "Verde Standard includes a 1-year hardware warranty and Verde Pro includes a 2-year comprehensive replacement warranty covering hardware defects." }
  ];

  const planDetails = {
    starter: { title: 'Starter Eco', price: rawPrices.starter, features: ['Verde Standard Device', 'Basic App Telemetry Sync', '1-Year Hardware Warranty'] },
    pro: { title: 'Pro Sustainable', price: rawPrices.pro, features: ['Verde Pro Device + Solar Hub', 'Advanced Analytics & API Access', '2-Year Comprehensive Warranty', 'Priority Customer Support'] }
  };

  const activePlan = planDetails[selectedPlan];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
    <Background3D />
      <LoadingScreen />
      <ScrollProgress />
      <CursorGlow />
      {/* Social Proof Toast */}
      <AnimatePresence>
        {socialToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 p-4 rounded-2xl shadow-2xl flex items-center space-x-3.5 max-w-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-0.5">
              <p className="text-white font-bold">{socialToast.name} from {socialToast.city}</p>
              <p className="text-slate-300">Just pre-ordered <span className="text-emerald-400 font-semibold">{socialToast.product}</span></p>
              <p className="text-[10px] text-slate-400">{socialToast.time} • Verified Demo Order</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Eco-Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-[calc(100vw-3rem)] max-w-sm sm:w-96 rounded-3xl shadow-2xl overflow-hidden mb-4 flex flex-col h-[420px]"
            >
              <div className="bg-emerald-600 p-4 text-slate-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Verde Quick Help</span>
                </div>
                <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="text-slate-950 hover:opacity-70 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-950/60" data-lenis-prevent>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'user' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'bg-slate-900 border border-slate-800 text-slate-200'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Ask about price, specs..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl cursor-pointer">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setChatOpen(!chatOpen)} aria-label="Toggle chat"
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-slate-950 px-4 py-2 text-xs font-bold text-center flex flex-wrap items-center justify-center gap-3 relative z-40 shadow-md">
        <div className="flex items-center space-x-1.5">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>⚡ Early Bird Pre-Order Discount Ends In:</span>
        </div>
        <div className="bg-slate-950 text-emerald-400 px-2.5 py-1 rounded-lg font-mono text-xs shadow-inner">
          {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </div>
        <span className="hidden sm:inline opacity-80"> | Early-bird pre-order pricing</span>
      </div>

      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => handlePageChange('home')} className="flex items-center space-x-2 cursor-pointer group bg-transparent border-0">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors group-hover:border-emerald-400"
            >
              <Leaf className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-white">Verde<span className="text-emerald-400">.</span></span>
          </button>

          <div className="hidden xl:flex items-center space-x-7 text-sm font-medium text-slate-300">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'products', label: 'Products' },
              { id: 'features', label: 'Features' },
              { id: 'calculator', label: 'Calculator' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`transition duration-200 hover:text-emerald-400 cursor-pointer bg-transparent border-0 font-medium text-sm ${
                  currentPage === item.id ? 'text-emerald-400 font-bold border-b-2 border-emerald-400 pb-0.5' : 'text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <select 
                aria-label="Currency" value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400 absolute right-4 top-3 pointer-events-none" />
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange('pricing')} 
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer border-0"
            >
              Pre-Order Now
            </motion.button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}
            className="xl:hidden text-slate-300 hover:text-white focus:outline-none cursor-pointer p-2 bg-transparent border-0"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer with Scroll Lock & Auto-Close */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto" data-lenis-prevent
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase text-slate-400">Select Currency</span>
                <div className="relative">
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold rounded-lg px-3 py-1.5 pr-7 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-emerald-400 absolute right-3.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'products', label: 'Products' },
                { id: 'features', label: 'Features' },
                { id: 'calculator', label: 'Carbon Calculator' },
                { id: 'gallery', label: 'Customer Gallery' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact Us' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handlePageChange(m.id)}
                  className={`block w-full text-left text-base font-medium py-1.5 transition bg-transparent border-0 cursor-pointer ${
                    currentPage === m.id ? 'text-emerald-400 font-bold' : 'text-slate-300 hover:text-emerald-400'
                  }`}
                >
                  {m.label}
                </button>
              ))}

              <div className="pt-2">
                <button 
                  onClick={() => handlePageChange('pricing')} 
                  className="block w-full py-3 text-center rounded-xl bg-emerald-500 font-bold text-slate-950 cursor-pointer border-0"
                >
                  Pre-Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Multi-Page Dynamic Route Rendering */}
            <motion.main
            
        key={currentPage}
        initial={{ opacity: 0, rotateX: 12, y: 40 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ transformPerspective: 1200 }}
                className="relative z-10 min-h-[600px]"
                
      >
 {currentPage !== 'home' && <PageHero page={currentPage} />}

        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            <section className="py-20 md:py-32 overflow-hidden relative bg-transparent">
           <Cinematic3DPortalCanvas />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                      <Globe className="w-4 h-4" />
                      <span>Next-Gen Sustainable Tech</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                      <RevealText text="Power Your Life," /><br />
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Protect the Planet.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal">
                      Meet Verde, the revolutionary solar-powered smart monitor designed to track your carbon footprint and energize your daily routine with zero guilt.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                      <button onClick={() => handlePageChange('pricing')} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/25 cursor-pointer border-0">
                        <span>Get Started Today</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <button onClick={() => handlePageChange('products')} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold transition text-center cursor-pointer">
                        Explore Products
                      </button>
                    </div>
                    <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-semibold">
                      <div className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /><span>2-Year Warranty</span></div>
                      <div className="flex items-center space-x-1.5"><Award className="w-4 h-4 text-emerald-400" /><span>Eco-Focused Design</span></div>
                      <div className="flex items-center space-x-1.5"><Lock className="w-4 h-4 text-emerald-400" /><span>Secure Checkout</span></div>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-5 flex justify-center">
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
            <section className="py-16 relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-extrabold text-white">Why Verde?</h2>
                  <p className="text-slate-400 text-sm">Everything you need to track energy and carbon, powered by light.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featureDetailsMap.map((f, i) => (
  <Reveal key={f.id} delay={i * 0.1} className="h-full">
    <button onClick={() => setSelectedFeatureModal(f)} className="h-full w-full text-left bg-slate-900/80 border border-slate-800 hover:border-emerald-500/70 p-6 rounded-2xl space-y-3 transition cursor-pointer">
      <f.icon className="w-6 h-6 text-emerald-400" />
      <h3 className="text-lg font-bold text-white">{f.title}</h3>
      <p className="text-sm text-slate-400">{f.desc}</p>
    </button>
  </Reveal>
))}
                </div>
                <div className="text-center">
                  <button onClick={() => handlePageChange('pricing')} className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold cursor-pointer border-0">See Pricing</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. ABOUT PAGE */}
        {currentPage === 'about' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase">
                  <Info className="w-4 h-4" />
                  <span>About Verde Eco</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Pioneering Sustainable Living Through Intelligent Hardware</h1>
                <p className="text-slate-400 text-base leading-relaxed">
                  At Verde Eco, our mission is to make sustainable living effortless. We build cutting-edge, self-charging eco-monitors that empower every household to track, understand, and reduce their carbon footprint without changing their daily routines.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl">
                  <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Cpu className="w-6 h-6 text-emerald-400" />
                    <span>Our Core Mission & Values</span>
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      <span><strong>Low-Carbon Goal:</strong> We aim to align manufacturing with global net-zero targets.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      <span><strong>Autonomous Power:</strong> Eliminating single-use batteries and frequent recharging cables.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      <span><strong>User-Centric Data:</strong> Simple, intuitive iOS & Android app synchronization.</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl text-center space-y-2">
                    <p className="text-4xl font-extrabold text-emerald-400"><CountUp to={100} suffix="%" /></p>
                    <p className="text-sm text-slate-300">Recycled Materials</p>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl text-center space-y-2">
                    <p className="text-4xl font-extrabold text-emerald-400">IP67</p>
                    <p className="text-sm text-slate-300">Water & Dust Rating</p>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl text-center space-y-2">
                    <p className="text-4xl font-extrabold text-emerald-400"><CountUp to={2} suffix=" Years" /></p>
                    <p className="text-sm text-slate-300">Full Warranty</p>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl text-center space-y-2">
                    <p className="text-4xl font-extrabold text-emerald-400">24/7</p>
                    <p className="text-sm text-slate-300">Cloud Sync</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. PRODUCTS PAGE */}
        {currentPage === 'products' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Our Offerings</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Engineered Eco-Products</h1>
                <p className="text-slate-400 text-base">Discover our flagship devices designed to seamlessly integrate sustainability into your home.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <BatteryCharging className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Verde Eco-Monitor Standard</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      The foundational home energy tracker equipped with transparent solar films and Bluetooth 5.3 telemetry.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 pt-2">
                      <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Indoor & Outdoor Light Harvesting</span></li>
                      <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Basic iOS/Android Telemetry Sync</span></li>
                    </ul>
                  </div>
                  <button onClick={() => handleInquireClick('starter')} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center transition cursor-pointer border-0">
                    Inquire & Buy Standard ({getPriceFormatted(rawPrices.starter)})
                  </button>
                </div>

                <div className="bg-slate-900/90 border border-emerald-500/50 p-8 rounded-3xl space-y-6 shadow-2xl flex flex-col justify-between relative">
                  <div className="absolute -top-3.5 right-8 bg-emerald-500 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full">
                    Flagship
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Zap className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Verde Pro + Solar Hub</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Comprehensive whole-home monitoring system with advanced analytics, API access, and extended warranty.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 pt-2">
                      <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Advanced Carbon Analytics & API</span></li>
                      <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>2-Year Comprehensive Warranty</span></li>
                    </ul>
                  </div>
                  <button onClick={() => handleInquireClick('pro')} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center transition shadow-lg shadow-emerald-500/20 cursor-pointer border-0">
                    Inquire & Buy Pro ({getPriceFormatted(rawPrices.pro)})
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. FEATURES PAGE */}
        {currentPage === 'features' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Engineered for Excellence</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Packed with Sustainable Innovation</h1>
                <p className="text-slate-400 text-base">Click any feature box below to explore complete technical highlights.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featureDetailsMap.map((feature) => (
                  <Tilt key={feature.id} perspective={800} scale={1.03} className="h-full">
                    <div 
                      onClick={() => setSelectedFeatureModal(feature)}
                      className="h-full bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-emerald-500/80 p-8 rounded-2xl space-y-4 shadow-xl cursor-pointer transition-all duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                          <span>{feature.title}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                      </div>
                      <div className="pt-2 text-xs font-semibold text-emerald-400 group-hover:underline flex items-center space-x-1">
                        <span>Learn More Spec</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Tilt>
                ))}
              </div>

              {/* Comparison Matrix Table */}
              <div className="pt-12">
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Feature Comparison Matrix</h3>
                  <p className="text-slate-400 text-sm">See how Verde outperforms traditional energy monitoring solutions.</p>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/80 text-xs uppercase font-bold text-slate-400">
                          <th className="p-5">Capability / Spec</th>
                          <th className="p-5 text-emerald-400 bg-emerald-500/10">Verde Pro Hub</th>
                          <th className="p-5">Verde Standard</th>
                          <th className="p-5">Traditional Monitors</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-sm">
                        {[
                          { feature: "Power Source", pro: "Infinite Transparent Solar", std: "Solar + 120h Backup", trad: "Requires Wall Plug / Batteries" },
                          { feature: "Water & Dust Rating", pro: "IP67 Heavy Duty", std: "IP67 Certified", trad: "Not Waterproof" },
                          { feature: "Telemetry Sync", pro: "Bluetooth 5.3 + Wi-Fi Cloud", std: "Bluetooth 5.3 LE", trad: "Manual USB Readout" },
                          { feature: "Carbon Analytics", pro: "Advanced AI API Access", std: "Standard Dashboard", trad: "None" },
                          { feature: "Warranty", pro: "2 Years Replacement", std: "1 Year Warranty", trad: "6 Months Limited" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                            <td className="p-5 font-semibold text-white">{row.feature}</td>
                            <td className="p-5 text-emerald-400 font-bold bg-emerald-500/5">{row.pro}</td>
                            <td className="p-5 text-slate-300">{row.std}</td>
                            <td className="p-5 text-slate-400">{row.trad}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. CALCULATOR PAGE */}
        {currentPage === 'calculator' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Interactive Tool</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Live Carbon & Savings Calculator</h1>
                <p className="text-slate-400 text-base">Adjust your average monthly electricity bill to estimate your potential savings with Verde.</p>
              </div>

              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold uppercase text-slate-300 flex items-center space-x-2">
                      <Calculator className="w-5 h-5 text-emerald-400" />
                      <span>Average Monthly Electricity Bill ({curr.symbol})</span>
                    </label>
                    <span className="text-2xl font-extrabold text-emerald-400">{curr.symbol}{Math.round(monthlyBill * curr.rate)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    step="10"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-semibold">
                    <span>{curr.symbol}{Math.round(50 * curr.rate)} / mo</span>
                    <span>{curr.symbol}{Math.round(250 * curr.rate)} / mo</span>
                    <span>{curr.symbol}{Math.round(500 * curr.rate)} / mo</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                    <p className="text-xs uppercase font-bold text-slate-400">Estimated Annual Savings</p>
                    <p className="text-4xl font-black text-emerald-400">{curr.symbol}{Math.round(calculatedSavings * 12 * curr.rate)}</p>
                    <p className="text-xs text-slate-400">Saved on your energy bills per year (illustrative estimate)</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                    <p className="text-xs uppercase font-bold text-slate-400">Est. Annual Carbon Offset</p>
                    <p className="text-4xl font-black text-emerald-400">{calculatedCarbonOffset} kg</p>
                    <p className="text-xs text-slate-400">≈ {Math.max(1, Math.round(calculatedCarbonOffset / 21))} mature trees absorbing CO₂ for a year</p>
                  </div>
                </div>

                {/* 5-Year Cumulative ROI Bar Graph */}
                <div className="pt-6 border-t border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>5-Year Cumulative Savings Projection</span>
                  </h4>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-3 pt-2 items-end h-40 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    {[1, 2, 3, 4, 5].map((year) => {
                      const totalYrSavings = Math.round(calculatedSavings * 12 * year * curr.rate);
                      const maxPossible = Math.round(500 * 0.35 * 12 * 5 * curr.rate);
                      const heightPercent = Math.max(20, Math.min(100, (totalYrSavings / maxPossible) * 100));
                      return (
                        <div key={year} className="flex flex-col items-center justify-end h-full space-y-2">
                          <span className="text-[10px] font-bold text-emerald-400">{curr.symbol}{totalYrSavings}</span>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ duration: 0.5 }}
                            className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-lg shadow-lg shadow-emerald-500/20"
                          />
                          <span className="text-[11px] text-slate-400 font-semibold">Yr {year}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. GALLERY PAGE */}
        {currentPage === 'gallery' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Real World Setup</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Where Verde Fits In</h1>
                <p className="text-slate-400 text-base">Ideas for placing Verde in your living room, office, or solar workstation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Living Room Desk Setup", desc: "Monitors real-time solar harvest effortlessly.", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" },
                  { title: "Balcony Solar Harvesting", desc: "Direct sunlight absorption mode activated.", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80" },
                  { title: "Modern Tech Workspace", desc: "Sleek aerospace aluminum finish in action.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" }
                ].map((item, idx) => (
                  <div key={idx} className="h-72 rounded-3xl border border-slate-800 relative overflow-hidden group shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                    <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                    <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full text-xs font-bold text-emerald-400 flex items-center space-x-1.5 shadow-lg">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Concept Image</span>
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white drop-shadow-md">{item.title}</h3>
                        <p className="text-xs text-slate-300">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. REVIEWS PAGE */}
        {currentPage === 'reviews' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Early Feedback</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">What Our Community Says</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Sarah Jenkins", role: "Environmental Designer", text: "Verde completely changed how I monitor my household energy usage. The design is sleek and minimalist!" },
                  { name: "Marcus Chen", role: "Tech Reviewer", text: "Unbelievable battery life powered purely by ambient room light. A must-have gadget for any eco-conscious household." },
                  { name: "Elena Rostova", role: "Sustainability Lead", text: "The app integration is flawless and seeing my real-time carbon offset is surprisingly motivating." }
                ].map((review, idx) => (
                  <Tilt key={idx} perspective={800} scale={1.02} className="h-full">
                    <div className="h-full bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl space-y-4 flex flex-col justify-between shadow-xl">
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
                        <p className="text-xs text-slate-400">{review.role}</p>
                      </div>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. PRICING PAGE */}
        {currentPage === 'pricing' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Flexible Options</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Simple, Transparent Pricing</h1>
                <p className="text-slate-400 text-base">Choose the perfect plan to start your sustainable journey today.</p>
                
                   <p className="text-sm text-emerald-400 font-semibold pt-2">Free eco-friendly shipping on every order</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Tilt perspective={1000} scale={1.02} className="h-full">
                  <div 
                    onClick={() => handleInquireClick('starter')}
                    className={`h-full bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 space-y-6 flex flex-col justify-between transition-all duration-300 cursor-pointer relative z-10 ${
                      selectedPlan === 'starter' ? 'border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20' : 'border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white">Starter Eco</h3>
                          <p className="text-sm text-slate-400 mt-1">Perfect for individuals beginning their green journey.</p>
                        </div>
                        {selectedPlan === 'starter' && (
                          <span className="bg-emerald-500 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full">Selected</span>
                        )}
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-extrabold text-white">{getPriceFormatted(rawPrices.starter)}</span>
                        <span className="text-sm text-slate-400">/ device</span>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>Verde Standard Device</span></li>
                        <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>Basic App Telemetry Sync</span></li>
                        <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400" /><span>1-Year Hardware Warranty</span></li>
                      </ul>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleInquireClick('starter'); }}
                      className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition cursor-pointer border-0"
                    >
                      Choose Starter ({getPriceFormatted(rawPrices.starter)})
                    </button>
                  </div>
                </Tilt>

                <Tilt perspective={1000} scale={1.02} className="h-full">
                  <div 
                    onClick={() => handleInquireClick('pro')}
                    className={`h-full bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 space-y-6 flex flex-col justify-between relative transition-all duration-300 cursor-pointer z-10 ${
                      selectedPlan === 'pro' ? 'border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20' : 'border border-slate-800 hover:border-slate-700'
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
                        <span className="text-4xl font-extrabold text-white">{getPriceFormatted(rawPrices.pro)}</span>
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
                      onClick={(e) => { e.stopPropagation(); handleInquireClick('pro'); }}
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition cursor-pointer shadow-lg shadow-emerald-500/20 border-0"
                    >
                      Choose Pro ({getPriceFormatted(rawPrices.pro)})
                    </button>
                  </div>
                </Tilt>
              </div>
            </div>
          </section>
        )}

        {/* 9. FAQ PAGE */}
        {currentPage === 'faq' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Got Questions?</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Frequently Asked Questions</h1>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-colors shadow-xl"
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}
                      className="w-full px-6 py-5 text-left font-semibold text-white flex justify-between items-center focus:outline-none cursor-pointer bg-transparent border-0"
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
        )}

        {/* 10. CONTACT PAGE */}
        {currentPage === 'contact' && (
          <section className="py-20 relative overflow-hidden">
            <Cinematic3DPortalCanvas />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Get In Touch</h2>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Product Inquiry & Support</h1>
                <p className="text-slate-400 text-base">Have questions about Verde or need assistance with an order? Send us a message below.</p>
              </div>

              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
                {formStatus.success ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Inquiry Sent Successfully!</h3>
                    <p className="text-slate-400 max-w-md mx-auto">Thank you for reaching out to Verde Eco. Our support and sales team will review your inquiry and get back to your inbox shortly.</p>
                    <button 
                      onClick={() => setFormStatus({ submitting: false, success: false, error: '' })} 
                      className="px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl mt-4 cursor-pointer hover:bg-emerald-400 transition border-0"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {formStatus.error && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        {formStatus.error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-300">Full Name *</label>
                        <input 
                          type="text" 
                          required
                         aria-label="Full name" placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-300">Email Address *</label>
                        <input 
                          type="email" 
                          required
                         aria-label="Email address" placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-300">Product of Interest</label>
                        <div className="relative">
                          <select 
                            aria-label="Product of interest" value={formData.productInterest}
                            onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-emerald-500 text-sm transition cursor-pointer appearance-none"
                          >
                            <option value="Verde Eco-Monitor Standard">Verde Eco-Monitor Standard ({getPriceFormatted(rawPrices.starter)})</option>
                            <option value="Verde Pro + Solar Hub">Verde Pro + Solar Hub ({getPriceFormatted(rawPrices.pro)})</option>
                            <option value="General Inquiry">General Partnership / Inquiry</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-emerald-400 absolute right-4 top-3.5 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-300">Subject</label>
                        <input 
                          type="text" 
                          aria-label="Subject" placeholder="Order query or feedback"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-300">Message *</label>
                      <textarea 
                        rows={4}
                        required
                     aria-label="Message" placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus.submitting}
                      className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50 border-0"
                    >
                      {formStatus.submitting ? (
                        <span>Sending Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
           <PolicyPage page={currentPage} />
<PageExtra page={currentPage} onCta={handlePageChange} />
            </motion.main>

      {/* Product Preview Modal */}
      <AnimatePresence>
        {productPreviewModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" data-lenis-prevent>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-8">
              <button onClick={() => setProductPreviewModal(null)} aria-label="Close" className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition cursor-pointer border-0">
                <X className="w-5 h-5" />
              </button>
              <div className={`relative h-60 w-full bg-gradient-to-br ${productPreviewModal.bgGradient} flex items-center justify-center p-8 border-b border-slate-800 overflow-hidden`}>
                <div className="absolute inset-0 bg-tech-grid opacity-30"></div>
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/10 animate-pulse">
                    <productPreviewModal.icon className="w-10 h-10" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    {productPreviewModal.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-wide">{productPreviewModal.title}</h3>
                  <p className="text-xs text-slate-300 font-medium">{productPreviewModal.tagline}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Technical Specifications</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {productPreviewModal.specs.map((spec, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                        <p className="text-[11px] font-bold text-slate-400 uppercase">{spec.label}</p>
                        <p className="text-xs font-semibold text-white mt-0.5">{spec.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center space-x-1.5">
                    <PackageCheck className="w-4 h-4" />
                    <span>Included inside the Package</span>
                  </h4>
                  <ul className="space-y-2">
                    {productPreviewModal.boxItems.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Price</span>
                    <span className="text-2xl font-extrabold text-white">{getPriceFormatted(productPreviewModal.basePrice)}</span>
                  </div>
                  <button onClick={handleProceedToCheckout} className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center space-x-2 border-0">
                    <span>Proceed to Secure Demo Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeatureModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" data-lenis-prevent>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-8">
              <button onClick={() => setSelectedFeatureModal(null)} aria-label="Close" className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition cursor-pointer border-0">
                <X className="w-5 h-5" />
              </button>
              <div className={`relative h-56 w-full bg-gradient-to-br ${selectedFeatureModal.bgGradient} flex items-center justify-center p-8 border-b border-slate-800 overflow-hidden`}>
                <div className="absolute inset-0 bg-tech-grid opacity-30"></div>
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/10 animate-pulse">
                    <selectedFeatureModal.accentIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-wide">{selectedFeatureModal.title}</h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{selectedFeatureModal.desc}</p>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Technical Highlights & Innovations</h4>
                  <ul className="space-y-2.5">
                    {selectedFeatureModal.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button onClick={() => setSelectedFeatureModal(null)} className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-emerald-500/20 border-0">
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safe Demo Checkout Modal (Requirement 9: Demo Only, No Real Financial Exposure) */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" data-lenis-prevent>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
              <button onClick={() => setCheckoutModalOpen(false)} aria-label="Close" className="absolute top-6 right-6 text-slate-400 hover:text-white transition cursor-pointer border-0 bg-transparent">
                <X className="w-6 h-6" />
              </button>

              {orderSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Demo Order Placed Successfully!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Thank you for testing the <strong className="text-white">{activePlan.title}</strong> plan ({getPriceFormatted(activePlan.price)}). This is a secure demo environment; no real credit card charges were made.
                  </p>
                  <div className="pt-4">
                    <button onClick={() => setCheckoutModalOpen(false)} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition cursor-pointer border-0">
                      Back to Website
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Secure Demo Checkout</h3>
                      <p className="text-xs text-slate-400">Selected Plan: <span className="text-emerald-400 font-semibold">{activePlan.title} ({getPriceFormatted(activePlan.price)})</span></p>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl mb-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{activePlan.title}</span>
                      <span className="text-white font-bold">{getPriceFormatted(activePlan.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Eco-Friendly Shipping</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <div className="border-t border-slate-800/80 pt-2 flex justify-between text-base font-bold text-white">
                      <span>Total (Demo)</span>
                      <span className="text-emerald-400">{getPriceFormatted(activePlan.price)}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-slate-300">Name *</label>
                        <input type="text" required placeholder="Alex Mercer" value={paymentDetails.name} onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-slate-300">Email *</label>
                        <input type="email" required placeholder="alex@example.com" value={paymentDetails.email} onChange={(e) => setPaymentDetails({ ...paymentDetails, email: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="text-xs font-bold uppercase text-slate-300 block mb-2">Payment Option</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['card', 'gpay', 'cod'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`py-2 px-2 text-xs font-bold uppercase rounded-xl border transition cursor-pointer ${
                              paymentMethod === method ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            {method === 'card' ? 'Credit Card' : method === 'gpay' ? 'Google Pay' : 'Cash on Delivery'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-3 pt-1">
                        <div>
                          <label className="text-xs text-slate-400">Card Number (Demo)</label>
                          <div className="relative mt-1">
                            <input type="text" required placeholder="4242 4242 4242 4242" className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500" />
                            <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-400">Expiry Date</label>
                            <input type="text" required placeholder="MM/YY" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">CVV</label>
                            <input type="password" required placeholder="123" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1" />
                          </div>
                        </div>
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={checkoutLoading}
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50 mt-4 border-0"
                    >
                      {checkoutLoading ? (
                        <span>Processing Secure Demo...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay {getPriceFormatted(activePlan.price)} (Demo Mode)</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consistent Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 relative z-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">Verde<span className="text-emerald-400">.</span></span>
          </div>
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Verde Eco Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <button onClick={() => handlePageChange('about')} className="hover:text-emerald-400 transition bg-transparent border-0 cursor-pointer">About</button>
            <button onClick={() => handlePageChange('products')} className="hover:text-emerald-400 transition bg-transparent border-0 cursor-pointer">Products</button>
            <button onClick={() => handlePageChange('contact')} className="hover:text-emerald-400 transition bg-transparent border-0 cursor-pointer">Contact</button>
                        <button onClick={() => handlePageChange('privacy')} className="hover:text-emerald-400 transition bg-transparent border-0 cursor-pointer">Privacy</button>
            <button onClick={() => handlePageChange('terms')} className="hover:text-emerald-400 transition bg-transparent border-0 cursor-pointer">Terms</button>
            <button onClick={() => handlePageChange('refund')} className="hover:text-emerald-400 transition bg-transparent border-0 cursor-pointer">Refunds</button>
          </div>
        </div>
      </footer>

    </div>
  );
}