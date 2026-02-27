import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kinezis — Центр функциональной реабилитации | Астана',
  description:
    'Индивидуальные программы восстановления после травм, операций и хронических болей. Работаем с причиной, а не симптомом.',
  icons: {
    icon: [
      { url: '/logos/logo_yellow.png', type: 'image/png' },
    ],
    shortcut: '/logos/logo_yellow.png',
    apple: '/logos/logo_white.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="text-white antialiased">
        {children}
      </body>
    </html>
  );
}
