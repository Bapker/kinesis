'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TwoGisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="kz-h2 text-white text-center mb-12">
          Мы в 2GIS
        </h2>

        <div ref={cardRef} className="max-w-xl mx-auto glass-card rounded-3xl p-8 text-center">
          <p className="text-white/45 text-[18px] uppercase tracking-wider mb-2">KinezisLife • Астана</p>
          <div className="text-5xl font-black text-[#FFD400] mb-2">4.9</div>
          <p className="kz-body text-white/55 mb-6">Рейтинг на основе отзывов клиентов</p>
          <a
            href="https://2gis.kz/astana/firm/70000001032687222"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FFD400] text-black font-black px-8 py-3.5 rounded-full hover:brightness-105 transition-all min-h-[48px]"
          >
            Открыть карточку в 2GIS
          </a>
        </div>
      </div>
    </section>
  );
}
