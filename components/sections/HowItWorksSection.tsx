'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', img: '/images/consultation-elderly.png',     title: 'Консультация',             desc: 'Разбираем историю, образ жизни, цели. Честно говорим, чем можем помочь.' },
  { num: '02', img: '/images/specialist-spine-consult.png', title: 'Диагностика движения',      desc: 'Функциональное тестирование. Находим ограничения, слабые звенья и компенсации.' },
  { num: '03', img: '/images/gym-back-rehab.png',           title: 'Индивидуальная программа',  desc: 'Составляем программу под вашу задачу. Никаких шаблонов — только ваш случай.' },
  { num: '04', img: '/images/elderly-knee-therapy.png',     title: 'Занятия и контроль',        desc: 'Занятия с коррекцией каждые 2 недели. Вы видите прогресс на каждом этапе.' },
];

export default function HowItWorksSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const stepsRef    = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );

      // Линия между шагами (десктоп)
      const lineInner = lineRef.current?.querySelector('div');
      if (lineInner) {
        gsap.fromTo(lineInner,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center',
            scrollTrigger: { trigger: stepsRef.current, start: 'top 70%' } }
        );
      }

      if (stepsRef.current) {
        gsap.fromTo(Array.from(stepsRef.current.children),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.15,
            scrollTrigger: { trigger: stepsRef.current, start: 'top 70%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative section-padding bg-[#0F0F0F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-20">
          Как проходит работа с нами
        </h2>

        {/* Линия (только десктоп) */}
        <div ref={lineRef} className="hidden lg:block relative max-w-6xl mx-auto mb-0">
          <div className="absolute top-[72px] left-[12.5%] right-[12.5%] h-px bg-white/10">
            <div className="h-full bg-[#FFD400]/50" />
          </div>
        </div>

        <div ref={stepsRef} className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ num, img, title, desc }) => (
            <div key={num} className="flex flex-col">
              {/* Жёлтая точка */}
              <div className="hidden lg:flex justify-center mb-6">
                <div className="w-5 h-5 rounded-full bg-[#FFD400] border-4 border-[#0F0F0F] relative z-10" />
              </div>

              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                <Image src={img} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              </div>

              <div className="glass-card rounded-xl p-5 flex-1">
                <div className="text-[#FFD400] font-black text-xl mb-2">{num}</div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
