'use client';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
}

export default function Modal({ showModal, setShowModal }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const [contactMethod, setContactMethod] = useState<'call' | 'whatsapp' | null>(null);
  const [phone,  setPhone]  = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const d = digits.startsWith('7') ? digits : '7' + digits;
    const s = d.slice(0, 11);
    let r = '+7';
    if (s.length > 1) r += ' (' + s.slice(1, 4);
    if (s.length >= 4) r += ') ' + s.slice(4, 7);
    if (s.length >= 7) r += '-' + s.slice(7, 9);
    if (s.length >= 9) r += '-' + s.slice(9, 11);
    return r;
  };

  useEffect(() => {
    if (!showModal || !overlayRef.current || !panelRef.current) return;
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.to(overlayRef.current,  { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.set(panelRef.current,   { scale: 0.9, opacity: 0, y: 20 });
    gsap.to(panelRef.current,    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 });
  }, [showModal]);

  const handleClose = () => {
    if (!overlayRef.current || !panelRef.current) { setShowModal(false); return; }
    gsap.to(panelRef.current,   { scale: 0.9, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, delay: 0.1, onComplete: () => setShowModal(false) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !contactMethod) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/crm-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, contactMethod }),
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => { handleClose(); setStatus('idle'); }, 2000);
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (!showModal) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="rounded-2xl p-8 max-w-md w-full"
        style={{ background: 'rgba(17,17,17,0.97)', border: '1px solid rgba(255,212,0,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-black text-white">Записаться на консультацию</h3>
            <p className="text-[#FFD400] text-sm mt-1 font-medium">Первичная консультация — бесплатно</p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Закрыть"
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-white/40 mb-3 uppercase tracking-wider">
              Способ связи
            </label>
            <div className="flex gap-3">
              {(['call', 'whatsapp'] as const).map(m => (
                <button
                  key={m} type="button"
                  onClick={() => setContactMethod(m)}
                  className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all min-h-[48px] ${
                    contactMethod === m
                      ? 'bg-[#FFD400]/10 border-[#FFD400] text-[#FFD400]'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  {m === 'call' ? 'Позвонить' : 'WhatsApp'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">
              Номер телефона
            </label>
            <input
              type="tel" inputMode="numeric"
              value={phone}
              onChange={e => setPhone(formatPhone(e.target.value))}
              placeholder="+7 (___) ___-__-__"
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:border-[#FFD400]/50 focus:outline-none focus:ring-1 focus:ring-[#FFD400]/30 transition-all"
            />
          </div>

          {status === 'success' ? (
            <div className="w-full bg-green-500/20 border border-green-500/40 text-green-400 px-6 py-4 rounded-full text-base font-bold text-center">
              ✓ Заявка отправлена! Свяжемся с вами.
            </div>
          ) : (
            <>
              {status === 'error' && (
                <p className="text-red-400 text-xs text-center">Ошибка отправки. Попробуйте ещё раз.</p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting' || !phone || !contactMethod}
                className="w-full bg-[#FFD400] text-black px-6 py-4 rounded-full font-black text-base hover:brightness-105 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed min-h-[48px]"
              >
                {status === 'submitting' ? 'Отправка...' : 'Записаться бесплатно'}
              </button>
            </>
          )}
        </form>

        <p className="text-[10px] text-white/20 text-center mt-5">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </div>
  );
}
