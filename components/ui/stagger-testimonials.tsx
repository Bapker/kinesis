'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const services = [
  {
    tempId: 0,
    title: 'Функциональная диагностика',
    description: 'Определяем причину боли и составляем понятный маршрут восстановления.',
  },
  {
    tempId: 1,
    title: 'Реабилитация при боли в спине',
    description: 'Работаем с шеей, грудным и поясничным отделом без агрессивных методик.',
  },
  {
    tempId: 2,
    title: 'Восстановление суставов',
    description: 'Программы для коленей, плеч и тазобедренных суставов с учетом диагноза.',
  },
  {
    tempId: 3,
    title: 'После травм',
    description: 'Возвращаем силу, подвижность и уверенность после бытовых и спортивных травм.',
  },
  {
    tempId: 4,
    title: 'После операций',
    description: 'Пошаговая реабилитация после операций на позвоночнике и суставах.',
  },
  {
    tempId: 5,
    title: 'Программы 55+',
    description: 'Бережные занятия для старшего возраста с безопасной нагрузкой.',
  },
  {
    tempId: 6,
    title: 'Индивидуальные занятия',
    description: 'Персональная работа с инструктором под текущие задачи и ограничения.',
  },
  {
    tempId: 7,
    title: 'ЛФК и двигательная терапия',
    description: 'Укрепляем мышцы и стабилизируем суставы через правильное движение.',
  },
  {
    tempId: 8,
    title: 'Коррекция осанки',
    description: 'Снижаем нагрузку на позвоночник и формируем устойчивые двигательные привычки.',
  },
  {
    tempId: 9,
    title: 'Баланс и координация',
    description: 'Тренируем устойчивость и профилактику падений у взрослых и пожилых.',
  },
  {
    tempId: 10,
    title: 'Домашний план упражнений',
    description: 'Даём упражнения и рекомендации, чтобы закрепить результат вне центра.',
  },
  {
    tempId: 11,
    title: 'Сопровождение и контроль',
    description: 'Отслеживаем динамику и корректируем программу по результатам каждого этапа.',
  },
];

interface ServiceCardProps {
  position: number;
  service: (typeof services)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  position,
  service,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute flex flex-col justify-center text-center rounded-[30px] left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out',
        isCenter
          ? 'z-10 bg-[#FFD400] text-black border-[#FFD400]'
          : 'z-0 bg-[#1F1F1F] text-white border-white/10 hover:border-[#FFD400]/60'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        // clipPath:
        //   'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        // boxShadow: isCenter ? '0px 8px 0px 4px rgba(255,255,255,0.15)' : '0px 0px 0px 0px transparent',
      }}
    >
      <h3 className={cn('text-base tracking-[2px] sm:text-xl font-bold', isCenter ? 'text-black' : 'text-white')}>
        {service.title}
      </h3>
      <p
        className={cn(
          'relative mt-2 text-sm tracking-[1px]',
          isCenter ? 'text-black/75' : 'text-white/60'
        )}
      >
        {service.description}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [servicesList, setServicesList] = useState(services);

  const handleMove = (steps: number) => {
    const newList = [...servicesList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) {
          return;
        }
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) {
          return;
        }
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setServicesList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height: 600 }}
    >
      {servicesList.map((service, index) => {
        const position = servicesList.length % 2
          ? index - (servicesList.length + 1) / 2
          : index - servicesList.length / 2;
        return (
          <ServiceCard
            key={service.tempId}
            service={service}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#2F2F2F] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#2F2F2F] to-transparent sm:w-24" />
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            'flex h-14 w-14 items-center justify-center text-2xl transition-colors',
            'bg-[#0F0F0F] text-white border-2 border-white/20 hover:bg-[#FFD400] hover:text-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2F2F2F]'
          )}
          aria-label="Previous service"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            'flex h-14 w-14 items-center justify-center text-2xl transition-colors',
            'bg-[#0F0F0F] text-white border-2 border-white/20 hover:bg-[#FFD400] hover:text-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2F2F2F]'
          )}
          aria-label="Next service"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
