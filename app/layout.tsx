import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Kinezis — Центр функциональной реабилитации | Астана',
  description:
    'Индивидуальные программы восстановления после травм, операций и хронических болей. Работаем с причиной, а не симптомом.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.className} bg-[#0F0F0F] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
