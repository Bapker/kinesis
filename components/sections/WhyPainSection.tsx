'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Activity, AlertCircle, Bone, Dumbbell, Pill, ShieldCheck, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WhyPainSectionProps {
  openModal: () => void;
}

const causeItems = [
  { Icon: Bone, text: 'Остеохондроз и грыжи' },
  { Icon: Pill, text: 'Артроз и воспаление суставов' },
  { Icon: Dumbbell, text: 'Мышечные спазмы и слабость' },
  { Icon: TrendingUp, text: 'Крепление связок и слабость' },
];

const recoveryStages = [
  { Icon: AlertCircle, text: 'Снятие боли' },
  { Icon: Activity, text: 'Восстановление движений' },
  { Icon: Dumbbell, text: 'Укрепление мышц' },
  { Icon: ShieldCheck, text: 'Профилактика обострений' },
];

export default function WhyPainSection({ openModal }: WhyPainSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={cardRef} className="max-w-6xl mx-auto">
          <article className="rounded-3xl glass-card overflow-hidden ">
            <div className="grid lg:grid-cols-[1.7fr_1fr]">

              {/* Left content */}
              <div className="p-7 pt-0 md:p-10 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-white tracking-[2px] text-[28px] md:text-[34px] font-black leading-[1.2] mb-7">
                    Почему возникает боль?
                  </h3>

                  {/* Causes 2×2 grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {causeItems.map(({ Icon, text }) => (
                      <div key={text} className="rounded-2xl glass-card px-4 py-6 flex items-center gap-5">
                          <Icon className="w-6 h-6 text-[#FFD400]" />
                          <span className="text-white tracking-[1px] text-[16px] leading-[1.4]">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery stages */}
                <div className="mb-8">
                  <h4 className="text-white tracking-[2px] text-[28px] font-black leading-[1.2] mb-5">Этапы восстановления</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {recoveryStages.map(({ Icon, text }) => (
                      <div key={text} className="rounded-2xl glass-card py-5 px-4 text-center">
                        <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                          <Icon className="w-7 h-7 text-[#FFD400]" />
                        </div>
                        <p className="text-white tracking-[1px] text-[14px] leading-[1.45]">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={openModal}
                  className="w-full bg-[#FFD400] text-black font-black tracking-[1px] px-8 py-3.5 rounded-full hover:brightness-105 transition-all min-h-[48px] self-start"
                >
                  Записаться на диагностику
                </button>
              </div>

              {/* Right image */}
              <div className="relative min-h-[320px] lg:min-h-[320px]">
                <Image
                  src="/photos_kinezis/3block/1.png"
                  alt="Диагностика первопричины боли"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#373737]/10 via-[#373737]/45 to-[#373737]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#373737] to-transparent" />
              </div>

            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
