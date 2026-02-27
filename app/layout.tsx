import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
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
      <body className={`${geistSans.variable} bg-[#0F0F0F] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
