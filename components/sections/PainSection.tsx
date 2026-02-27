'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const pains = [
  'Ломит поясницу, особенно после отдыха',
  'Шея болит от долгого сидения за компьютером',
  'Каждый шаг даётся с дискомфортом',
  'Боль в плече мешает поднимать руку',
  'Резкие боли в спине из-за грыж и протрузий',
];

const painPhotos = [
  { src: '/photos_kinezis/2block/1.png', label: 'Боль в коленях' },
  { src: '/photos_kinezis/2block/2.png', label: 'Боль в спине' },
  { src: '/photos_kinezis/2block/3.png', label: 'Боль в шее' },
  { src: '/photos_kinezis/2block/4.png', label: 'Боль в плече' },
];

export default function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

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
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.08,
            scrollTrigger: { trigger: listRef.current, start: 'top 75%' } }
        );
      }

      gsap.fromTo(trackRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: trackRef.current, start: 'top 80%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="kz-h2 text-white text-center mb-14">
          Что вас беспокоит?
        </h2>
        <div className='flex gap-12 items-stretch'>
          {/* Pain list */}
          <div ref={listRef} style={{flex: '1 1 0%'}} className="flex flex-col justify-between glass-card rounded-3xl p-7 md:p-9 space-y-4 max-w-6xl mx-auto">
            {pains.map(item => (
              <div key={item} className="flex items-center gap-5">
                <span className="w-4 h-4 rounded-full border-[#FFD400] border-[3px] shrink-0" />
                <p className="kz-body text-white/80 tracking-[1px]">{item}</p>
              </div>
            ))}
          </div>

          {/* Marquee carousel */}
          <div ref={trackRef} style={{flex: '2 1 0%'}} className="relative overflow-hidden [--gap:1rem] [--duration:18s]">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#2F2F2F] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#2F2F2F] to-transparent" />

            <div className="group flex [gap:var(--gap)]">
              <div className="animate-marquee flex shrink-0 [gap:var(--gap)]">
                {[...Array(2)].map((_, setIndex) =>
                  painPhotos.map(({ src, label }, i) => (
                    <div
                      key={`${setIndex}-${i}`}
                      className="relative h-[500px] w-72 shrink-0 rounded-2xl overflow-hidden border border-white/10"
                    >
                      <Image
                        src={src}
                        alt={label}
                        fill
                        className="object-cover"
                        sizes="288px"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-[18px] font-semibold tracking-[1px] leading-snug">{label}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}
