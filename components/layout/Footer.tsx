'use client';

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="relative bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="divider-glow absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-4 md:px-6">

        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <span className="text-white font-black text-xl block mb-3">KINEZIS</span>
            <p className="text-white/30 text-sm leading-relaxed">
              Центр функциональной фитнес-реабилитации. Работаем с причиной боли, а не симптомом.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/50">Навигация</h4>
            <ul className="space-y-3 text-white/30 text-sm">
              {[
                { label: 'Услуги',       id: 'services'    },
                { label: 'Как работаем', id: 'how-it-works'},
                { label: 'Команда',      id: 'team'        },
                { label: 'Отзывы',       id: 'reviews'     },
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
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/50">Контакты</h4>
            <ul className="space-y-3 text-white/30 text-sm">
              <li><a href="tel:+77XXXXXXXXX" className="hover:text-[#FFD400] transition-colors">+7 (XXX) XXX-XX-XX</a></li>
              <li><a href="https://wa.me/77XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp</a></li>
              <li><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition-colors">Instagram</a></li>
              <li className="text-white/20">г. Астана, [адрес]</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/50">Режим работы</h4>
            <ul className="space-y-2 text-white/30 text-sm">
              <li>Пн–Пт: 9:00 – 20:00</li>
              <li>Сб: 10:00 – 18:00</li>
              <li>Вс: <span className="text-white/20">выходной</span></li>
            </ul>
          </div>
        </div>

        <div className="divider-glow mb-8" />
        <p className="text-center text-white/20 text-xs">© 2025 Kinezis. Все права защищены.</p>
      </div>
    </footer>
  );
}
