'use client';

interface Testimonial {
  image: string;
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
          <div
            key={`${t.image}-${i}`}
            className="w-72 h-[420px] shrink-0 rounded-xl border border-white/10 bg-[#1F1F1F] bg-contain bg-center"
            style={{ backgroundImage: `url(${t.image})` }}
          />
        ))}
      </div>
    </div>
  );
}
