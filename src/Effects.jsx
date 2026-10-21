import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, animate } from 'motion/react';
import { Leaf } from 'lucide-react';

// 1. Loading screen (1.8 sec)
export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
            className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400"
          >
            <Leaf className="w-10 h-10" />
          </motion.div>
          <p className="text-white font-bold text-xl tracking-widest">VERDE<span className="text-emerald-400">.</span></p>
          <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.6 }} className="h-full bg-emerald-400" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 2. Scroll progress bar (top par hari line)
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-300 z-[90]"
    />
  );
}

// 3. Cursor glow (mouse ke peeche hara glow)
export function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[5] hidden md:block"
      style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)', transition: 'transform 0.15s ease-out' }}
    />
  );
}

// 4. Count-up number (0 se ginti)
export function CountUp({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// 5. Text reveal (shabd ek-ek karke upar aate hain)
export function RevealText({ text, className = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// 6. Scroll par fade-up (cards ke liye)
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}