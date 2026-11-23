import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, Wrench, Cpu, Activity } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=85',
    fallback: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=900&auto=format&fit=crop&q=85',
    label: 'Repair Workstation',
    tag: 'Hardware Diagnosis',
    icon: Wrench,
    color: 'from-blue-500/80 to-blue-900/95',
    accent: '#2563EB',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=85',
    fallback: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=900&auto=format&fit=crop&q=85',
    label: 'Motherboard Analysis',
    tag: 'Circuit Inspection',
    icon: Cpu,
    color: 'from-teal-600/80 to-slate-900/95',
    accent: '#14B8A6',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&auto=format&fit=crop&q=85',
    fallback: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&auto=format&fit=crop&q=85',
    label: 'Laptop Engineering',
    tag: 'Precision Repair',
    icon: Activity,
    color: 'from-indigo-600/80 to-slate-900/95',
    accent: '#38BDF8',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=85',
    fallback: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=900&auto=format&fit=crop&q=85',
    label: 'Technical Diagnostics',
    tag: 'System Analysis',
    icon: ShieldCheck,
    color: 'from-blue-700/80 to-indigo-900/95',
    accent: '#60A5FA',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=900&auto=format&fit=crop&q=85',
    fallback: 'https://images.unsplash.com/photo-1468436139062-f60851436e2a?w=900&auto=format&fit=crop&q=85',
    label: 'Component Recovery',
    tag: 'Verified Solution',
    icon: ShieldCheck,
    color: 'from-teal-700/80 to-blue-900/95',
    accent: '#14B8A6',
  },
];

const AUTO_PLAY_MS = 3800;

export const HeroImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = SLIDES[current];
  const Icon = slide.icon;

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.04,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-60%' : '60%',
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
    }),
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 select-none"
      style={{ aspectRatio: '4/3' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image Carousel */}
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Photo */}
          <img
            src={slide.url}
            alt={slide.label}
            loading="eager"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = slide.fallback;
            }}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay — bottom-heavy for text legibility */}
          <div className={`absolute inset-0 bg-gradient-to-t ${slide.color}`} style={{ opacity: 0.55 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent" />

          {/* Top badge */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold backdrop-blur-md border"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.18)',
                color: '#fff',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: slide.accent }}
              />
              {slide.tag}
            </span>
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4" style={{ color: slide.accent }} />
              <span className="text-xs font-mono font-semibold" style={{ color: slide.accent }}>
                FixTrail Intelligence
              </span>
            </div>
            <p className="text-white font-bold text-lg leading-tight tracking-tight">
              {slide.label}
            </p>
            <p className="text-slate-300 text-xs mt-0.5 font-mono">
              Community-verified · Wilson Ranked
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrow controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
        style={{ background: 'rgba(16,27,53,0.65)', border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
        style={{ background: 'rgba(16,27,53,0.65)', border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-5 z-20 flex items-center gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? slide.accent : 'rgba(255,255,255,0.35)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute top-4 right-4 z-20 text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
        style={{ background: 'rgba(16,27,53,0.65)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>
    </div>
  );
};
