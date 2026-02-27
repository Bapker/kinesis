'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, TrendingUp, Repeat } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
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
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 70%' } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const solutions = [
    { Icon: ShieldCheck, title: 'Безопасно',    desc: 'Программы составлены физиотерапевтами. Никаких рисков — только проверенные методики.' },
    { Icon: TrendingUp,  title: 'Эффективно',   desc: 'Функциональный подход — тело учится работать правильно, а не просто снимает симптом.' },
    { Icon: Repeat,      title: 'Долгосрочно',  desc: 'Результат сохраняется, потому что вы понимаете своё тело и умеете с ним работать.' },
  ];

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#0F0F0F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FFD400]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16">
          Не лечение —<br className="md:hidden" /> восстановление через движение
        </h2>

        <div ref={cardsRef} className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {solutions.map(({ Icon, title, desc }, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFD400]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#FFD400]/10 mx-auto mb-6 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-[#FFD400]" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">{title}</h3>
                <p className="text-white/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
