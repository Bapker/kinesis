'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface TeamSectionProps {
  openModal: () => void;
}

const specialists = [
  {
    src: '/photos_kinezis/8block/1.jpg',
    name: 'Имя Фамилия',
    role: 'Врач-реабилитолог / Кинезиотерапевт',
    experience: 'Опыт: уточняется',
    specialization: 'Специализация: боль в спине, суставы, восстановление после травм',
  },
  {
    src: '/photos_kinezis/8block/2.jpg',
    name: 'Имя Фамилия',
    role: 'Врач-реабилитолог / Кинезиотерапевт',
    experience: 'Опыт: уточняется',
    specialization: 'Специализация: боль в спине, суставы, восстановление после травм',
  },
];

export default function TeamSection({ openModal }: TeamSectionProps) {
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
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="relative section-padding bg-[#0F0F0F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-6">
          Наши специалисты
        </h2>
        <p className="text-center text-white/45 mb-12 max-w-3xl mx-auto">
          С вами работают специалисты по реабилитации и движению.
        </p>

        <div ref={cardsRef} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {specialists.map(s => (
            <article key={s.src} className="glass-card-hover rounded-3xl overflow-hidden">
              <div className="relative h-80">
                <Image src={s.src} alt={s.name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-white font-black text-2xl mb-2">{s.name}</h3>
                <p className="text-[#FFD400] text-sm mb-2">{s.role}</p>
                <p className="text-white/60 text-sm mb-2">{s.experience}</p>
                <p className="text-white/65 text-sm leading-relaxed mb-6">{s.specialization}</p>
                <button
                  onClick={openModal}
                  className="w-full border border-[#FFD400] text-[#FFD400] font-bold py-3.5 rounded-full hover:bg-[#FFD400]/10 transition-colors min-h-[48px]"
                >
                  Записаться на диагностику
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
