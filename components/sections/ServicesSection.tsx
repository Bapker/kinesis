'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  openModal: () => void;
}

export default function ServicesSection({ openModal }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
        imageRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 75%' },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="kz-h2 text-white text-center mb-6">
          Выбираете центр для родителей?
        </h2>
        <p className="kz-body text-center text-white/50 mb-12 max-w-3xl mx-auto">
          Мы ведём взрослых и старшее поколение бережно: сначала диагностика, потом понятный маршрут восстановления.
        </p>
        <div className="mb-10 grid grid-cols-1 gap-x-4 xl:grid-cols-2">
          <div className="min-w-0">
            <StaggerTestimonials />
          </div>
          <div ref={imageRef} className="relative min-h-[280px] md:min-h-[360px] rounded-3xl overflow-hidden">
            <Image
              src="/photos_kinezis/5block/1.png"
              alt="Реабилитация родителей в KinezisLife"
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#2F2F2F] to-transparent sm:w-28" />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={openModal}
            className="bg-[#FFD400] text-black font-black px-9 py-4 rounded-full hover:brightness-105 transition-all min-h-[48px]"
          >
            Записать родителей на диагностику
          </button>
        </div>
      </div>
    </section>
  );
}
