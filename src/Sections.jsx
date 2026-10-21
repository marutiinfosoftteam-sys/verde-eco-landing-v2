import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;
const IMG = {
  solar: u('1509391366360-2e959784a276'),
  roof: u('1508514177221-188b1cf16e9d'),
  tech: u('1518770660439-4636190af475'),
  desk: u('1593642632823-8f785ba67e45'),
  grid: u('1473341304170-971dccb5ac1e'),
};

const HERO = {
  about: ['About Verde', 'Making sustainable living effortless.', IMG.roof],
  products: ['Our Products', 'Two devices, one goal: smarter, cleaner energy.', IMG.tech],
  features: ['Features', 'Solar charging, instant data and rugged build.', IMG.solar],
  calculator: ['Savings Calculator', 'Estimate your yearly savings and carbon offset.', IMG.grid],
  gallery: ['Gallery', 'Ideas for where Verde fits in your space.', IMG.desk],
  reviews: ['Reviews', 'Early feedback on the Verde experience.', IMG.desk],
  pricing: ['Pricing', 'Simple pricing, free eco-friendly shipping.', IMG.solar],
  faq: ['FAQ', 'Quick answers to common questions.', IMG.tech],
  contact: ['Contact', 'Questions or orders? We are here to help.', IMG.roof],
};

const EXTRA = {
  home: [
    { title: 'Powered by light, not cables', text: 'Verde uses a transparent solar film that charges from indoor and outdoor light, so there is nothing to plug in.', bullets: ['Charges indoors and outdoors', 'Up to 120 hours without light (Standard)', 'IP67 water and dust resistant'], img: IMG.solar },
    { title: 'Your energy, always in view', text: 'Pair with the iOS or Android app over Bluetooth 5.3 and see live usage and carbon stats.', bullets: ['Real-time dashboard', 'Simple setup', 'Works with Standard and Pro'], img: IMG.desk },
  ],
  about: [
    { title: 'Our mission', text: 'We build self-charging eco-monitors so every household can understand and reduce its carbon footprint without changing daily routines.', bullets: ['No single-use batteries', 'Recycled materials focus', 'Simple app experience'], img: IMG.tech },
    { title: 'How it works', text: 'Place Verde near a window or lamp, pair it with your phone, and start tracking. The solar film keeps it powered automatically.', bullets: ['1. Place it', '2. Pair via Bluetooth', '3. Track your impact'], img: IMG.roof },
  ],
  products: [
    { title: 'Verde Eco-Monitor Standard', text: 'The essential home energy monitor with transparent solar film and Bluetooth 5.3 sync.', bullets: ['Magnetic wall mount included', '120 hours backup', '1-year warranty'], img: IMG.desk },
    { title: 'Verde Pro + Solar Hub', text: 'Whole-home analytics with a solar hub, dual-band Wi-Fi, cloud sync and developer API access.', bullets: ['Solar hub attachment', 'API access key', '2-year warranty'], img: IMG.grid },
  ],
  features: [
    { title: 'Built to last', text: 'An IP67-rated body protects Verde from dust, spills and rain, indoors or out.', bullets: ['IP67 rating', 'Recycled-material focus', 'Magnetic mounting'], img: IMG.tech },
  ],
  calculator: [
    { title: 'How we estimate', text: 'The calculator uses simple assumptions (about 35% savings) to give an illustrative figure. Your real results depend on usage and tariffs.', bullets: ['Illustrative estimate', 'Adjust your monthly bill', 'See a 5-year projection'], img: IMG.grid },
  ],
  gallery: [
    { title: 'Place it anywhere with light', text: 'Desks, balconies and window sills all work. Brighter spots charge faster.', bullets: ['Living room', 'Balcony', 'Workspace'], img: IMG.roof },
  ],
  reviews: [
    { title: 'Share your experience', text: 'Already using Verde? Tell us how it works for you and help others decide.', bullets: ['Email us your feedback', 'Share photos of your setup'], img: IMG.desk },
  ],
  pricing: [
    { title: 'Every order includes', text: 'Free eco-friendly shipping, a quick-start guide and warranty cover (1 year Standard, 2 years Pro).', bullets: ['Free shipping', 'Warranty included', 'Support by email'], img: IMG.solar },
  ],
  faq: [
    { title: 'Still have questions?', text: 'Send us a message from the Contact page and we will get back to you.', bullets: ['Product questions', 'Order support'], img: IMG.tech },
  ],
  contact: [
    { title: 'How we help', text: 'Tell us about your product interest or order. Our team replies by email.', bullets: ['Product advice', 'Order queries', 'Partnerships'], img: IMG.roof },
  ],
};

function Img({ src, alt, className }) {
  const [ok, setOk] = useState(true);
  return ok
    ? <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className={className} />
    : <div role="img" aria-label={alt} className={`${className} bg-gradient-to-br from-emerald-600/30 to-slate-900`} />;
}

export function PageHero({ page }) {
  const h = HERO[page];
  if (!h) return null;
  return (
    <div className="relative h-56 sm:h-72 overflow-hidden border-b border-slate-800">
      <Img src={h[2]} alt={h[0]} className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 space-y-2">
        <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Verde Eco</p>
        <p className="text-3xl sm:text-5xl font-extrabold text-white">{h[0]}</p>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl">{h[1]}</p>
      </div>
    </div>
  );
}

export function PageExtra({ page, onCta }) {
  const items = EXTRA[page] || [];
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-center bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden"
        >
          <Img src={it.img} alt={it.title} className={`w-full h-60 sm:h-80 lg:h-full min-h-[15rem] object-cover ${i % 2 ? 'lg:order-2' : ''}`} />
          <div className="p-6 sm:p-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{it.title}</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{it.text}</p>
            <ul className="space-y-2">
              {it.bullets.map((b) => (
                <li key={b} className="flex items-center space-x-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /><span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
      {items.length > 0 && !['pricing', 'contact'].includes(page) && (
        <div className="text-center">
          <button onClick={() => onCta('pricing')} className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold inline-flex items-center space-x-2 cursor-pointer border-0">
            <span>Pre-Order Now</span><ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}