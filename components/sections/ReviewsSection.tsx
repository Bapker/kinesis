'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestimonialsColumn } from '@/components/ui/TestimonialsColumn';
gsap.registerPlugin(ScrollTrigger);

const reviewCards = Array.from({ length: 14 }, (_, i) => ({
  image: `/reviews/${i + 1}.jpeg`,
}));

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const col1 = reviewCards.filter((_, i) => i % 3 === 0);
  const col2 = reviewCards.filter((_, i) => i % 3 === 1);
  const col3 = reviewCards.filter((_, i) => i % 3 === 2);

  return (
    <section ref={sectionRef} id="reviews" className="relative section-padding bg-[#2F2F2F]">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">

        <h2 ref={titleRef} className="kz-h2 text-white text-center mb-4">
          Истории выздоровления и отзывы наших клиентов
        </h2>
        <p className="kz-body text-center text-white/45 mb-14">
          Видео-истории и живые отзывы пациентов о восстановлении.
        </p>

        {/* Колонки */}
        <div className="flex justify-center gap-6 max-h-[680px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsColumn testimonials={col1} duration={20} />
          <TestimonialsColumn testimonials={col2} duration={26} className="hidden md:block" />
          <TestimonialsColumn testimonials={col3} duration={23} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
