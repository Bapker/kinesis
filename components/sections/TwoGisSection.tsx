'use client';
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TWO_GIS_FIRM_URL = 'https://2gis.kz/astana/firm/70000001032687222';

export default function TwoGisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const totalReviews = 2795;

  const ratingDistribution = useMemo(
    () =>
      [
        { stars: 5, percentage: 92 },
        { stars: 4, percentage: 6 },
        { stars: 3, percentage: 1 },
        { stars: 2, percentage: 0.5 },
        { stars: 1, percentage: 0.5 },
      ].map((item) => ({
        ...item,
        approxReviews: Math.round((item.percentage / 100) * totalReviews),
      })),
    [totalReviews]
  );

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

      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F] overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="kz-h2 text-white text-center tracking-[2px] mb-6">
          Мы в 2GIS
        </h2>
        <p className="kz-body text-center text-white/45 tracking-[1px] mb-12 max-w-3xl mx-auto">
          Прозрачная репутация центра на независимой площадке с реальными отзывами клиентов.
        </p>

        <div ref={contentRef} className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl overflow-hidden bg-white/5 p-1.5">
                <Image src="/logos/twogis.png" alt="2GIS" width={56} height={56} className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="text-white text-[30px] font-black leading-none tracking-[2px]">2GIS</h3>
                <p className="text-white/45 tracking-[1px] text-sm">Основано на отзывах клиентов</p>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 md:p-8">
              <div className="flex items-end gap-4 mb-4">
                <div className="text-6xl font-black text-[#FFD400] leading-none">4.9</div>
                <div className="pb-1">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-6 w-6 fill-[#FFD400] text-[#FFD400]" />
                    ))}
                  </div>
                  <p className="text-white/45 tracking-[1px] text-sm">Рейтинг 2GIS</p>
                </div>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="w-4 text-white/45 tracking-[1px] text-sm">{item.stars}</span>
                    <div className="h-2 flex-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-[#FFD400] rounded-full transition-all duration-1000"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="min-w-[68px] text-right text-white/45 tracking-[1px] text-xs sm:text-sm">
                      ~{item.approxReviews.toLocaleString('ru-RU')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={statsRef} className="space-y-4 md:space-y-6">
            <a
              href={TWO_GIS_FIRM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-white/10 h-[280px] md:h-[340px] bg-black/20"
            >
              <Image
                src="/2gis.png"
                alt="Карта филиала в 2GIS"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs tracking-[1px] text-white/70">
                  2GIS
                </div>
                <div>
                  <div className="flex items-center gap-3 text-white">
                    <MapPin className="h-5 w-5 text-[#FFD400]" />
                    <span className="text-[20px] md:text-[24px] font-black leading-[1.2] tracking-[2px]">
                      Открыть филиал на карте
                    </span>
                  </div>
                  <p className="mt-2 text-white/50 tracking-[1px] text-sm">
                    Переход в официальную карточку KinezisLife в 2GIS
                  </p>
                </div>
              </div>
            </a>

            <div className="glass-card rounded-3xl p-6 md:p-8 text-center">
              <div className="text-white/45 uppercase tracking-[2px] text-sm mb-2">Всего в 2GIS</div>
              <div className="flex justify-center gap-8 mb-2">
                <div>
                  <div className="text-4xl font-black text-white leading-none">2 795</div>
                  <div className="text-white/45 tracking-[1px] text-sm mt-1">Отзывов</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white leading-none">3 100</div>
                  <div className="text-white/45 tracking-[1px] text-sm mt-1">Оценок</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 md:p-8 text-center">
              <div className="text-6xl font-black text-white leading-none mb-2">98%</div>
              <div className="text-white/45 tracking-[1px] text-base">Рекомендуют центр близким</div>
            </div>

            <a
              href={TWO_GIS_FIRM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#FFD400] text-black text-center font-black tracking-[1px] px-8 py-4 rounded-full hover:brightness-105 transition-all min-h-[48px]"
            >
              Открыть карточку в 2GIS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
