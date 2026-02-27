'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksSectionProps {
  openModal: () => void;
}

const steps = [
  'Подробный опрос и сбор истории боли и болезней',
  'Тестирование подвижности и силы мышц',
  'Анализ осанки и походки',
  'Заключение специалиста',
  'Персональный план восстановления',
  'Функциональные пробы на тренажёрах',
];

export default function HowItWorksSection({ openModal }: HowItWorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
        imageRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 75%' },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="kz-h2 text-white text-center mb-6">
          Как проходит диагностика в KinezisLife
        </h2>
        <p className="kz-body text-center text-white/45 mb-12 max-w-3xl mx-auto">
          Пошагово разберём ваше состояние, объясним источник боли и дадим персональный план лечения.
        </p>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
          <div ref={imageRef} className="relative h-72 md:h-[420px] lg:h-auto rounded-3xl overflow-hidden">
            <Image
              src="/photos_kinezis/7block/1.png"
              alt="Как проходит диагностика в KinezisLife"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="glass-card rounded-3xl p-7 md:p-10 h-full flex flex-col">
            <ul ref={listRef} className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#FFD400]/15 text-[#FFD400] text-[18px] font-black flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="kz-body text-white/75">{step}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openModal}
              className="mt-auto w-full bg-[#FFD400] text-black font-black py-4 rounded-full hover:brightness-105 transition-all min-h-[48px]"
            >
              Пройти диагностику и получить план лечения
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
