'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  openModal: () => void;
}

const advantages = [
  {
    title: 'Работаем с возрастными болями',
    desc: 'Знаем, как безопасно работать с телом после 40 лет.',
  },
  {
    title: 'Сначала диагностика, потом восстановление',
    desc: 'Находим причину боли, а не действуем наугад.',
  },
  {
    title: 'Полное сопровождение инструкторов',
    desc: 'Покажем, проконтролируем, поможем в процессе.',
  },
  {
    title: 'Индивидуальные программы',
    desc: 'Подбираем под состояние каждого человека.',
  },
  {
    title: 'Без таблеток и уколов',
    desc: 'Только движение и правильная нагрузка.',
  },
  {
    title: 'Рекомендации по обследованиям',
    desc: 'Подскажем, что проверить при необходимости.',
  },
  {
    title: 'Скидки для пенсионеров',
    desc: 'Специальные условия для старшего возраста.',
  },
  {
    title: 'Понятно объясняем причину боли',
    desc: 'Без сложных терминов и запугивания.',
  },
];

export default function ServicesSection({ openModal }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.07,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6">
          Выбираете центр для родителей?
        </h2>
        <p className="text-center text-white/50 mb-12 max-w-3xl mx-auto">
          Мы ведём взрослых и старшее поколение бережно: сначала диагностика, потом понятный маршрут восстановления.
        </p>

        <div ref={imageRef} className="max-w-6xl mx-auto relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
          <Image
            src="/photos_kinezis/5block/1.png"
            alt="Реабилитация родителей в KinezisLife"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div ref={cardsRef} className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {advantages.map(({ title, desc }) => (
            <div key={title} className="glass-card-hover rounded-2xl p-5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD400] mb-3" />
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={openModal}
            className="bg-[#FFD400] text-black font-black px-9 py-4 rounded-full hover:brightness-105 transition-all min-h-[48px]"
          >
            Записать родителей на диагностику
          </button>
        </div>
      </div>
    </section>
  );
}
