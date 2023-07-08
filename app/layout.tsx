"use client";
import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import DefaultLayout from '@/components/layout/defaultLayout';

const inter = Inter({ subsets: ['latin'] })


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    session?: Session | null;
    [key: string]: any;
  };
}

export default function RootLayout({ children, params: { session, ...params } }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </body>
    </html>
  )
}
