import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Pause, Play, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/servicesData';

const REVIEW_AVATARS: Record<string, string> = {
  'rev-1': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  'rev-2': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
  'rev-3': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
  'rev-4': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
  'rev-5': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
  'rev-6': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
  'rev-7': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&h=120&q=80',
  'rev-8': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
};

// Duplicate list for infinite seamless wrap-around loop
const DUPLICATED_REVIEWS = [...TESTIMONIALS, ...TESTIMONIALS];

export const Testimonials: React.FC = () => {
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 1.5 | 0.7>(1);

  // Compute animation duration (base 36s)
  const durationSeconds = (36 / speedMultiplier).toFixed(1);

  return (
    <section className="py-12 sm:py-16 bg-[#fafcfb] border-b border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CUSTOMER REVIEWS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              What Our Customers Say
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
              Continuous live feedback from verified homeowners across India. Hover any review to pause.
            </p>
          </div>

          {/* Interactive Loop Controls */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            {/* Scroll Left Direction */}
            <button
              type="button"
              onClick={() => {
                setDirection('right');
                setIsPaused(false);
              }}
              title="Reverse scroll direction"
              aria-label="Scroll reviews to right"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                direction === 'right'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900 shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>

            {/* Pause / Play Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              {isPaused ? <Play className="w-4 h-4 fill-emerald-600 text-emerald-600 ml-0.5" /> : <Pause className="w-4 h-4" />}
            </button>

            {/* Scroll Right Direction */}
            <button
              type="button"
              onClick={() => {
                setDirection('left');
                setIsPaused(false);
              }}
              title="Scroll forward"
              aria-label="Scroll reviews to left"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                direction === 'left'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900 shadow-xs'
              }`}
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>

            {/* Loop indicator pill */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-xs ml-1">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-ping'}`} />
              <span>{isPaused ? 'Paused' : 'Continuous Loop'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Marquee Track Container with Smooth Edge Gradients */}
      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Edge Fade Mask */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#fafcfb] to-transparent z-10 pointer-events-none" />

        {/* Right Edge Fade Mask */}
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#fafcfb] to-transparent z-10 pointer-events-none" />

        {/* Infinite Moving Flex Row */}
        <div
          className={`flex gap-5 w-max select-none ${
            direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
          }`}
          style={{
            animationDuration: `${durationSeconds}s`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {DUPLICATED_REVIEWS.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-[285px] sm:w-[335px] shrink-0 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs card-3d-interactive flex flex-col justify-between space-y-4 group text-left transition-all"
            >
              <div className="space-y-3">
                {/* 5 Stars Rating & Service Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{t.date}</span>
                </div>

                {/* Service Tag */}
                {t.serviceTitle && (
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[230px]">{t.serviceTitle}</span>
                  </div>
                )}

                {/* Customer Comment Quote */}
                <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-3">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src={REVIEW_AVATARS[t.id] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                      {t.author}
                    </h4>
                    {t.verified && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" title="Verified Customer" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {t.city}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
