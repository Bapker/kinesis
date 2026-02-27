'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

interface HeaderProps { openModal: () => void; }

export default function Header({ openModal }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    setSidebarOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Главная',      id: 'top'          },
    { label: 'Диагностика',  id: 'how-it-works' },
    { label: 'Специалисты',  id: 'team'         },
    { label: 'Отзывы',       id: 'reviews'      },
    { label: 'Контакты',     id: 'contacts'     },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div
          ref={headerRef}
          className="bg-[#0F0F0F]/85 backdrop-blur-xl border border-white/[0.08] rounded-full px-6 py-3"
          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}
        >
          <div className="flex items-center justify-between gap-6">

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 shrink-0"
            >
              <span className="text-white font-black text-lg tracking-tight">KINEZIS</span>
              <span className="text-white/30 text-xs hidden sm:block">Центр реабилитации</span>
            </button>

            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {navLinks.map(l => (
                <button
                  key={l.id} onClick={() => scrollTo(l.id)}
                  className="text-white/60 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={openModal}
                className="hidden sm:block bg-[#FFD400] text-black font-black px-6 py-2.5 rounded-full text-sm hover:brightness-105 hover:scale-[1.02] transition-all shrink-0 min-h-[48px]"
              >
                Записаться
              </button>
              <button
                className="lg:hidden text-white w-8 h-8 flex items-center justify-center"
                onClick={() => setSidebarOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 z-[70] h-full w-72 bg-[#0F0F0F] border-l border-white/10 flex flex-col lg:hidden transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-black">KINEZIS</span>
          <button
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Закрыть меню"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navLinks.map(l => (
            <button
              key={l.id} onClick={() => scrollTo(l.id)}
              className="text-left px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 text-sm uppercase tracking-wider font-medium transition-colors min-h-[48px]"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setSidebarOpen(false); openModal(); }}
            className="mt-4 bg-[#FFD400] text-black font-black py-3 rounded-full text-sm min-h-[48px]"
          >
            Записаться
          </button>
        </nav>
      </div>
    </>
  );
}
