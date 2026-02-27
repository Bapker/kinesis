'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Activity, AlertCircle, Bone, ChevronRight, Dumbbell, Pill, ShieldCheck, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SolutionSectionProps {
  openModal: () => void;
}

const blockThreeList = [
  'Выявим мышечные дисбалансы',
  'Найдём перегруженные и «выключенные» мышцы',
  'Покажем, какие суставы страдают из-за неправильного движения',
  'Объясним, почему боль возвращается',
  'Дадим чёткий план восстановления',
];

const causeItems = [
  { Icon: Bone, text: 'Выявим мышечные дисбалансы' },
  { Icon: Pill, text: 'Найдём перегруженные и «выключенные» мышцы' },
  { Icon: Dumbbell, text: 'Покажем, какие суставы страдают из-за неправильного движения' },
  { Icon: TrendingUp, text: 'Объясним, почему боль возвращается' },
];

const recoveryStages = [
  { Icon: AlertCircle, text: 'Снятие боли' },
  { Icon: Activity, text: 'Восстановление движений' },
  { Icon: Dumbbell, text: 'Укрепление мышц' },
  { Icon: ShieldCheck, text: 'Профилактика обострений' },
];

const blockFourList = [
  'Таблетки снимают симптом, но не причину',
  'Без диагностики лечение подбирается вслепую',
  'Причина боли часто не там, где болит',
  'Со временем состояние может ухудшаться',
];

export default function SolutionSection({ openModal }: SolutionSectionProps) {
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="kz-h2 text-white text-center mb-16">
          Почему обычное лечение не помогает
        </h2>

        <div ref={cardsRef} className="max-w-6xl mx-auto space-y-8">
          <article className="rounded-3xl overflow-hidden border border-[#CFD8DF] bg-[#EEF2F5]">
            <div className="grid lg:grid-cols-[1.7fr_1fr]">
              <div className="p-7 md:p-10">
                <p className="text-[#2F2F2F]/55 text-xs uppercase tracking-widest mb-3">Блок 3</p>
                <h3 className="kz-h3 text-[#0F0F0F] mb-4">
                Почему таблетки и уколы дают лишь временный эффект?
                </h3>
                <p className="kz-body text-[#2F2F2F]/85 mb-7">
                  Потому что чаще всего лечат симптом, а не первопричину. Настоящая причина боли
                  в нарушении работы мышц, суставов и биомеханики движения.
                </p>

                <div className="border-t border-b border-[#D3DCE4] py-6 mb-8">
                  <h4 className="text-[#0F0F0F] text-[28px] font-black leading-[1.2] mb-5">Почему возникает боль?</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {causeItems.map(({ Icon, text }) => (
                      <div key={text} className="rounded-2xl border border-[#D4DEE6] bg-white/70 px-4 py-3 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E4F4F7] border border-[#9FD8E2] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-[#36A8BB]" />
                        </div>
                        <p className="text-[#1E2C39] text-[18px] leading-[1.5]">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-[#0F0F0F] text-[28px] font-black leading-[1.2] mb-5">Этапы восстановления</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {recoveryStages.map(({ Icon, text }, index) => (
                      <div key={text} className="relative">
                        {index < recoveryStages.length - 1 && (
                          <ChevronRight className="hidden lg:block absolute -right-3 top-9 w-5 h-5 text-[#A9BBC8]" />
                        )}
                        <div className="rounded-2xl border border-[#D4DEE6] bg-white/75 py-5 px-4 text-center h-full">
                          <div className="w-14 h-14 mx-auto rounded-full bg-[#E4F4F7] border border-[#9FD8E2] flex items-center justify-center mb-3">
                            <Icon className="w-7 h-7 text-[#36A8BB]" />
                          </div>
                          <p className="text-[#1E2C39] text-[18px] leading-[1.45]">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="kz-body text-[#2F2F2F]/80 mb-6">{blockThreeList[4]}</p>
                <button
                  onClick={openModal}
                  className="bg-[#FFD400] text-black font-black px-8 py-3.5 rounded-full hover:brightness-105 transition-all min-h-[48px]"
                >
                  Записаться на диагностику
                </button>
              </div>

              <div className="relative min-h-[320px] lg:min-h-full">
                <Image
                  src="/photos_kinezis/3block/1.png"
                  alt="Диагностика первопричины боли"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#EEF2F5]/10 via-[#EEF2F5]/45 to-[#EEF2F5]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#EEF2F5] to-transparent" />
              </div>
            </div>
          </article>

          <article className="glass-card rounded-3xl overflow-hidden grid lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-full order-1 lg:order-none">
              <Image
                src="/photos_kinezis/4block/1.png"
                alt="Почему важна диагностика"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="p-7 md:p-10">
              <p className="text-[#FFD400] text-xs uppercase tracking-widest mb-3">Блок 4</p>
              <h3 className="kz-h3 text-white mb-4">
                Почему без диагностики боль возвращается снова
              </h3>
              <ul className="space-y-3 mb-6">
                {blockFourList.map(item => (
                  <li key={item} className="kz-body flex items-start gap-3 text-white/75">
                    <span className="w-2 h-2 rounded-full bg-[#FFD400] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="kz-body text-white font-semibold mb-8">Мы сначала находим причину, а потом лечим.</p>
              <button
                onClick={openModal}
                className="border border-[#FFD400] text-[#FFD400] font-bold px-8 py-3.5 rounded-full hover:bg-[#FFD400]/10 transition-all min-h-[48px]"
              >
                Хочу получить решение
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
