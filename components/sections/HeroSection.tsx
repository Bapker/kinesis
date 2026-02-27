'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps { openModal: () => void; }

export default function HeroSection({ openModal }: HeroSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const buttonsRef  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, { x: 50, y: -30, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true });

      gsap.fromTo(badgeRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.8 });
      gsap.fromTo(titleRef.current,    { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.0 });
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.3 });

      if (statsRef.current) {
        gsap.fromTo(Array.from(statsRef.current.children),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, delay: 1.5, duration: 0.5, ease: 'power2.out' }
        );
      }

      gsap.fromTo(buttonsRef.current,  { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1.7 });
      gsap.set(scrollRef.current,  { opacity: 0 });
      gsap.to(scrollRef.current,   { opacity: 1, duration: 0.5, delay: 2.2 });
      gsap.to(scrollRef.current,   { y: 10, duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2.5 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F0F0F]">

      <div className="absolute inset-0 opacity-90">
        <Image
          src="/images/hero-spine.png"
          alt="Реабилитация позвоночника"
          fill priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, #0F0F0F 40%, rgba(15,15,15,0.2) 100%)' }} />
        <div className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(to bottom, #0F0F0F, rgba(15,15,15,0.7), #0F0F0F)' }} />
      </div>

      <div ref={glowRef} className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFD400]/5 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-28 pb-20">
        <div className="max-w-2xl">

          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/5 mb-8">
            <span className="text-[#FFD400] text-sm font-medium uppercase tracking-wide">
              Функциональная реабилитация • Астана
            </span>
          </div>

          <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-[68px] font-black text-white leading-[0.95] mb-6">
            Верните тело к жизни —<br />
            без боли, без страха,<br />
            <span className="text-[#FFD400]">навсегда</span>
          </h1>

          <p ref={subtitleRef} className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed">
            Индивидуальные программы восстановления после травм, операций и хронических болей.
            Работаем с причиной, а не симптомом.
          </p>

          <div ref={statsRef} className="flex flex-wrap gap-3 mb-10">
            {['Более 800 пациентов', 'Опыт 8+ лет', '98% рекомендуют', 'Консультация бесплатно'].map((s, i) => (
              <div key={i} className="px-4 py-2 rounded-full border border-[#FFD400]/25 bg-[#FFD400]/[0.08]">
                <span className="text-[#FFD400] text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openModal}
              className="bg-[#FFD400] text-black font-black px-8 py-4 rounded-full text-lg hover:brightness-105 hover:scale-[1.02] transition-all min-h-[48px]"
            >
              Записаться на консультацию
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 text-white font-bold px-8 py-4 rounded-full text-lg border border-white/[0.15] hover:bg-white/10 transition-all min-h-[48px]"
            >
              Узнать о программах
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-xs uppercase tracking-widest">Прокрутите вниз</span>
        <ArrowDown className="w-4 h-4 text-white/20" />
      </div>
    </section>
  );
}
