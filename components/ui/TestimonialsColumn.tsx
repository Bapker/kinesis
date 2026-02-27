'use client';

interface Testimonial {
  name: string;
  text: string;
  rating?: number;
  date?: string;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}

export function TestimonialsColumn({ testimonials, duration = 20, className = '' }: TestimonialsColumnProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex flex-col gap-4"
        style={{ animation: `marquee-vertical ${duration}s linear infinite` }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="glass-card rounded-xl p-5 w-72 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD400]/20 flex items-center justify-center text-[#FFD400] font-bold text-sm shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                    <span key={j} className="text-[#FFD400] text-xs">★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{t.text}</p>
            {t.date && <p className="text-white/20 text-xs mt-3">{t.date}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
