'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 800, suffix: '+', label: 'пациентов прошли программы', duration: 3   },
  { target: 8,   suffix: '',  label: 'лет опыта',                  duration: 2   },
  { target: 98,  suffix: '%', label: 'рекомендуют нас',            duration: 2   },
  { target: 3,   suffix: '',  label: 'направления реабилитации',   duration: 1.5 },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      if (cardsRef.current) {
        gsap.fromTo(Array.from(cardsRef.current.children),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F] overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />

      {/* Фоновый marquee */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.015]">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-[130px] font-black text-white">
            KINEZIS • РЕАБИЛИТАЦИЯ • ДВИЖЕНИЕ • KINEZIS • РЕАБИЛИТАЦИЯ • ДВИЖЕНИЕ •{' '}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-black text-white text-center mb-16">
          Наши результаты в цифрах
        </h2>

        <div ref={cardsRef} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ target, suffix, label, duration }, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter target={target} suffix={suffix} duration={duration} className="mb-2" />
              <p className="text-white/30 text-sm uppercase tracking-wider leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* Бесплатная консультация отдельно */}
        <div className="text-center mt-12">
          <div className="inline-block glass-card rounded-2xl px-10 py-6">
            <div className="text-5xl md:text-6xl font-black text-[#FFD400] mb-2">0 ₸</div>
            <p className="text-white/30 text-sm uppercase tracking-wider">первичная консультация</p>
          </div>
        </div>
      </div>
    </section>
  );
}
