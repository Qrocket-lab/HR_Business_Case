import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Horizon | ABC Corporation HR Strategy',
  description:
    'Re-engineering the Employee Lifecycle for a Digital Era: A comprehensive HR intervention strategy for ABC Corporation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#2d2d2d] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
