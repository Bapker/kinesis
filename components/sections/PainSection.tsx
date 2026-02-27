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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);

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

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            scrollTrigger: { trigger: listRef.current, start: 'top 75%' },
          }
        );
      }

      if (photosRef.current) {
        gsap.fromTo(
          Array.from(photosRef.current.children),
          { y: 30, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: { trigger: photosRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-14">
          Что вас беспокоит?
        </h2>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          <div ref={listRef} className="glass-card rounded-3xl p-7 md:p-9 space-y-4">
            {pains.map(item => (
              <div key={item} className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD400] mt-2 shrink-0" />
                <p className="text-white/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div ref={photosRef} className="grid sm:grid-cols-2 gap-4">
            {painPhotos.map(({ src, label }) => (
              <div key={src} className="relative h-56 rounded-2xl overflow-hidden border border-white/10">
                <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 to-transparent">
                  <p className="text-white text-sm font-semibold">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
