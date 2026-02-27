import type { Metadata } from 'next';
import './globals.css';

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
      <body className="bg-[#2F2F2F] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
