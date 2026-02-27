'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  openModal: () => void;
}

export default function CTASection({ openModal }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(10 * 60);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        x: 40,
        y: -30,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.set(contentRef.current, { y: 30, opacity: 0 });
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.set(timerRef.current, { scale: 0.9, opacity: 0 });
      gsap.to(timerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        delay: 0.2,
      });

      gsap.set(buttonRef.current, { y: 20, opacity: 0 });
      gsap.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        delay: 0.4,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const timerParts = useMemo(() => {
    const hours = Math.floor(remainingSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((remainingSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (remainingSeconds % 60).toString().padStart(2, '0');

    return [
      { value: hours, label: 'Часов' },
      { value: minutes, label: 'Минут' },
      { value: seconds, label: 'Секунд' },
    ];
  }, [remainingSeconds]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-[#2F2F2F] overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD400]/8 blur-[200px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div ref={contentRef}>
            <div className="inline-flex w-fit max-w-full items-center justify-center gap-2 px-4 md:px-8 py-2 md:py-2.5 rounded-full border border-[#FFD400]/20 bg-[#FFD400]/5 mb-6">
              <Zap className="w-4 h-4 text-[#FFD400] shrink-0" />
              <span className="text-[#FFD400] text-sm md:text-base tracking-[1px] uppercase text-center">
                Спецпредложение только для вас
              </span>
            </div>

            <h2 className="kz-h2 text-white tracking-[2px] mb-4">
              Диагностика со скидкой,
              <br />
              которой еще не было
            </h2>

            <p className="kz-body text-[#FFD400] tracking-[1px] mb-8 font-semibold underline decoration-[#FFD400] decoration-2 underline-offset-8">
              Бонусом получите файл с рекомендациями по лечебной физкультуре
            </p>
          </div>

          <div ref={timerRef} className="flex justify-center gap-3 md:gap-4 mb-3">
            {timerParts.map((item) => (
              <div key={item.label} className="glass-card rounded-2xl px-5 md:px-6 py-4 md:py-5 min-w-[90px]">
                <div className="text-4xl md:text-5xl font-black text-[#FFD400] leading-none">{item.value}</div>
                <div className="text-xs text-white/40 mt-2 uppercase tracking-[1px]">{item.label}</div>
              </div>
            ))}
          </div>

          <button
            ref={buttonRef}
            onClick={openModal}
            className="bg-[#FFD400] text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[15px] sm:text-lg font-black tracking-[1px] hover:brightness-105 hover:scale-[1.02] transition-all inline-flex items-center gap-2 mt-3 whitespace-nowrap min-h-[48px]"
          >
            Получить скидку и забрать файл
          </button>
        </div>
      </div>
    </section>
  );
}
