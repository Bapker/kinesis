'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { AlertCircle, ZapOff, Pill, ShieldAlert, Dumbbell, Frown } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

export default function PainSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const titleRef      = useRef<HTMLHeadingElement>(null);
  const cardsRef      = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
      if (cardsRef.current) {
        gsap.fromTo(Array.from(cardsRef.current.children),
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)', stagger: 0.06,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 70%' } }
        );
      }
      gsap.fromTo(conclusionRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: conclusionRef.current, start: 'top 85%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const pains = [
    { Icon: ZapOff,      text: 'После операции или травмы тело работает хуже'   },
    { Icon: Pill,        text: 'Обезболивающие помогают только временно'         },
    { Icon: ShieldAlert, text: 'Боитесь снова навредить себе'                    },
    { Icon: Dumbbell,    text: 'Обычный фитнес только усугубляет'                },
    { Icon: Frown,       text: 'Врачи говорят — придётся жить с этим'            },
  ];

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">

        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-4">
          Узнаёте себя?
        </h2>
        <p className="text-center text-white/40 text-lg mb-16">
          Если хотя бы один пункт — про вас, мы поможем
        </p>

        <div ref={cardsRef} className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Карточка 1 — с фото */}
          <div className="glass-card-hover rounded-2xl overflow-hidden">
            <div className="relative h-44 w-full">
              <Image src="/images/pain-knee.png" alt="Боль в колене" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="p-6 flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
              <p className="text-white/70 text-base leading-relaxed">
                Боль в колене, спине или шее не уходит даже после отдыха
              </p>
            </div>
          </div>

          {/* Карточки 2–6 */}
          {pains.map(({ Icon, text }, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-red-400" />
              </div>
              <p className="text-white/70 text-base leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div ref={conclusionRef} className="text-center mt-12">
          <div className="inline-block px-8 py-5 rounded-2xl bg-[#FFD400]/5 border border-[#FFD400]/20">
            <p className="text-xl md:text-2xl font-black text-white">
              Kinezis создан <span className="gradient-text">именно</span> для таких случаев
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
