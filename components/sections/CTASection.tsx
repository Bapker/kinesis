'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  openModal: () => void;
}

export default function CTASection({ openModal }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(10 * 60);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, { x: 30, y: -20, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true });

      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.4)',
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const timerText = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
    const seconds = (remainingSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [remainingSeconds]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 bg-[#0F0F0F] overflow-hidden text-center">
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#FFD400]/5 blur-[200px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
          Спецпредложение только для вас
        </h2>

        <p ref={subtitleRef} className="text-lg md:text-xl text-white/45 mb-5 max-w-3xl mx-auto leading-relaxed">
          Диагностика со скидкой, которой ещё не было.
        </p>

        <p className="text-[#FFD400] font-semibold mb-8">
          Бонусом получите файл с рекомендациями по лечебной физкультуре.
        </p>

        <div className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-[#FFD400]/30 bg-[#FFD400]/10 mb-10">
          <span className="text-white/70 text-sm uppercase tracking-wider mr-3">До конца акции</span>
          <span className="text-[#FFD400] text-3xl md:text-4xl font-black">{timerText}</span>
        </div>

        <div>
          <button
            ref={buttonRef}
            onClick={openModal}
            className="bg-[#FFD400] text-black px-12 py-5 rounded-full text-xl font-black hover:brightness-105 hover:scale-[1.02] transition-all inline-block min-h-[48px]"
          >
            Получить скидку и забрать файл
          </button>
        </div>
      </div>
    </section>
  );
}
