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

  // Multi-Currency State
  const [currency, setCurrency] = useState('USD');
  const currencyRates = { USD: { symbol: '$', rate: 1 }, EUR: { symbol: '€', rate: 0.92 }, GBP: { symbol: '£', rate: 0.79 }, INR: { symbol: '₹', rate: 83 } };
  const curr = currencyRates[currency];

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 35, seconds: 20 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 35, seconds: 20 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Feature Detail Modal State
  const [selectedFeatureModal, setSelectedFeatureModal] = useState(null);

  // Product Preview Modal State (Step 1)
  const [productPreviewModal, setProductPreviewModal] = useState(null);

  // Carbon Savings Calculator State
  const [monthlyBill, setMonthlyBill] = useState(150);
  const calculatedSavings = Math.round(monthlyBill * 0.35);
  const calculatedCarbonOffset = Math.round(monthlyBill * 1.8);

  // Feature 2: Real-time Social Proof Toast Notification State
  const [socialToast, setSocialToast] = useState(null);
  const socialProofList = [
    { name: "Rahul Sharma", city: "Mumbai", product: "Verde Pro + Solar Hub", time: "2 mins ago" },
    { name: "Jessica Miller", city: "London", product: "Verde Eco-Monitor Standard", time: "5 mins ago" },
    { name: "Amit Patel", city: "Ahmedabad", product: "Verde Pro + Solar Hub", time: "12 mins ago" },
    { name: "Lucas Moreau", city: "Paris", product: "Verde Eco-Monitor Standard", time: "18 mins ago" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomItem = socialProofList[Math.floor(Math.random() * socialProofList.length)];
      setSocialToast(randomItem);
      setTimeout(() => setSocialToast(null), 5000);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  // Feature 3: AI Eco-Chatbot Widget State
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
        botReply = "Our Standard monitor starts at $99 and the Pro Solar Hub is $159 with annual discount!";
      } else if (lower.includes('shipping') || lower.includes('deliver')) {
        botReply = "We offer free eco-friendly worldwide shipping on all orders with 2-year warranty.";
      } else if (lower.includes('water') || lower.includes('durable')) {
        botReply = "Yes, Verde is IP67 certified water and dustproof.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 800);
  };

  // Payment Checkout Modal State (Step 2)
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: ''
  });

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    productInterest: 'Verde Eco-Monitor Standard',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: '' });

  const featuresRef = useRef(null);
  const reviewsRef = useRef(null);
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

  const rawPrices = {
    starter: isAnnual ? 99 : 129,
    pro: isAnnual ? 159 : 199
  };

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

  const handleInquireClick = (planKey) => {
    setSelectedPlan(planKey);
    setProductPreviewModal(productDetailsMap[planKey]);
  };

  const handleProceedToCheckout = () => {
    setProductPreviewModal(null);
    setOrderSuccess(false);
    setCheckoutModalOpen(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handlePaymentSubmit = async (e) => {
  e.preventDefault();
  setCheckoutLoading(true);

  try {
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: activePlan.price, 
        currency: currency 
      })
    });
    
    const data = await response.json();
    
    if (data.clientSecret) {
      setCheckoutLoading(false);
      setOrderSuccess(true);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    } else {
      throw new Error(data.error || 'Payment failed');
    }
  } catch (err) {
    setCheckoutLoading(false);
    alert('Payment processing error: ' + err.message);
  }
};

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setFormStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setFormStatus({ submitting: true, success: false, error: '' });

    setTimeout(() => {
      setFormStatus({ submitting: false, success: true, error: '' });
      setFormData({ fullName: '', email: '', productInterest: 'Verde Eco-Monitor Standard', subject: '', message: '' });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    }, 1200);
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

  const planDetails = {
    starter: {
      title: 'Starter Eco',
      price: rawPrices.starter,
      features: ['Verde Standard Device', 'Basic App Telemetry Sync', '1-Year Hardware Warranty']
    },
    pro: {
      title: 'Pro Sustainable',
      price: rawPrices.pro,
      features: ['Verde Pro Device + Solar Hub', 'Advanced Analytics & API Access', '2-Year Comprehensive Warranty', 'Priority Customer Support']
    }
  };

  const activePlan = planDetails[selectedPlan];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">

      {/* Feature 2: Real-time Social Proof Toast Notification Popup */}
      <AnimatePresence>
        {socialToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 p-4 rounded-2xl shadow-2xl flex items-center space-x-3.5 max-w-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-0.5">
              <p className="text-white font-bold">{socialToast.name} from {socialToast.city}</p>
              <p className="text-slate-300">Just pre-ordered <span className="text-emerald-400 font-semibold">{socialToast.product}</span></p>
              <p className="text-[10px] text-slate-500">{socialToast.time} • Verified Order</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature 3: Floating AI Eco-Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-80 sm:w-96 rounded-3xl shadow-2xl overflow-hidden mb-4 flex flex-col h-[420px]"
            >
              <div className="bg-emerald-600 p-4 text-slate-950 font-bold flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Verde AI Assistant</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-slate-950 hover:opacity-70 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-950/60">
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
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Top Urgent Limited Offer Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-slate-950 px-4 py-2 text-xs font-bold text-center flex flex-wrap items-center justify-center gap-3 relative z-40 shadow-md">
        <div className="flex items-center space-x-1.5">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>⚡ Early Bird Pre-Order Discount Ends In:</span>
        </div>
        <div className="bg-slate-950 text-emerald-400 px-2.5 py-1 rounded-lg font-mono text-xs shadow-inner">
          {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </div>
        <span className="hidden sm:inline opacity-80">| Save 20% on Annual Plans</span>
      </div>

      {/* Background Tech Grid & Scanline Animation Layer */}
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

      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-8 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2 cursor-pointer group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors group-hover:border-emerald-400"
            >
              <Leaf className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-white">Verde<span className="text-emerald-400">.</span></span>
          </a>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            {['About', 'Products', 'Features', 'Calculator', 'Gallery', 'Reviews', 'Pricing', 'FAQ', 'Contact'].map((item) => (
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
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>

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
            className="md:hidden text-slate-300 hover:text-white focus:outline-none cursor-pointer"
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
              className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase text-slate-400">Select Currency</span>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">About Us</a>
              <a href="#products" onClick={(e) => handleNavClick(e, '#products')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Products</a>
              <a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Features</a>
              <a href="#calculator" onClick={(e) => handleNavClick(e, '#calculator')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Carbon Calculator</a>
              <a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Customer Gallery</a>
              <a href="#reviews" onClick={(e) => handleNavClick(e, '#reviews')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Reviews</a>
              <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Pricing</a>
              <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">FAQ</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block text-base font-medium text-slate-300 hover:text-emerald-400">Contact Us</a>
              <div className="pt-2">
                <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="block w-full py-3 text-center rounded-xl bg-emerald-500 font-semibold text-slate-950">
                  Pre-Order Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Home / Hero Section */}
      <section className="pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden relative bg-transparent">
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
                <a href="#products" onClick={(e) => handleNavClick(e, '#products')} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold transition text-center">
                  Explore Products
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-semibold">
                <div className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /><span>2-Year Warranty</span></div>
                <div className="flex items-center space-x-1.5"><Award className="w-4 h-4 text-emerald-400" /><span>Eco-Certified Tech</span></div>
                <div className="flex items-center space-x-1.5"><Lock className="w-4 h-4 text-emerald-400" /><span>100% Secure Checkout</span></div>
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

      {/* About Us Section */}
      <section id="about" className="py-24 bg-slate-900/40 border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase">
                <Info className="w-4 h-4" />
                <span>About Verde Eco</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Pioneering Sustainable Living Through Intelligent Hardware</h2>
              <p className="text-slate-400 text-base leading-relaxed">
                At Verde Eco, our mission is to make sustainable living effortless. We build cutting-edge, self-charging eco-monitors that empower every household to track, understand, and reduce their carbon footprint without changing their daily routines.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                  <p className="text-3xl font-bold text-emerald-400">100%</p>
                  <p className="text-sm text-slate-300 mt-1">Recycled Materials</p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                  <p className="text-3xl font-bold text-emerald-400">IP67</p>
                  <p className="text-sm text-slate-300 mt-1">Water & Dust Rating</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Cpu className="w-6 h-6 text-emerald-400" />
                <span>Our Core Values</span>
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Zero Carbon Footprint:</strong> Manufacturing processes aligned with global net-zero targets.</span>
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
          </div>
        </div>
      </section>

      {/* How It Works Section (Step-by-Step Process) */}
      <section className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Seamless Operation</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">How Verde Works in 3 Simple Steps</p>
            <p className="text-slate-400 text-base">Designed for plug-and-play simplicity with autonomous self-charging power.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Harvest Light", desc: "Transparent solar films capture indoor room lighting and outdoor sunlight continuously without cables." },
              { step: "02", title: "Track Telemetry", desc: "Low-power microchips monitor your household energy and carbon metrics in real time with zero lag." },
              { step: "03", title: "Sync & Save", desc: "Connects via Bluetooth 5.3 to iOS & Android apps to view savings, carbon offset, and instant alerts." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                <span className="text-6xl font-black text-emerald-500/10 absolute top-4 right-4 group-hover:text-emerald-500/20 transition-colors">{item.step}</span>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products / Services Section */}
      <section id="products" className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Our Offerings</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Engineered Eco-Products</p>
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
              <button onClick={() => handleInquireClick('starter')} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center transition cursor-pointer">
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
              <button onClick={() => handleInquireClick('pro')} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center transition shadow-lg shadow-emerald-500/20 cursor-pointer">
                Inquire & Buy Pro ({getPriceFormatted(rawPrices.pro)})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Comparison Matrix Table Section */}
      <section className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Why Choose Verde</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Feature Comparison Matrix</p>
            <p className="text-slate-400 text-base">See how Verde outperforms traditional energy monitoring solutions.</p>
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
                      <td className="p-5 text-slate-500">{row.trad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Product Interactive Overview Modal (Step 1 Before Payment) */}
      <AnimatePresence>
        {productPreviewModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-8"
            >
              <button 
                onClick={() => setProductPreviewModal(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Graphic Banner */}
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
                {/* Specifications Grid */}
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

                {/* Included in Box */}
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

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Price</span>
                    <span className="text-2xl font-extrabold text-white">{getPriceFormatted(productPreviewModal.basePrice)}</span>
                  </div>
                  <button 
                    onClick={handleProceedToCheckout}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                  >
                    <span>Proceed to Secure Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Features Section with Clickable Feature Info Modals */}
      <section id="features" ref={featuresRef} className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Engineered for Excellence</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Packed with Sustainable Innovation</p>
            <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold">(Click any feature box below to explore details)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureDetailsMap.map((feature) => (
              <Tilt key={feature.id} perspective={800} scale={1.03} className="h-full">
                <div 
                  onClick={() => setSelectedFeatureModal(feature)}
                  className="gsap-feature-card h-full bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-emerald-500/80 p-8 rounded-2xl space-y-4 shadow-xl cursor-pointer transition-all duration-300 group hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
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
        </div>
      </section>

      {/* Feature Detail Interactive Modal with Fixed Fallback Graphic Layer */}
      <AnimatePresence>
        {selectedFeatureModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-8"
            >
              <button 
                onClick={() => setSelectedFeatureModal(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Graphic Header Container */}
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
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedFeatureModal.desc}
                </p>

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
                  <button 
                    onClick={() => setSelectedFeatureModal(null)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    Close Feature Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature 1: Live Carbon Savings Calculator Section + Visual Growth Bar Chart */}
      <section id="calculator" className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Interactive Tool</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Live Carbon & Savings Calculator</p>
            <p className="text-slate-400 text-base">Adjust your average monthly electricity bill to estimate your potential savings with Verde.</p>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative z-10">
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
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>{curr.symbol}{Math.round(50 * curr.rate)} / mo</span>
                <span>{curr.symbol}{Math.round(250 * curr.rate)} / mo</span>
                <span>{curr.symbol}{Math.round(500 * curr.rate)} / mo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                <p className="text-xs uppercase font-bold text-slate-400">Estimated Annual Savings</p>
                <p className="text-4xl font-black text-emerald-400">{curr.symbol}{Math.round(calculatedSavings * 12 * curr.rate)}</p>
                <p className="text-xs text-slate-500">Saved on your energy bills per year</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                <p className="text-xs uppercase font-bold text-slate-400">Annual Carbon Offset</p>
                <p className="text-4xl font-black text-emerald-400">{calculatedCarbonOffset} kg</p>
                <p className="text-xs text-slate-500">Equivalent to planting 15 trees</p>
              </div>
            </div>

            {/* Visual 5-Year Cumulative ROI Bar Graph */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>5-Year Cumulative Savings Projection</span>
              </h4>
              <div className="grid grid-cols-5 gap-3 pt-2 items-end h-40 bg-slate-950 p-4 rounded-2xl border border-slate-800">
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

      {/* Customer Unboxing & Photo Gallery Section */}
      <section id="gallery" className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Real World Setup</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Customer Unboxing & Home Gallery</p>
            <p className="text-slate-400 text-base">See how our community places Verde in their living rooms, offices, and solar workstations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Living Room Desk Setup", 
                desc: "Monitors real-time solar harvest effortlessly.", 
                img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" 
              },
              { 
                title: "Balcony Solar Harvesting", 
                desc: "Direct sunlight absorption mode activated.", 
                img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80" 
              },
              { 
                title: "Modern Tech Workspace", 
                desc: "Sleek aerospace aluminum finish in action.", 
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
              }
            ].map((item, idx) => (
              <div key={idx} className="h-72 rounded-3xl border border-slate-800 relative overflow-hidden group shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-full text-xs font-bold text-emerald-400 flex items-center space-x-1.5 shadow-lg">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Verified Photo</span>
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

      {/* Customer Reviews Section */}
      <section id="reviews" ref={reviewsRef} className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
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

      {/* Pricing Section with Interactive Drawer / Checkout Trigger */}
      <section id="pricing" className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
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
                onClick={() => handleInquireClick('starter')}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInquireClick('starter');
                  }}
                  className={`w-full py-3.5 rounded-xl font-semibold transition cursor-pointer ${
                    selectedPlan === 'starter'
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  Choose Starter ({getPriceFormatted(rawPrices.starter)})
                </button>
              </div>
            </Tilt>

            <Tilt perspective={1000} scale={1.02} className="h-full">
              <div 
                onClick={() => handleInquireClick('pro')}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInquireClick('pro');
                  }}
                  className={`w-full py-3.5 rounded-xl font-semibold transition cursor-pointer ${
                    selectedPlan === 'pro'
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  Choose Pro ({getPriceFormatted(rawPrices.pro)})
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
          <div className="text-center space-y-4 mb-16">
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

      {/* Contact Us & Inquiry Form Section */}
      <section id="contact" className="py-24 bg-transparent border-t border-slate-900 relative overflow-hidden">
        <Cinematic3DPortalCanvas />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Get In Touch</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Product Inquiry & Support</p>
            <p className="text-slate-400 text-base">Have questions about Verde or need assistance with an order? Send us a message below.</p>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative z-10">
            {formStatus.success ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Sent Successfully!</h3>
                <p className="text-slate-400 max-w-md mx-auto">Thank you for reaching out to Verde Eco. Our support and sales team will review your inquiry and get back to your inbox shortly.</p>
                <button 
                  onClick={() => setFormStatus({ submitting: false, success: false, error: '' })} 
                  className="px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl mt-4 cursor-pointer hover:bg-emerald-400 transition"
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
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-300">Product of Interest</label>
                    <select 
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition cursor-pointer"
                    >
                      <option value="Verde Eco-Monitor Standard">Verde Eco-Monitor Standard ($99)</option>
                      <option value="Verde Pro + Solar Hub">Verde Pro + Solar Hub ($159)</option>
                      <option value="General Inquiry">General Partnership / Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-300">Subject</label>
                    <input 
                      type="text" 
                      placeholder="Order query or feedback"
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
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm transition resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formStatus.submitting}
                  className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
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

      {/* Interactive Payment & Order Checkout Modal (Step 2) */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8"
            >
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {orderSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Order Placed Successfully!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Thank you for ordering the <strong className="text-white">{activePlan.title}</strong> plan ({getPriceFormatted(activePlan.price)}). We have sent a confirmation email with tracking information.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => setCheckoutModalOpen(false)}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition cursor-pointer"
                    >
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
                      <h3 className="text-xl font-bold text-white">Complete Your Order</h3>
                      <p className="text-xs text-slate-400">Selected Plan: <span className="text-emerald-400 font-semibold">{activePlan.title} ({getPriceFormatted(activePlan.price)})</span></p>
                    </div>
                  </div>

                  {/* Order Summary Box */}
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
                      <span>Total</span>
                      <span className="text-emerald-400">{getPriceFormatted(activePlan.price)}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-slate-300">Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Alex Mercer"
                          value={paymentDetails.name}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-slate-300">Email *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="alex@example.com"
                          value={paymentDetails.email}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1"
                        />
                      </div>
                    </div>

                    {/* Payment Method Tabs with Real Branded Logos */}
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-300 block mb-2">Payment Option</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { 
                            id: 'card', 
                            label: 'Card', 
                            logo: (
                              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            ) 
                          },
                          { 
                            id: 'gpay', 
                            label: 'GPay', 
                            logo: (
                              <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"/>
                                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.5-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.87 0 11.76s.43 3.63 1.18 5.15l4.09-2.67z"/>
                                <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                              </svg>
                            ) 
                          },
                          { 
                            id: 'upi', 
                            label: 'Paytm / UPI', 
                            logo: (
                              <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            ) 
                          },
                          { 
                            id: 'cod', 
                            label: 'Cash', 
                            logo: (
                              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            ) 
                          }
                        ].map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id)}
                            className={`py-2 px-1 text-[11px] font-bold uppercase rounded-xl border transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                              paymentMethod === method.id 
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="h-6 flex items-center justify-center">{method.logo}</div>
                            <span className="truncate w-full text-center">{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-3 pt-1">
                        <div>
                          <label className="text-xs text-slate-400 flex items-center space-x-1">
                            <span>💳 Credit / Debit Card Number</span>
                          </label>
                          <div className="relative mt-1">
                            <input 
                              type="text" 
                              required 
                              placeholder="4111 2222 3333 4444" 
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                            <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-400">Expiry Date</label>
                            <input 
                              type="text" 
                              required 
                              placeholder="MM/YY" 
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">CVV</label>
                            <input 
                              type="password" 
                              required 
                              placeholder="123" 
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'gpay' && (
                      <div className="pt-1 space-y-2">
                        <label className="text-xs text-slate-400 flex items-center space-x-1.5 font-semibold text-white">
                          <span>🌐 Google Pay / GPay Connected UPI ID</span>
                        </label>
                        <input 
                          type="text" 
                          required 
                          placeholder="username@oksbi / 9876543210@okaxis" 
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                        <p className="text-[11px] text-slate-500">A secure Google Pay collect request will be sent to your connected mobile device.</p>
                      </div>
                    )}

                    {paymentMethod === 'upi' && (
                      <div className="pt-1 space-y-2">
                        <label className="text-xs text-slate-400 flex items-center space-x-1.5 font-semibold text-white">
                          <span>📱 Paytm / PhonePe / BHIM UPI ID</span>
                        </label>
                        <input 
                          type="text" 
                          required 
                          placeholder="username@paytm or @ybl" 
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="pt-2 pb-2 px-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <p className="text-xs font-bold text-white flex items-center space-x-2">
                          <span>💵 Cash on Delivery (COD)</span>
                        </p>
                        <p className="text-xs text-slate-400">Pay with cash or digital scanner upon delivery of your Verde monitor package.</p>
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={checkoutLoading}
                      className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      {checkoutLoading ? (
                        <span>Processing Order...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay {getPriceFormatted(activePlan.price)} & Complete Order</span>
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
            <a href="#about" className="hover:text-emerald-400 transition">About</a>
            <a href="#products" className="hover:text-emerald-400 transition">Products</a>
            <a href="#contact" className="hover:text-emerald-400 transition">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}