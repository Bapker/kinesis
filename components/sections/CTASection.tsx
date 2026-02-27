'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps { openModal: () => void; }

export default function CTASection({ openModal }: CTASectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef   = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, { x: 30, y: -20, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true });

      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(buttonRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)', delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 bg-[#0F0F0F] overflow-hidden text-center">
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#FFD400]/5 blur-[200px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[0.95]">
          Первый шаг к жизни<br />
          <span className="gradient-text">без боли</span> — прямо сейчас
        </h2>

        <p ref={subtitleRef} className="text-lg md:text-xl text-white/40 mb-12 max-w-lg mx-auto leading-relaxed">
          Запишитесь на бесплатную 30-минутную консультацию.
          Разберём вашу ситуацию и составим план действий.
        </p>

        <button
          ref={buttonRef}
          onClick={openModal}
          className="bg-[#FFD400] text-black px-12 py-6 rounded-full text-xl font-black hover:brightness-105 hover:scale-[1.02] transition-all inline-block min-h-[48px]"
        >
          Записаться бесплатно
        </button>

        <p className="text-white/20 text-sm mt-6">
          Без навязывания. Без скрытых платежей. Просто разговор о вас.
        </p>
      </div>
    </section>
  );
}
