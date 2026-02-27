'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface WhyNoHelpSectionProps {
  openModal: () => void;
}

const reasons = [
  'Таблетки снимают симптом, но не причину',
  'Без диагностики лечение подбирается вслепую',
  'Причина боли часто не там, где болит',
  'Со временем состояние может ухудшаться',
];

export default function WhyNoHelpSection({ openModal }: WhyNoHelpSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', delay: 0.1,
          scrollTrigger: { trigger: cardRef.current, start: 'top 75%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <h2 ref={titleRef} className="kz-h2 tracking-[2px] text-white text-center mb-16">
          Почему обычное лечение не помогает
        </h2>

        <div ref={cardRef} className="max-w-6xl mx-auto">
          <article className="glass-card rounded-3xl overflow-hidden grid lg:grid-cols-2">

            <div className="relative min-h-[280px] lg:min-h-full order-1 lg:order-none">
              <Image
                src="/photos_kinezis/4block/1.png"
                alt="Почему важна диагностика"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#373737]/10 via-[#373737]/45 to-[#373737]" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#373737] to-transparent" />
            </div>

            <div className="p-7 md:p-10 flex flex-col justify-between">
              <h3 className="kz-body font-semibold tracking-[2px] text-white mb-6">
                Почему без диагностики боль возвращается снова
              </h3>
              <ul className="space-y-4 mb-6">
                {reasons.map(item => (
                  <li key={item} className=" flex items-start gap-3 text-white/75">
                    <span className="w-3 h-3 rounded-full border-[#FFD400] border-[1.5px] mt-2.5 shrink-0" />
                    <span className='tracking-[1px] font-[12px]'>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="kz-body tracking-[1px] text-white font-semibold mb-8">
                Мы сначала находим причину, а потом лечим.
              </p>
              <button
                onClick={openModal}
                className="border w-full border-[#FFD400] text-[#FFD400] font-bold tracking-[1px] px-8 py-3.5 rounded-full hover:bg-[#FFD400]/10 transition-all min-h-[48px]"
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
