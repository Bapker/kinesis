'use client';
import Image from 'next/image';

const phoneRaw = '77479415057';
const phoneFormatted = '+7 747 941 5057';

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="relative bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 max-w-3xl">
          <div>
            <Image
              src="/logos/logo_white.png"
              alt="Kinezis"
              width={170}
              height={46}
              className="h-9 w-auto mb-3"
            />
            <p className="kz-body text-white/35 mb-6 max-w-md">
              Центр функциональной реабилитации в Астане. Работаем с причиной боли и сопровождаем на каждом этапе восстановления.
            </p>

            <h4 className="font-bold mb-4 text-[18px] uppercase tracking-wider text-white/50">Контакты</h4>
            <ul className="space-y-3 text-white/35 text-[18px] mb-8">
              <li>
                <a href={`tel:+${phoneRaw}`} className="hover:text-[#FFD400] transition-colors">
                  {phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kinezislife_fitness_astana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E1306C] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>

            <h4 className="font-bold mb-4 text-[18px] uppercase tracking-wider text-white/50">Навигация</h4>
            <ul className="space-y-3 text-white/35 text-[18px]">
              {[
                { label: 'Услуги', id: 'services' },
                { label: 'Как проходит диагностика', id: 'how-it-works' },
                { label: 'Специалисты', id: 'team' },
                { label: 'Отзывы', id: 'reviews' },
              ].map(l => (
                <li key={l.id}>
                  <button onClick={() => scrollTo(l.id)} className="hover:text-[#FFD400] transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-glow mb-8" />
        <p className="text-center text-white/20 text-xs">© 2026 Kinezis. Все права защищены.</p>
      </div>
    </footer>
  );
}
