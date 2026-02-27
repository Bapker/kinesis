'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Activity, Bone, Heart, Dumbbell, Check } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps { openModal: () => void; }

const services = [
  {
    num: '01', img: '/images/specialist-back-work.png', Icon: Activity,
    title: 'ЛФК индивидуально', alt: 'ЛФК',
    desc: 'Персональная программа упражнений. Ведение специалиста на каждом занятии.',
    features: ['Первичная диагностика движения', 'Индивидуальная программа', 'Занятия 60 минут', 'Корректировка каждые 2 недели'],
  },
  {
    num: '02', img: '/images/knee-rehab-table.png', Icon: Bone,
    title: 'Реабилитация после травм', alt: 'Реабилитация колена',
    desc: 'Восстановление после переломов, растяжений, операций на суставах.',
    features: ['Оценка текущего состояния', 'Поэтапное восстановление', 'Работа с компенсациями', 'Возврат к привычной жизни'],
  },
  {
    num: '03', img: '/images/specialist-neck-woman.png', Icon: Heart,
    title: 'Работа с хроническими болями', alt: 'Хронические боли',
    desc: 'Системный подход к болям в шее, пояснице, коленях. Убираем причину.',
    features: ['Шея и грудной отдел', 'Поясница и крестец', 'Колени и тазобедренные суставы', 'Сколиоз и нарушения осанки'],
  },
  {
    num: '04', img: '/images/specialist-lower-back.png', Icon: Dumbbell,
    title: 'Функциональный фитнес', alt: 'Функциональный фитнес',
    desc: 'Тренировки для тех, кто хочет двигаться правильно и без боли.',
    features: ['Для начинающих и восстанавливающихся', 'Правильная техника с нуля', 'Малые группы до 6 человек', 'Прогрессивная нагрузка'],
  },
];

export default function ServicesSection({ openModal }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      if (cardsRef.current) {
        gsap.fromTo(Array.from(cardsRef.current.children),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 70%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16">
          Наши программы
        </h2>

        <div ref={cardsRef} className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          {services.map(({ num, img, Icon, title, alt, desc, features }) => (
            <div key={num} className="glass-card-hover rounded-2xl overflow-hidden">
              <div className="relative h-52 w-full">
                <Image src={img} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="p-8">
                <div className="text-7xl font-black text-white/[0.08] leading-none mb-3 select-none">{num}</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD400]/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[#FFD400]" />
                  </div>
                  <h3 className="text-xl font-black text-white">{title}</h3>
                </div>
                <p className="text-white/50 mb-5 leading-relaxed">{desc}</p>
                <ul className="space-y-2 mb-6">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <Check className="h-4 w-4 text-[#FFD400] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openModal}
                  className="w-full border border-[#FFD400] text-[#FFD400] font-bold py-3 rounded-full hover:bg-[#FFD400]/10 transition-colors min-h-[48px]"
                >
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
