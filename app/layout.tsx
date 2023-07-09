"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
// import Router from "next/router";
// import nprogress from "nprogress";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    session?: Session | null;
    [key: string]: any;
  };
}

// App router'a router events geldiği zaman aktif edilecek
// nprogress.configure({ showSpinner: false });
// Router.events.on("routeChangeStart", () => nprogress.start());
// Router.events.on("routeChangeComplete", () => nprogress.done());
// Router.events.on("routeChangeError", () => nprogress.done());

export default function RootLayout({
  children,
  params: { session, ...params },
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
