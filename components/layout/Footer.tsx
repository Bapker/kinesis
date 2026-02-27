'use client';

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
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <div>
            <span className="text-white font-black text-xl block mb-3">KINEZIS</span>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-md">
              Центр функциональной реабилитации в Астане. Работаем с причиной боли и сопровождаем на каждом этапе восстановления.
            </p>

            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/50">Контакты</h4>
            <ul className="space-y-3 text-white/35 text-sm mb-8">
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
              <li>
                <a
                  href="https://2gis.kz/astana/firm/70000001032687222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD400] transition-colors"
                >
                  Карточка центра в 2GIS
                </a>
              </li>
            </ul>

            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/50">Навигация</h4>
            <ul className="space-y-3 text-white/35 text-sm">
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

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/50">Мы на карте 2GIS</h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-[340px]">
              <iframe
                src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22city%22%3A%22astana%22%2C%22id%22%3A%2270000001032687222%22%2C%22zoom%22%3A16%7D"
                title="KinezisLife на карте 2GIS"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>

        <div className="divider-glow mb-8" />
        <p className="text-center text-white/20 text-xs">© 2026 Kinezis. Все права защищены.</p>
      </div>
    </footer>
  );
}
