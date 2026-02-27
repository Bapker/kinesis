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
    name: 'Жданов Андрей Эрнстович',
    role: 'Врач-реабилитолог',
    experience: 'Стаж более 20 лет',
    specialization: 'Специализация: боль в спине, суставы, восстановление после травм',
  },
  {
    src: '/photos_kinezis/8block/2.jpg',
    name: 'Жүніс Арман Нурланұлы',
    role: 'Врач-реабилитолог, онколог-маммолог',
    experience: 'Стаж более 3 лет',
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
    <section ref={sectionRef} id="team" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="kz-h2 text-white text-center mb-6">
          Наши специалисты
        </h2>
        <p className="kz-body text-center text-white/45 mb-12 max-w-3xl mx-auto">
          С вами работают специалисты по реабилитации и движению.
        </p>

        <div ref={cardsRef} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {specialists.map(s => (
            <article key={s.src} className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[430px] sm:min-h-[500px] lg:min-h-[560px]">
              <Image
                src={s.src}
                alt={s.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
                <h3 className="kz-h3 text-white mb-2">{s.name}</h3>
                <p className="text-[#FFD400] text-[18px] mb-2">{s.role}</p>
                <p className="kz-body text-white/70 mb-2">{s.experience}</p>
                <p className="kz-body text-white/80 mb-6">{s.specialization}</p>
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
