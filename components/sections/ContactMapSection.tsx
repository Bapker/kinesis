'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Circle, MapPin, PhoneCall, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface ContactMapSectionProps {
  openModal: () => void;
}

const phoneRaw = '77479415057';
const phoneFormatted = '+7-(747)-941-50-57';
const TWO_GIS_FIRM_URL = 'https://2gis.kz/astana/firm/70000001032687222';

const trustItems = [
  'Лицензированный центр',
  'Сертифицированные специалисты',
  'Безопасные методики восстановления',
];

export default function ContactMapSection({ openModal }: ContactMapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact-block" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <div ref={cardRef} className="max-w-6xl mx-auto rounded-3xl  p-4 md:p-6 lg:p-8">
          <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h2 className="kz-h2 text-white tracking-[2px] mb-6">
                Свяжитесь с нами
              </h2>

              <div className="space-y-4 border-t border-white/10 pt-5">
                <a
                  href={`tel:+${phoneRaw}`}
                  className="inline-flex items-center gap-3 text-white hover:text-[#FFD400] transition-colors"
                >
                  <PhoneCall className="h-5 w-5 text-[#FFD400]" />
                  <span className="text-[26px] md:text-[34px] font-black tracking-[1px]">{phoneFormatted}</span>
                </a>

                <div className="flex items-start gap-3 text-white/75">
                  <MapPin className="h-5 w-5 mt-1 text-[#FFD400] shrink-0" />
                  <p className="text-[18px] tracking-[1px]">г. Астана, адрес сообщим при подтверждении записи</p>
                </div>

                <div className="flex items-start gap-3 text-white/75">
                  <Circle className="h-5 w-5 mt-1 text-[#FFD400] shrink-0" />
                  <p className="text-[18px] tracking-[1px]">Бесплатная парковка и удобный подъезд</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 flex items-start gap-2"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#FFD400] shrink-0" />
                    <span className="min-w-0 break-words text-[13px] leading-[1.35] text-white/70 tracking-[1px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={TWO_GIS_FIRM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-[320px] md:h-full min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/20"
              >
                <Image
                  src="/2gis.png"
                  alt="Карта филиала в 2GIS"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15" />
                <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs tracking-[1px] text-white/70">
                    2GIS
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-[#FFD400] shrink-0" />
                      <span className="text-white text-[20px] md:text-[24px] font-black tracking-[2px] leading-[1.2]">
                        Открыть филиал на карте
                      </span>
                    </div>
                    <p className="text-white/50 tracking-[1px] text-sm">
                      Переход в карточку KinezisLife в 2GIS
                    </p>
                  </div>
                </div>
              </a>

              <button
                onClick={openModal}
                className="w-full rounded-2xl bg-[#FFD400] py-4 text-[18px] font-black text-black tracking-[1px] hover:brightness-105 transition-all min-h-[48px]"
              >
                Записаться на диагностику
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
