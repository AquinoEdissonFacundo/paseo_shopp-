import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paseo Shopp - Tu Tienda Online',
  description:
    'Encuentra los mejores productos con envío directo por WhatsApp. Calidad y atención personalizada.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo.jpeg',
        type: 'image/jpeg',
      },
      {
        url: '/logo.jpeg',
        sizes: '32x32',
        type: 'image/jpeg',
      },
      {
        url: '/logo.jpeg',
        sizes: '16x16',
        type: 'image/jpeg',
      },
    ],
    apple: '/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className='font-sans antialiased'>
        <CartProvider>
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
