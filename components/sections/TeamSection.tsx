'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const specialists = [
  {
    src:         '/images/specialist-kinezis.jpg',
    name:        'Специалист — уточнить у заказчика',
    designation: 'Реабилитолог, специалист по ЛФК • 5+ лет опыта',
    quote:       'Мой подход — найти первопричину боли и устранить её через правильное движение, а не обезболивающие.',
  },
  {
    src:         '/images/senior-specialist.jpg',
    name:        'Старший специалист — уточнить у заказчика',
    designation: 'Кинезиолог, реабилитолог • 15+ лет опыта',
    quote:       'За 15 лет практики убедился: тело способно восстановиться, если дать ему правильную нагрузку и грамотное сопровождение.',
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(0);
  const cardRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const goTo = (idx: number) => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      opacity: 0, x: -30, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(cardRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
      }
    });
  };

  const s = specialists[active];

  return (
    <section ref={sectionRef} id="team" className="relative section-padding bg-[#0F0F0F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">

        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16">
          Ваши специалисты
        </h2>

        <div className="max-w-4xl mx-auto">
          <div ref={cardRef} className="glass-card rounded-3xl overflow-hidden p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-center">

              {/* Фото */}
              <div className="relative w-56 h-64 rounded-2xl overflow-hidden shrink-0">
                <Image src={s.src} alt={s.name} fill className="object-cover object-top" sizes="224px" />
              </div>

              {/* Текст */}
              <div className="flex-1">
                <div className="text-5xl text-[#FFD400] font-black leading-none mb-4">&ldquo;</div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 italic">
                  {s.quote}
                </p>
                <h3 className="text-white font-black text-xl">{s.name}</h3>
                <p className="text-[#FFD400] text-sm mt-1">{s.designation}</p>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => goTo((active - 1 + specialists.length) % specialists.length)}
              aria-label="Предыдущий специалист"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {specialists.map((_, i) => (
                <button
                  key={i} onClick={() => goTo(i)}
                  aria-label={`Специалист ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2 bg-[#FFD400]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo((active + 1) % specialists.length)}
              aria-label="Следующий специалист"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
