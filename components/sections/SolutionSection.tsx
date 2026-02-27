'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface SolutionSectionProps {
  openModal: () => void;
}

const blockThreeList = [
  'Выявим мышечные дисбалансы',
  'Найдём перегруженные и «выключенные» мышцы',
  'Покажем, какие суставы страдают из-за неправильного движения',
  'Объясним, почему боль возвращается',
  'Дадим чёткий план восстановления',
];

const blockFourList = [
  'Таблетки снимают симптом, но не причину',
  'Без диагностики лечение подбирается вслепую',
  'Причина боли часто не там, где болит',
  'Со временем состояние может ухудшаться',
];

export default function SolutionSection({ openModal }: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#0F0F0F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16">
          Почему обычное лечение не помогает
        </h2>

        <div ref={cardsRef} className="max-w-6xl mx-auto space-y-8">
          <article className="glass-card rounded-3xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-7 md:p-10">
              <p className="text-[#FFD400] text-xs uppercase tracking-widest mb-3">Блок 3</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                Почему таблетки и уколы дают лишь временный эффект?
              </h3>
              <p className="text-white/65 leading-relaxed mb-6">
                Потому что чаще всего лечат симптом, а не первопричину.
                Настоящая причина боли в нарушении работы мышц, суставов и биомеханики движения.
              </p>
              <ul className="space-y-3 mb-8">
                {blockThreeList.map(item => (
                  <li key={item} className="flex items-start gap-3 text-white/75">
                    <span className="w-2 h-2 rounded-full bg-[#FFD400] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openModal}
                className="bg-[#FFD400] text-black font-black px-8 py-3.5 rounded-full hover:brightness-105 transition-all min-h-[48px]"
              >
                Записаться на диагностику
              </button>
            </div>

            <div className="relative min-h-[300px] lg:min-h-full">
              <Image
                src="/photos_kinezis/3block/1.png"
                alt="Диагностика первопричины боли"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </article>

          <article className="glass-card rounded-3xl overflow-hidden grid lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-full order-1 lg:order-none">
              <Image
                src="/photos_kinezis/4block/1.png"
                alt="Почему важна диагностика"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="p-7 md:p-10">
              <p className="text-[#FFD400] text-xs uppercase tracking-widest mb-3">Блок 4</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                Почему без диагностики боль возвращается снова
              </h3>
              <ul className="space-y-3 mb-6">
                {blockFourList.map(item => (
                  <li key={item} className="flex items-start gap-3 text-white/75">
                    <span className="w-2 h-2 rounded-full bg-[#FFD400] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white font-semibold mb-8">Мы сначала находим причину, а потом лечим.</p>
              <button
                onClick={openModal}
                className="border border-[#FFD400] text-[#FFD400] font-bold px-8 py-3.5 rounded-full hover:bg-[#FFD400]/10 transition-all min-h-[48px]"
              >
                Хочу получить решение
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
