'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ target, suffix = '', duration = 2.5, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration, ease: 'power2.out',
          onUpdate: () => setCount(Math.floor(obj.val)),
        });
      },
    });
    return () => trigger.kill();
  }, [target, duration]);

  return (
    <div ref={ref} className={`text-5xl md:text-6xl font-black text-[#FFD400] leading-none ${className}`}>
      {count}{suffix}
    </div>
  );
}
