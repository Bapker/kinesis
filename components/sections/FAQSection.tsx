'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: 'Нужно ли направление от врача?',
    a: 'Нет. Можно прийти самостоятельно. На первой встрече разберёмся в ситуации и при необходимости порекомендуем дополнительные обследования.' },
  { q: 'Подходит ли при грыже, остеопорозе, артрозе?',
    a: 'Да, в большинстве случаев. Работаем с различными диагнозами. Перед началом обязательно проводим оценку и согласовываем программу.' },
  { q: 'Сколько занятий нужно для результата?',
    a: 'Первые изменения большинство отмечают после 3–5 занятий. Устойчивый результат — через 10–15 занятий при регулярности 2–3 раза в неделю.' },
  { q: 'Чем вы отличаетесь от обычного фитнеса?',
    a: 'Работаем с ограничениями и болями, а не просто даём нагрузку. Каждое упражнение — с обоснованием. Никакого «терпи и качай».' },
  { q: 'Есть ли противопоказания?',
    a: 'Да. Острые воспаления, онкология, ряд неврологических нарушений. Всё уточняем на консультации. Если противопоказания есть — честно скажем.' },
  { q: 'Как проходит первое занятие?',
    a: 'Первые 20 минут — разговор о вас. Затем функциональное тестирование. В конце — объяснение программы. Никаких болезненных манипуляций.' },
  { q: 'Вы работаете с пожилыми?',
    a: 'Да, это одно из ключевых направлений. Программы для 55+ учитывают возрастные особенности и реальный темп восстановления.' },
  { q: 'Как записаться?',
    a: 'Нажмите кнопку «Записаться» на сайте или напишите в WhatsApp. Первичная консультация — бесплатно, около 30 минут.' },
];

export default function FAQSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      if (listRef.current) {
        gsap.fromTo(Array.from(listRef.current.children),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.07,
            scrollTrigger: { trigger: listRef.current, start: 'top 75%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">

        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16">
          Частые вопросы — честные ответы
        </h2>

        <div ref={listRef} className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#FFD400]/30 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between gap-4 text-left group min-h-[48px]"
              >
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-[#FFD400] transition-colors">
                  {faq.q}
                </h3>
                <ChevronDown className={`w-5 h-5 text-[#FFD400] shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 md:px-8 pb-6">
                  <p className="text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
