'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestimonialsColumn } from '@/components/ui/TestimonialsColumn';
gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: 'Артём К.',    text: 'После операции на колене не мог нормально ходить 3 месяца. За 8 занятий вернулся к нормальной жизни.',    date: 'Январь 2025'  },
  { name: 'Людмила П.',  text: 'Спина болела 5 лет. Думала, это навсегда. Kinezis доказал обратное.',                                     date: 'Февраль 2025' },
  { name: 'Серик А.',    text: 'Профессионально, внимательно, без спешки. Объясняют всё понятным языком.',                                date: 'Декабрь 2024' },
  { name: 'Марина Д.',   text: 'Грыжа L4-L5 беспокоила 3 года. После курса болей нет уже 8 месяцев.',                                    date: 'Ноябрь 2024'  },
  { name: 'Нурлан Б.',   text: 'Привёл маму после инсульта. Прогресс виден с каждым занятием. Очень благодарны.',                         date: 'Март 2025'    },
  { name: 'Елена Р.',    text: 'Наконец-то нашла специалистов, которые работают с причиной, а не выписывают таблетки.',                   date: 'Февраль 2025' },
  { name: 'Дмитрий Ш.',  text: 'Колено после разрыва мениска. 12 занятий — и снова бегаю.',                                               date: 'Январь 2025'  },
  { name: 'Айгуль М.',   text: 'Шейный остеохондроз и головные боли ушли после 6 недель работы.',                                         date: 'Октябрь 2024' },
  { name: 'Владимир К.', text: '70 лет, замена тазобедренного сустава. Восстановились быстрее, чем предсказывали врачи.',                 date: 'Март 2025'    },
  { name: 'Сауле Н.',    text: 'Объяснили, почему болит и что делать. Это важнее, чем просто снять боль.',                                date: 'Декабрь 2024' },
  { name: 'Игорь Т.',    text: 'Сколиоз с детства. Впервые в жизни чувствую, что спина работает правильно.',                              date: 'Ноябрь 2024'  },
  { name: 'Алина Ж.',    text: 'После декрета болела поясница. Уже после 3 занятий стало значительно лучше.',                             date: 'Февраль 2025' },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

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

  const col1 = reviews.filter((_, i) => i % 3 === 0);
  const col2 = reviews.filter((_, i) => i % 3 === 1);
  const col3 = reviews.filter((_, i) => i % 3 === 2);

  return (
    <section ref={sectionRef} id="reviews" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">

        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-4">
          Истории выздоровления и отзывы наших клиентов
        </h2>

        {/* 2GIS рейтинг */}
        <div className="max-w-sm mx-auto glass-card rounded-2xl p-6 text-center mb-14">
          <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Рейтинг на 2GIS</p>
          <div className="text-5xl font-black text-[#FFD400] mb-1">4.9</div>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => <span key={i} className="text-[#FFD400] text-lg">★</span>)}
          </div>
          <p className="text-white/30 text-xs mb-4">На основе 3 795 отзывов</p>
          <a
            href="https://2gis.kz/astana/firm/70000001032687222"
            target="_blank" rel="noopener noreferrer"
            className="inline-block border border-[#FFD400]/30 text-[#FFD400] text-sm font-bold px-5 py-2 rounded-full hover:bg-[#FFD400]/10 transition-colors"
          >
            Смотреть в 2GIS
          </a>
        </div>

        {/* Колонки */}
        <div className="flex justify-center gap-6 max-h-[680px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsColumn testimonials={col1} duration={20} />
          <TestimonialsColumn testimonials={col2} duration={26} className="hidden md:block" />
          <TestimonialsColumn testimonials={col3} duration={23} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
